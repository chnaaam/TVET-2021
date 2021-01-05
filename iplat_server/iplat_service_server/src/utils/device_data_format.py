# TODO : Get Method Error

def REGISTER_FORMAT(status):
    return {"status": status}

def DEVICE_NUM_FORMAT(status, num):
    return {"status": status, "num": num}

def DEVICE_LIST_FORMAT(status, device_list):
    return {"status": status, "device_list": device_list}

def DEVICE_INFORMATION_FORMAT(status, device_info):
    return {"status": status, "device_info": device_info}

def DEVICE_DELETE_FORMAT(status):
    return {"status": status}

def DEVICE_EDIT_FORMAT(status):
    return {"status": status}