import json
from sqlalchemy import Column, VARCHAR, INT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Archive(Base):
    __tablename__ = "archive"

    no = Column(INT, primary_key=True, autoincrement=True)
    title = Column(VARCHAR(length=50))
    content = Column(VARCHAR(length=200))
    writer = Column(VARCHAR(length=30))
    writer_token = Column(VARCHAR(length=16))
    uploaded_file = Column(VARCHAR(length=1000))
    registered_date = Column(VARCHAR(length=50), primary_key=True)

    def __init__(self, no, title, content, writer, writer_token, uploaded_file, registered_date):
        self.no = no
        self.title = title
        self.content = content
        self.writer = writer
        self.writer_token = writer_token
        self.uploaded_file = uploaded_file
        self.registered_date = registered_date

    def __repr__(self):
        result = {
            "no": self.no,
            "title": self.title,
            "content": self.content,
            "writer": self.writer,
            "writer_token": self.writer_token,
            "uploaded_file": self.uploaded_file,
            "registered_date": self.registered_date}

        return json.dumps(result)