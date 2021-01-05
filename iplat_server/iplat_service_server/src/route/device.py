import secrets
from datetime import datetime
from flask import request, Blueprint
from flask_cors import cross_origin

from src.database.device import Device
from src.utils.device_data_format import *

def construct_device_blueprint(database):
    device_blueprint = Blueprint('device', __name__, url_prefix="/device")

    @device_blueprint.route('/list', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_device_list():
        if request.method == 'POST':
            user_token = request.json['user_token']

            query = database.session.query(Device).filter(Device.user_token == user_token).all()

            device_list = {}

            for idx, device in enumerate(query):
                device_list.setdefault(idx, {
                    "DEVICE_ID": device.device_id,
                    "DEVICE_NAME": device.device_name,
                    "DEVICE_TYPE": device.device_type,
                    "PROTOCOL_TYPE": device.protocol_type,
                    "REGISTER_DATE": device.regist_date,
                })

            return DEVICE_LIST_FORMAT(status=True, device_list=device_list)

    @device_blueprint.route('/register', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def register_device():
        if request.method == 'POST':
            user_token = request.json['user_token']
            device_name = request.json['device_name']
            device_id = secrets.token_hex(2)
            device_type = request.json['device_type']
            protocol_type = request.json['protocol_type']
            regist_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            database.session.add(Device(
                user_token=user_token,
                device_name=device_name,
                device_id=device_id,
                device_type=device_type,
                protocol_type=protocol_type,
                regist_date=regist_date))

            try:
                database.session.commit()
                return REGISTER_FORMAT(status=True)
            except Exception as e:
                return REGISTER_FORMAT(status=False)

        return REGISTER_FORMAT(status=False)

    @device_blueprint.route('/information', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_device_information():
        if request.method == 'POST':
            user_token = request.json['user_token']
            device_id = request.json['device_id']

            query = database.session.query(Device).filter(Device.user_token == user_token).filter(Device.device_id == device_id)
            result = query.all()
            device = result[0]

            device_information = {
                "DEVICE_NAME": device.device_name,
                "DEVICE_TYPE": device.device_type,
                "PROTOCOL_TYPE": device.protocol_type,
                "REGISTER_DATE": device.regist_date,
            }

            return DEVICE_INFORMATION_FORMAT(status=True, device_info=device_information)

    @device_blueprint.route('/delete', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def delete_device():
        if request.method == 'POST':
            device_id = request.json['device_id']

            try:
                query = database.session.query(Device).filter(Device.device_id == device_id)

                # TODO : try except
                query.delete()
                database.session.commit()
                return DEVICE_DELETE_FORMAT(status=True)
            except Exception as e:
                return DEVICE_DELETE_FORMAT(status=False)

    @device_blueprint.route('/edit', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def edit_device():
        if request.method == 'POST':
            user_token = request.json['user_token']
            device_id = request.json['device_id']
            device_name = request.json['device_name']
            device_type = request.json['device_type']
            protocol_type = request.json['protocol_type']

            try:
                database.session.query(Device).filter(Device.user_token == user_token).filter(Device.device_id == device_id).update({
                    'device_name': device_name,
                    'device_type': device_type,
                    'protocol_type': protocol_type,
                })
                database.session.commit()
                return DEVICE_EDIT_FORMAT(status=True)
            except Exception as e:
                return DEVICE_EDIT_FORMAT(status=False)

    @device_blueprint.route('/num', methods=['POST'])
    @cross_origin(supports_credentials=True)
    def get_device_num():
        if request.method == 'POST':
            user_token = request.json['user_token']

            query = database.session.query(Device).filter(Device.user_token == user_token)
            result = query.all()

            return DEVICE_NUM_FORMAT(status=True, num=len(result))

    return device_blueprint