import socket
import socketserver
import threading
from multiprocessing import Process, Queue
from datetime import datetime

from src.iplat_sd_streamer import run_sd_streamer
from src.iplat_logger import iplat_print
from src.packet.iplat_packet import IPlatPacket
from src.packet.iplat_sensor_node import IPlatSensorNode
from src.packet.iplat_packet_config import IPlatPacketConfig as IPC
from src.ipc.iplat_ipc_data_format import ENCODE_DATA_FORMAT

from src.database.sensor import Sensor
from src.database.stream_server_config import StreamServerConfig

# server for iplat sensor node handler
class IplatSnhServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    def __init__(
            self,
            server_address,
            RequestHandlerClass,
            queue_data,
            queue_cmd,
            database,
    ):
        socketserver.ThreadingTCPServer.__init__(
            self,
            server_address,
            RequestHandlerClass
        )

        self.queue_data = queue_data    # Sensor node handler -> database, file handler
        self.queue_cmd = queue_cmd  # Service server handler -> Sensor node handler
        self.database = database
        self.stream_server_port = 9050
        self.sd_handler_manager = dict()

        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

# handler for iplat sensor node hanlder
class IplatSnhHandler(socketserver.BaseRequestHandler):
    def send(self, data):
        self.request.send(data)

    def recv(self):
        return self.request.recv(1024)

    def handle(self):
        # Passive Mode - Control Method : Reset
        #       SN                        DC
        #       |                         |
        #       |      Req Connection     |
        #       |  ---------------------> | (1) - Connection Request
        #       |                         |
        #       |                         | (2) - Checking Passive / Active Mode (up to v1.4)
        #       |           ACK           |
        #       |  <--------------------- | (3) - Connection Response
        #       |                         |       (Check a did, sid, sps, resolution)
        #       |                         |       1. This information isn't existed in db
        #       |                         |          send nack packet and raise error
        #       |                         |       2. else
        #       |                         |          send ack packet
        #       |                         |          and set ip, port and alive in database
        #       |                         |
        #       |     Data(Auto Start)    |
        #       |  ---------------------> | (4 ...)
        #       |          Data           |
        #       |  ---------------------> |
        #       |           ...           |
        #       |                         |
        #       |          Data           |
        #       |  ---------------------> |

        # Active Mode (timeout - 3s)
        #       SN(3s)                    DC(3s)
        #       |                         |
        #       |      Req Connection     |
        #       |  ---------------------> | (1)
        #       |                         | (2) - Checking Passive / Active Mode (up to v1.4)
        #       |           ACK           |
        #       |  <--------------------- | (3)
        #       |                         |
        #  Wait |           ...           | (3) - Go to Liveness Check
        #       |                         |
        #       |     Start Collecting    |
        #       |  <--------------------- | (4)
        #       |          Data           |
        #       |  ---------------------> | (5)
        #       |           ACK           |
        #       |  <--------------------- | (6)
        #       |                         |
        #       |           ...           |
        #       |                         |
        #       |          Data           |
        #       |  ---------------------> |
        #       |           ACK           |
        #       |  <--------------------- |
        #       |      End Collecting     |
        #       |  <--------------------- | (n)
        #       |           ACK           |
        #       |  ---------------------> | (n + 1)

        # Active Mode - Liveness Checking
        #       |        Is Alive         |
        #       |  ---------------------> |
        #       |           ACK           |
        #       |  <--------------------- |

        iplat_print("Success to connect client : " + self.client_address[0])

        # Timeout
        self.request.settimeout(3)

        sensor_node = IPlatSensorNode()

        try:
            # (1) - Request Connection Part
            recv_data = self.recv()

            device_info = IPlatPacket.decode(packet=recv_data)

            # Register sensor node information at sensor node
            # return : status, error code
            res, err_code = sensor_node.register(
                self.server.database,
                device_info["did"],
                device_info["sensors"])

            if res:
                # (2) - Send ACK
                self.send(IPlatPacket.encode(IPC.CONTROL, "ACK", err_code))

                for sid in sensor_node.get_sids():

                    # (2) - Set ip and port in database and create data streaming server
                    key, queue_command, queue_data = self.set_stream_server_config(
                        did=sensor_node.get_did(),
                        sid=sid,
                        ip=self.get_ip(),
                        port=self.server.stream_server_port)

                    if not key in self.server.sd_handler_manager:
                        self.server.sd_handler_manager.setdefault(key, {"data": None, "command": None})
                        self.server.sd_handler_manager[key]["data"] = queue_data
                        self.server.sd_handler_manager[key]["command"] = queue_command

                    # (2) - Set sensor node is alived
                    self.set_alive_sensor_node(did=sensor_node.get_did(), sid=sid, is_alive=True)



            else:
                # (2) - Send NACK
                self.send(IPlatPacket.encode(IPC.CONTROL, "NACK", err_code))

                # Raise Error
                raise Exception("Can not device and sensor certification")

            self.run(sensor_node)

        except TimeoutError as e:
            iplat_print(e)

        except Exception as e:
            iplat_print(e)

        # Finish communication
        try:
            self.server.queue_data.put(
                ENCODE_DATA_FORMAT(
                    status=False,
                    isn=sensor_node,
                    iip=None))

            self.clear_sensor_node(sensor_node)
        except Exception as e:
            iplat_print(e)

    def run(self, sensor_node):
        # Data Send & Receive Part
        # (4) ...
        while True:
            recv_data = self.recv()

            # #################################################################################################
            # data format
            #
            # 1. Fast mode
            #       - [data]
            #
            # 2. Byte(Single Sensor) - SID(4byte) + DATA(1byte)
            #       - [{"sid": sid, "data": data}]
            #
            # 3. Byte(Multi Sensor) - SID1(4B) + DATA1(1B) + SID2(4B) + DATA2(1B) + SID3(4B) + DATA3(1B)
            #       - [{"sid": sid, "data": data}, {"sid": sid, "data": data}, {"sid": sid, "data": data}, ...]
            #
            # 4. Block Mode - SID + DATA1 + DATA2 + DATA3 + ... + DATAn
            #       - [{"sid": sid, "data": [data1, data2, data3, ..., datan]}]
            # #################################################################################################

            iip = IPlatPacket.decode(packet=recv_data)

            # For debugging
            iplat_print(iip)

            # Send data to df handler
            self.server.queue_data.put(ENCODE_DATA_FORMAT(status=True, isn=sensor_node, iip=iip))

            did = sensor_node.get_did()
            for sid in sensor_node.get_sids():
                key = f"{did}-{sid}"

                if self.server.sd_handler_manager[key]["command"].empty():
                    continue

                self.server.sd_handler_manager[key]["command"].get()
                self.server.sd_handler_manager[key]["data"].put({
                    "data": iip.decode(sid),
                    "timestamp": datetime.now().strftime('%Y%m%d%H%M%S%f')
                })

    def set_alive_sensor_node(self, did, sid, is_alive):
        if is_alive:
            alive = '1'
        else:
            alive = '0'

        self.server.database.session.query(Sensor).filter(
            Sensor.device_id == did and Sensor.sensor_id == sid
        ).update({'is_alive': alive.encode()})
        self.server.database.session.commit()

    def set_stream_server_config(self, did, sid, ip, port):
        self.server.database.session.add(StreamServerConfig(device_id=did, sensor_id=sid, ip=ip, port=port))
        self.server.database.session.commit()

        queue_data = Queue()
        queue_command = Queue()

        p = Process(target=run_sd_streamer, args=(self.server.stream_server_port, queue_command, queue_data))
        p.start()
        print("Start")
        self.server.stream_server_port += 1

        key = f"{did}-{sid}"
        return key, queue_command, queue_data

    def clear_stream_server_config(self, did, sid):
        config = self.server.database.session.query(StreamServerConfig).filter(
            StreamServerConfig.device_id == did and StreamServerConfig.sensor_id == sid)

        config.delete()
        self.server.database.session.commit()

    def get_ip(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            # doesn't even have to be reachable
            s.connect(('10.255.255.255', 1))
            IP = s.getsockname()[0]
        except Exception:
            IP = '127.0.0.1'
        finally:
            s.close()
        return IP

    def clear_sensor_node(self, sensor_node):
        # Set that alive is false
        for sid in sensor_node.get_sids():
            # Delete stream server config
            self.clear_stream_server_config(did=sensor_node.get_did(), sid=sid)

            # Set that alive is false

            self.set_alive_sensor_node(did=sensor_node.get_did(), sid=sid, is_alive=False)

def run_sn_handler_thread(sn_handler_port, queue_data, queue_cmd, database):
    sensor_node_server = IplatSnhServer(
        ("", sn_handler_port),  # Server Configuration
        IplatSnhHandler,  # Socket Server
        queue_data,  # queue for receive data in sensor node server send to database manager
        queue_cmd,
        database,
    )

    sensor_node_thread = threading.Thread(target=sensor_node_server.serve_forever())
    sensor_node_thread.daemon = True
    sensor_node_thread.start()