from sqlalchemy import Column, VARCHAR, INT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class StreamServerConfig(Base):
    __tablename__ = "stream_server_config"

    device_id = Column(VARCHAR(length=4))
    sensor_id = Column(VARCHAR(length=4))
    ip = Column(VARCHAR(length=13))
    port = Column(INT, primary_key=True)

    def __init__(self, device_id, sensor_id, ip, port):
        self.device_id = device_id
        self.sensor_id = sensor_id
        self.ip = ip
        self.port = port

    # def __repr__(self):
    #     return f"User : {self.user_token}, {self.user_id}, {self.user_pw}, {self.email}, {self.is_manager}"