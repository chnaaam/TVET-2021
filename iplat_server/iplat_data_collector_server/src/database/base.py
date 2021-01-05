from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

class Database:
    def __init__(self, ip, port, id, pw, name):
        SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{id}:{pw}@{ip}:{port}/{name}'

        # Connect to mariadb
        engine = create_engine(SQLALCHEMY_DATABASE_URI)

        # Create session
        self.session = scoped_session(sessionmaker(bind=engine))

if __name__ == "__main__":
    database = Database("127.0.0.1", 3306, "root", "123qwe", "iplat")

