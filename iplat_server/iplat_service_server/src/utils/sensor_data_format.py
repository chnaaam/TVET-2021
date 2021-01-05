def REGISTER_FORMAT(status):
    return {"status": status}

def SENSOR_NUM_FORMAT(status, num):
    return {"status": status, "num": num}

def SENSOR_LIST_FORMAT(status, sensor_list):
    return {"status": status, "sensor_list": sensor_list}

def SENSOR_INFORMATION_FORMAT(status, sensor_info):
    return {"status": status, "sensor_info": sensor_info}

def SENSOR_DELETE_FORMAT(status):
    return {"status": status}

def SENSOR_EDIT_FORMAT(status):
    return {"status": status}

def ALIVE_FORMAT(status, alive_list):
    return {"status": status, "alive_list": alive_list}