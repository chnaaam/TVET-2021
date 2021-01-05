import pymysql
from iplat_logger import iplat_print

from src.database.device import Device
from src.database.sensor import Sensor
from src.database.sqlalchemy_decode import SQLAlchemyUtils

from src.packet.iplat_error_code import IPlatErrorCode

class IPlatSensorNode:
    def __init__(self):
        self.my_ip = ""
        self.info = {
            "device": {
                "id": "",
            },
            "sensors": {}}  # SID, SPS, Resolution

        self.len_nodes = 0

    def register(self, database, did, sensors):
        # - Register Process
        # 1. Certificate device
        # 2. Certificate sensors
        # 3. Register device and sensors
        # 4. Set communication mode

        # 1. Certificate device
        if not self.is_registered_device(database, did):
            return False, IPlatErrorCode.DEVICE_IS_NOT_FOUND

        # 2. Certificate sensors
        for idx, sensor in enumerate(sensors):
            if not self.is_registered_sensor(database, did, sensor["sid"]):
                return False, IPlatErrorCode.SENSOR_IS_NOT_FOUND[idx]

        # 3. Register device and sensors
        self.info["device"]["id"] = did

        for sensor in sensors:
            sid, sps, bps, net_ip, net_port = sensor["sid"], sensor["sps"], sensor["bps"], "", -1

            self.info["sensors"].setdefault(
                sid, {
                    "sps": sps,
                    "bps": bps,
                    "ip": net_ip,
                    "port": net_port,
                    "data": []
                })

        self.len_nodes = len(self.info["sensors"].keys())

        return True, None

    def get_mode(self, database, did):
        result = database.session.query(Device).filter(Device.device_id == did)
        result = SQLAlchemyUtils.decode(result)

        return result["mode"]


    def is_registered_device(self, database, did):
        result = database.session.query(Device).filter(Device.device_id == did)

        if len(result.all()) == 0:
            return False
        else:
            return True

    def is_registered_sensor(self, database, did, sid):
        result = database.session.query(Sensor).filter(Sensor.device_id == did and Sensor.sensor_id == sid)

        if len(result.all()) == 0:
            return False
        else:
            return True

    def get_did(self):
        return self.info["device"]["id"]

    def get_sids(self):
        return list(self.info["sensors"].keys())

    def get_sensor_attr(self, sid):
        return self.info["sensors"][sid]["sps"], self.info["sensors"][sid]["bps"]
