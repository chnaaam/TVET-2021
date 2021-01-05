import secrets
from flask import request, g, Blueprint
from src.database.sensor import Sensor
from src.database.stream_server_config import StreamServerConfig
from src.utils.sensor_data_format import *


def construct_sensor_blueprint(database):
    sensor_blueprint = Blueprint('sensor', __name__, url_prefix="/sensor")

    @sensor_blueprint.route('/list', methods=['POST'])
    def get_sensor_list():
        if request.method == 'POST' or request.method == 'GET':
            user_token = request.json['user_token']
            device_id = request.json['device_id']

            query = database.session.query(Sensor).filter(Sensor.user_token == user_token).filter(Sensor.device_id == device_id).all()

            sensor_list = {}

            for idx, sensor in enumerate(query):
                sensor_list.setdefault(idx, {
                    "SENSOR_ID": sensor.sensor_id,
                    "SENSOR_NAME": sensor.sensor_name,
                    "SENSOR_TYPE": sensor.sensor_type,
                })

            return SENSOR_LIST_FORMAT(status=True, sensor_list=sensor_list)

    @sensor_blueprint.route('/register', methods=['POST'])
    def register_sensor():
        if request.method == 'POST':
            user_token = request.json['user_token']
            device_id = request.json['device_id']
            sensor_name = request.json['sensor_name']
            sensor_id = secrets.token_hex(2)
            sensor_type = request.json['sensor_type']

            database.session.add(Sensor(
                user_token=user_token,
                device_id=device_id,
                sensor_name=sensor_name,
                sensor_id=sensor_id,
                sensor_type=sensor_type,
                is_alive='0'.encode()
            ))

            try:
                database.session.commit()
                return REGISTER_FORMAT(status=True)
            except Exception as e:
                return REGISTER_FORMAT(status=False)

        return REGISTER_FORMAT(status=False)

    @sensor_blueprint.route('/information', methods=['POST'])
    def get_sensor_information():
        if request.method == 'POST':
            user_token = request.json['user_token']
            device_id = request.json['device_id']
            sensor_id = request.json['sensor_id']

            query = database.session.query(Sensor).filter(
                Sensor.user_token == user_token).filter(Sensor.device_id == device_id).filter(Sensor.sensor_id == sensor_id)
            result = query.all()
            sensor = result[0]

            sensor_information = {
                "SENSOR_NAME": sensor.sensor_name,
                "SENSOR_TYPE": sensor.sensor_type,
            }

            return SENSOR_INFORMATION_FORMAT(status=True, sensor_info=sensor_information)

    @sensor_blueprint.route('/delete', methods=['POST'])
    def delete_sensor():
        if request.method == 'POST':
            sensor_id = request.json['sensor_id']

            try:
                query = database.session.query(Sensor).filter(Sensor.sensor_id == sensor_id)

                # TODO : try except
                query.delete()
                database.session.commit()
                return SENSOR_DELETE_FORMAT(status=True)
            except Exception as e:
                return SENSOR_DELETE_FORMAT(status=False)

    @sensor_blueprint.route('/edit', methods=['POST'])
    def edit_sensor():
        if request.method == 'POST':
            user_token = request.json['user_token']
            device_id = request.json['device_id']
            sensor_id = request.json['sensor_id']
            sensor_name = request.json['sensor_name']
            sensor_type = request.json['sensor_type']

            try:
                database.session.query(Sensor)\
                    .filter(Sensor.user_token == user_token)\
                    .filter(Sensor.device_id == device_id)\
                    .filter(Sensor.sensor_id == sensor_id).update({
                    'sensor_name': sensor_name,
                    'sensor_type': sensor_type
                })
                database.session.commit()
                return SENSOR_EDIT_FORMAT(status=True)
            except Exception as e:
                return SENSOR_EDIT_FORMAT(status=False)

    @sensor_blueprint.route('/num', methods=['POST'])
    def get_sensor_num():
        if request.method == 'POST':
            user_token = request.json['user_token']

            query = database.session.query(Sensor)\
                .filter(Sensor.user_token == user_token).all()

            return SENSOR_NUM_FORMAT(status=True, num=len(query))

    @sensor_blueprint.route('/alive_check', methods=['POST'])
    def check_device_alive():
        if request.method == 'POST':
            query = database.session.query(StreamServerConfig).all()

            result = []
            for q in query:
                result.append({"did": q.device_id, "sid": q.sensor_id})

            return ALIVE_FORMAT(status=True, alive_list=result)

    return sensor_blueprint