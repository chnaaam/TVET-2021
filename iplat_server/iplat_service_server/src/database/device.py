import json
from sqlalchemy import Column, VARCHAR
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Device(Base):
    __tablename__ = "device"

    user_token = Column(VARCHAR(length=8))
    device_id = Column(VARCHAR(length=4), primary_key=True)
    device_name = Column(VARCHAR(length=30))
    device_type = Column(VARCHAR(length=15))
    protocol_type = Column(VARCHAR(length=15))
    regist_date = Column(VARCHAR(length=30))

    def __init__(self, user_token, device_id, device_name, device_type, protocol_type, regist_date):
        self.user_token = user_token
        self.device_id = device_id
        self.device_name = device_name
        self.device_type = device_type
        self.protocol_type = protocol_type
        self.regist_date = regist_date

    def __repr__(self):
        result = {
            "user_token": self.user_token,
            "device_id": self.device_id,
            "device_name": self.device_name,
            "device_type": self.device_type,
            "protocol_type": self.protocol_type,
            "regist_date": self.regist_date}

        return json.dumps(result)