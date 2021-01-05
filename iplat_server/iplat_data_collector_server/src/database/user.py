from sqlalchemy import Column, VARCHAR, BINARY
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "user"

    user_token = Column(VARCHAR(length=8), primary_key=True)
    user_id = Column(VARCHAR(length=15))
    user_pw = Column(VARCHAR(length=16))
    email = Column(VARCHAR(length=30))
    is_manager = Column(BINARY(length=1))

    def __init__(self, user_token, user_id, user_pw, email, is_manager):
        self.user_token = user_token
        self.user_id = user_id
        self.user_pw = user_pw
        self.email = email
        self.is_manager = is_manager

    # def __repr__(self):
    #     return f"User : {self.user_token}, {self.user_id}, {self.user_pw}, {self.email}, {self.is_manager}"