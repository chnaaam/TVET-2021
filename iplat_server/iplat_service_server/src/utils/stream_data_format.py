def STREAM_DATA_FORMAT(status, ip, port):
    return {"status": status, "net_info": "http://" + ip + ":" + str(port)}