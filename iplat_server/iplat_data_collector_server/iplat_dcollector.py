import threading
import argparse
import configparser

# # Server
from src.iplat_logger import *
from src.iplat_sn_handler import run_sn_handler_thread
from src.iplat_df_handler import run_df_handler_thread
from src.iplat_ss_handler import IplatSshServer

# # Database
from src.database.base import Database
from src.database.sensor import Sensor
from src.database.stream_server_config import StreamServerConfig

from multiprocessing import Queue

def main():
    # Initialize server
    parser = argparse.ArgumentParser()
    parser.add_argument("-config", default="config.ini")

    args = parser.parse_args()

    config = configparser.ConfigParser()
    config.read(args.config)

    log_level = config.get("Log", "log_level")

    sn_handler_port = int(config.get("ServerConfig", "sn_handler_port"))
    ss_handler_port = int(config.get("ServerConfig", "ss_handler_port"))

    stored_data_path = config.get("File", "stored_data_path") + "sdb"

    db_name = config.get("Database", "db_name")
    db_ip = config.get("Database", "db_ip")
    db_port = config.get("Database", "db_port")
    db_id = config.get("Database", "db_id")
    db_pw = config.get("Database", "db_pw")

    if log_level == "debug":
        log_level = logging.DEBUG
    else:
        log_level = logging.INFO

    database = Database(ip=db_ip, port=db_port, id=db_id, pw=db_pw, name=db_name)

    iplat_log_init(level=log_level)
    iplat_print(msg="iPlat Socket Server Start")

    if log_level == logging.DEBUG:
        iplat_print("================" * 5)
        iplat_print("iplat configuration")
        iplat_print("Sensor node handler port : {}".format(sn_handler_port))
        iplat_print("Service server handler port : {}".format(ss_handler_port))
        iplat_print("Database IP : {}".format(db_ip))
        iplat_print("Database Port : {}".format(db_port))
        iplat_print("Database ID : {}".format(db_id))
        iplat_print("Database Password : {}".format("-----"))
        iplat_print("================" * 5)

    clear_database(database)

    run(sn_handler_port, ss_handler_port, database, stored_data_path)

    endless_loop()

def clear_database(database):
    # is alive toggle set 0
    try:
        database.session.query(Sensor).filter(Sensor.is_alive == '1'.encode()).update({'is_alive': '0'.encode()})
        database.session.commit()
    except Exception as e:
        iplat_print(e)

    # delete streaming information
    try:
        query = database.session.query(StreamServerConfig)
        query.delete()
        database.session.commit()
    except Exception as e:
        iplat_print(e)

def run(sn_handler_port, ss_handler_port, database, stored_data_path):
    # Queue data : For sending data from sensor node handler to Database / file handler
    queue_data = Queue()
    queue_cmd = Queue()

    run_sn_handler(queue_data, queue_cmd, sn_handler_port, database)
    run_df_handler(queue_data, database, stored_data_path)
    run_ss_handler(queue_cmd, ss_handler_port)

def run_sn_handler(queue_data, queue_cmd, sn_handler_port, database):
    # run sensor node handler
    # - 센서 노드에 데이터를 송수신한함

    iplat_print(msg='Sensor node tcp server start')

    proc_sensor_node_server = threading.Thread(
        target=run_sn_handler_thread,
        args=(sn_handler_port, queue_data, queue_cmd, database)
    )
    proc_sensor_node_server.start()


def run_df_handler(queue_data, database, stored_data_path):
    # run DB/File handler
    # - 데이터 베이스 인터페이스 및 파일 저장 작업을 순차 실행함

    iplat_print(msg='Database and file handler start')

    proc_db_manager = threading.Thread(
        target=run_df_handler_thread,
        args=(database, stored_data_path, queue_data)
    )
    proc_db_manager.start()

def run_ss_handler(queue_cmd, ss_handler_port):
    # run service server handler
    # - 서비스 서버의 작업 요청을 처리함

    iplat_print(msg='Service server handler start')

    user_cmd_server = IplatSshServer(queue_cmd)
    user_cmd_server.run(port=ss_handler_port)

def endless_loop():
    while True:
        pass


if __name__ == '__main__':
    main()
