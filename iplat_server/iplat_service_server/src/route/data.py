import os
from flask import request, g, Blueprint, send_file
from flask_cors import cross_origin

from src.database.data_logging import DataLogging
from src.database.stream_server_config import StreamServerConfig

from src.utils.file_data_format import *
from src.utils.stream_data_format import *
from src.utils.file_io import read_sensing_data

def construct_data_blueprint(database, stored_data_path):
    data_blueprint = Blueprint('data', __name__, url_prefix="/data")

    @data_blueprint.route('/list', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_data_list():
        if request.method == 'POST':
            device_id = request.json['device_id']
            sensor_id = request.json['sensor_id']

            query = database.session.query(DataLogging).filter(DataLogging.device_id == device_id).filter(DataLogging.sensor_id == sensor_id).all()

            data_list = {}

            for idx, data in enumerate(query):
                data_list.setdefault(idx, {"START_TIME": data.start_time})

            return DATA_FORMAT(status=True, data_list=data_list)

    @data_blueprint.route('/contents', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_data_contents():
        if request.method == 'POST':
            user_token = request.json['user_token']
            device_id = request.json['device_id']
            sensor_id = request.json['sensor_id']
            start_time = request.json['start_time']
            index = int(request.json['content_index'])
            data_length = int(request.json['data_length'])

            result = get_file_contents(stored_data_path, device_id, sensor_id, start_time, index, data_length)

            return result

    @data_blueprint.route('/delete', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def data_delete():
        if request.method == 'POST':

            device_id = request.json['device_id']
            sensor_id = request.json['sensor_id']
            file_name = request.json['file_name']

            # Remote from database
            query = database.session.query(DataLogging)\
                .filter(DataLogging.device_id == device_id)\
                .filter(DataLogging.sensor_id == sensor_id)\
                .filter(DataLogging.start_time == file_name)
            try:
                query.delete()
                database.session.commit()

                # Remote file
                path = os.path.join(stored_data_path, device_id, sensor_id, file_name) + ".dat"

                os.remove(path)

                return DATA_DELETE_FORMAT(status=True)
            except Exception as e:
                return DATA_DELETE_FORMAT(status=False)

    @data_blueprint.route('/download', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def download():
        if request.method == 'POST':
            device_id = request.json['device_id']
            sensor_id = request.json['sensor_id']
            file_name = request.json['file_name'] + ".dat"

            path = os.path.join(g.data_dir_path, device_id, sensor_id)

            dat2csv(path, file_name)

            return send_file(os.path.join(path, "temp.csv"), as_attachment=True)


    @data_blueprint.route('/monitoring/start', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def monitoring_start():
        if request.method == 'POST':
            device_id = request.json['device_id']
            sensor_id = request.json['sensor_id']

            query = database.session.query(StreamServerConfig)\
                .filter(StreamServerConfig.device_id == device_id)\
                .filter(StreamServerConfig.sensor_id == sensor_id).all()

            if query:
                return STREAM_DATA_FORMAT(status=True, ip=query[0].ip, port=query[0].port)
            else:
                return STREAM_DATA_FORMAT(status=False, ip="", port=-1)

    def read_file(path):
        line_buffer = []
        with open(path, 'r', encoding='utf-8') as fp:
            while True:
                line = fp.readline()

                if not line:
                    break

                line = line.replace('\n', '')
                line_buffer.append(line)
        return line_buffer

    def dat2csv(path, file_name):
        temp_file = os.path.join(path, "temp.csv")
        file = read_file(os.path.join(path, file_name))

        file[0] = "time, " + file[0]
        file[1] = file[1].replace(":", ",")

        for i in range(2, len(file)):
            file[i] = file[i].replace(' ', ', ')

        with open(temp_file, 'w', encoding='utf-8') as fp:
            for f in file:
                fp.write(f + '\n')

    def del_csv(path):
        temp_file = os.path.join(path, "temp.csv")
        os.remove(temp_file)

    def get_file_contents(dir_path, device_id, sensor_id, start_time, index, BATCH_SIZE):

        sensing_data = read_sensing_data(
            dir=dir_path,
            device_id=device_id,
            sensor_id=sensor_id,
            start_time=start_time
        )

        # Calculate the data length
        data_buffer = sensing_data['DATA']
        index_buffer = sensing_data['INDEX']
        time_stamp = sensing_data['TIMESTAMP']

        batch_length = 0
        batch_index = 0

        # 1. Data가 없는 경우 체크
        len_data = len(data_buffer)
        if (len_data == 0):
            return {
                "DATA": [],
                "INDEX": [],
                "TIMESTAMP": [],
                "BATCH_LENGTH": 0,
                "BATCH_INDEX": 0,
            }

        # 2. index가 batch length를 넘겼을 시 또는 index가 0 이하인 경우
        total_batch_size = len(data_buffer) // BATCH_SIZE + 1
        if (index > total_batch_size):
            return {
                "DATA": [],
                "INDEX": [],
                "TIMESTAMP": [],
                "BATCH_LENGTH": total_batch_size,
                "BATCH_INDEX": total_batch_size,
            }

        return {
            "DATA": data_buffer[index * BATCH_SIZE: (index + 1) * BATCH_SIZE],
            "INDEX": index_buffer[index * BATCH_SIZE: (index + 1) * BATCH_SIZE],
            "TIMESTAMP": time_stamp,
            "BATCH_LENGTH": total_batch_size,
            "BATCH_INDEX": index,
        }


    return data_blueprint