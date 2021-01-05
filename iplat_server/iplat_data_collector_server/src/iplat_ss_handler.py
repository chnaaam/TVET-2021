from src.iplat_logger import iplat_print

from flask import Flask
from flask_socketio import SocketIO

import threading

# server for service server handler
class IplatSshServer:
    def __init__(self, q_cmd):
        self.app = Flask(__name__)
        self.app.secret_key = "secret"

        self.q_cmd = q_cmd
        self.socket_io = SocketIO(self.app, cors_allowed_origins="*")

        self.server_config = dict()
        self.run_thread_for_config_queue()

        @self.socket_io.on('connect')
        def connect():
            iplat_print("Connect client to cmd server")

            return ""

        @self.socket_io.on('join')
        def join(message):
            iplat_print("Join client")

            device_id = message['device_id']
            sensor_id = message['sensor_id']

            server_id = device_id + "_" + sensor_id
            print("Server ID : ", server_id)
            print("Server info : ", self.server_config[server_id])
            self.socket_io.emit('server_info', self.server_config[server_id])

            return ""

    def run(self, port):
        self.socket_io.run(self.app, host='0.0.0.0', port=port)

    def run_thread_for_config_queue(self):
        t = threading.Thread(target=self.config_queue)
        t.start()

    def config_queue(self):
        while True:
            if self.q_cmd.empty():
                continue

            # Data variable contain message and data value
            # - message is sensor node status message(new, delete)
            # - data is sensor node information(
            #           device id,
            #           sensor id,
            #           specific communication ip and port)

            data = self.q_cmd.get()
            message = data['message']
            config = data['data']
            server_id = config['device_id'] + "_" + config['sensor_id']

            if message == 'new':
                self.server_config.setdefault(server_id, {
                    'ip': config['ip'],
                    'port': config['port']
                })
            else:
                del self.server_config[server_id]

