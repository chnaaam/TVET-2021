import json

from sqlalchemy import Column, VARCHAR
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class DataLogging(Base):
    __tablename__ = "data_logging"

    start_time = Column(VARCHAR(length=16), primary_key=True)
    device_id = Column(VARCHAR(length=4))
    sensor_id = Column(VARCHAR(length=4))
    end_time = Column(VARCHAR(length=16))

    def __init__(self, start_time, device_id, sensor_id, end_time):
        self.start_time = start_time
        self.device_id = device_id
        self.sensor_id = sensor_id
        self.end_time = end_time

    def __repr__(self):
        result = {
            "start_time": self.start_time,
            "device_id": self.device_id,
            "sensor_id": self.sensor_id,
            "end_time": self.end_time}

        return json.dumps(result)