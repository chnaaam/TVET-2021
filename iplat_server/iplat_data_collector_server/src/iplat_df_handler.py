import os
import threading
from datetime import datetime


from src.iplat_logger import iplat_print
from src.ipc.iplat_ipc_data_format import DECODE_DATA_FORMAT
from src.database.data_logging import DataLogging
from src.packet.iplat_packet_config import IPlatPacketConfig as IPC

# iplat DB/File Handler
class IplatDfHandler:
    def __init__(self, database, stored_data_path, queue_data):
        self.database = database
        self.stored_data_path = stored_data_path
        self.queue_data = queue_data

        self.db = None
        self.cursor = None

        self.manager = dict()

    def serve_forever(self):

        while True:
            try:
                if self.queue_data.empty():
                    continue

                data = self.queue_data.get()

                status, isn, iip = DECODE_DATA_FORMAT(data)
                did = isn.get_did()

                # Status is False
                if not status:
                    for sid in isn.get_sids():
                        key = self.get_sensing_key(did=did, sid=sid)
                        if key in self.manager:
                            self.insert_et(
                                st=self.manager[key]["st"],
                                did=did,
                                sid=sid,
                                et=datetime.now().strftime('%Y%m%d%H%M%S%f')[:-4])

                            del self.manager[key]
                    continue

                # Status is True
                # Check the support of only single sensor or multi sensor
                # - Supported only single sensor
                if iip.mode == IPC.DATF or iip.mode == IPC.DATK:
                    sid = isn.get_sids()[0]
                    key = self.get_sensing_key(did=did, sid=sid)

                    if not key in self.manager:
                        sps, bps = isn.get_sensor_attr(sid)
                        self.update_manager(key=key, did=did, sid=sid, sps=sps, bps=bps)

                    self.write_data_to_file(
                        self.manager[key]['path'],
                        self.manager[key]['st'] + ".dat",
                        iip.buffer[0][sid],
                        self.manager[key]["idx"])

                    self.manager[key]["idx"] += 1

                # - Supported multi sensor
                else:
                    for sid in isn.get_sids():
                        key = self.get_sensing_key(did=did, sid=sid)

                        if not key in self.manager:
                            sps, bps = isn.get_sensor_attr(sid)
                            self.update_manager(key=key, did=did, sid=sid, sps=sps, bps=bps)

                    for buffer in iip.buffer:
                        sid = list(buffer.keys())[0]
                        key = self.get_sensing_key(did=did, sid=sid)

                        if not sid in buffer:
                            # TODO : Error Check
                            continue

                        self.write_data_to_file(
                            self.manager[key]['path'],
                            self.manager[key]['st'] + ".dat",
                            buffer[sid],
                            self.manager[key]["idx"])

                        self.manager[key]["idx"] += 1

            except Exception as e:
                iplat_print("DB : " + str(e))

    def update_manager(self, key, did, sid, sps, bps):
        # Create key
        self.manager.setdefault(key, dict())

        # Create and store a path
        self.manager[key].setdefault("path", self.get_path(did, sid))

        # Define file name
        self.manager[key].setdefault("st", datetime.now().strftime('%Y%m%d%H%M%S%f')[:-4])

        # initialize index
        self.manager[key].setdefault("idx", 0)

        # Insert device and sensor information
        self.insert_new_sensor(st=self.manager[key]["st"], did=did, sid=sid)

        # Init data file
        self.init_data_to_file(
            path=self.manager[key]['path'],
            file_name=self.manager[key]['st'] + ".dat",
            sps=sps,
            bps=bps)

    def get_sensing_key(self, did, sid):
        return "{}-{}".format(did, sid)

    def insert_new_sensor(self, st, did, sid):
        self.database.session.add(DataLogging(start_time=st, device_id=did, sensor_id=sid, end_time=None))
        self.database.session.commit()

    def insert_et(self, st, et, did, sid):
        self.database.session.query(DataLogging).filter(
            DataLogging.start_time == st
            and DataLogging.device_id == did
            and DataLogging.sensor_id == sid).update({"end_time": et})
        self.database.session.commit()

    def get_path(self, device_id, sensor_id):
        try:
            os.makedirs(os.path.join(self.stored_data_path, device_id))
        except Exception as e:
            print(e)

        try:
            os.makedirs(os.path.join(self.stored_data_path, device_id, sensor_id))
        except Exception as e:
            print(e)

        return os.path.join(self.stored_data_path, device_id, sensor_id)

    def init_data_to_file(self, path, file_name, sps, bps):
        with open(os.path.join(path, file_name), 'a', encoding='utf-8') as fp:
            time_stamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')[:-7]
            fp.write(f"time: {time_stamp}\n")
            fp.write(f"SPS: {sps}\n")
            fp.write(f"BPS: {bps}\n")

    def write_data_to_file(self, path, file_name, data, index):
        with open(os.path.join(path, file_name), 'a', encoding='utf-8') as fp:
            fp.write(str(index) + ' ' + str(data) + '\n')

    def check_is_alive_device(self, device_id, sensor_id):
        query = "select is_alive from sensor where device_id=\'{}\' and  sensor_id=\'{}\'".format(
            device_id,
            sensor_id)

        try:
            self.cursor.execute(query)
            count = self.cursor.fetchall()

            if int(count[0][0]) == 0:
                return False
            else:
                return True

        except Exception as e:
            return False

def run_df_handler_thread(database, stored_data_path, queue_data):
    database_file_handler_server = IplatDfHandler(database, stored_data_path, queue_data)

    database_file_handler_thread = threading.Thread(target=database_file_handler_server.serve_forever)
    database_file_handler_thread.daemon = True
    database_file_handler_thread.start()