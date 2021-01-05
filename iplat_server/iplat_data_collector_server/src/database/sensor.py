import json

from sqlalchemy import Column, VARCHAR, Binary
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Sensor(Base):
    __tablename__ = "sensor"

    user_token = Column(VARCHAR(length=16), primary_key=True)
    device_id = Column(VARCHAR(length=8))
    sensor_id = Column(VARCHAR(length=8))
    sensor_name = Column(VARCHAR(length=30))
    sensor_type = Column(VARCHAR(length=30))
    is_alive = Column(Binary(length=1))

    def __init__(self, user_token, device_id, sensor_id, sensor_name, sensor_type, is_alive):
        self.user_token = user_token
        self.device_id = device_id
        self.sensor_id = sensor_id
        self.sensor_name = sensor_name
        self.sensor_type = sensor_type
        self.is_alive = is_alive

    def __repr__(self):
        result = {
            "user_token": self.user_token,
            "device_id": self.device_id,
            "sensor_id": self.sensor_id,
            "sensor_name": self.sensor_name,
            "sensor_type": self.sensor_type,
            "is_alive": str(self.is_alive.decode())}

        return json.dumps(result)
