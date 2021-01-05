from flask import Flask
from flask_socketio import SocketIO

from src.iplat_logger import iplat_print
from src.ipc.iplat_ipc_data_format import DECODE_DATA_FORMAT

# server for iplat sensor data streamer
class IplatSdsServer:
    def __init__(self, port, queue_command, queue_data):
        self.app = Flask(__name__)
        self.app.secret_key = "1q2w3e4r!@#$asc"

        self.port = port
        self.queue_command = queue_command
        self.queue_data = queue_data

        self.socket_io = SocketIO(
            self.app,
            cors_allowed_origins="*",
            logger=False,
            engineio_logger=False
        )

        self.client_list = []

        @self.socket_io.on('connect')
        def connect():
            iplat_print("Connect client")

            return "hello"

        @self.socket_io.on('streaming_request')
        def streaming_request():
            self.queue_command.put("Go")

            if self.queue_data.empty():
                return ""

            data = self.queue_data.get()

            self.socket_io.emit("streaming", data)
            return ""

    def __call__(self, port, queue_command, queue_data):
        self.queue_command = queue_command
        self.queue_data = queue_data

        self.port = port
        self.run()

    def run(self):
        print("Create port : ", self.port)
        self.socket_io.run(self.app, host='0.0.0.0', port=self.port)

def run_sd_streamer(port, queue_command, queue_data):
    streaming_server = IplatSdsServer(port, queue_command, queue_data)
    streaming_server.run()