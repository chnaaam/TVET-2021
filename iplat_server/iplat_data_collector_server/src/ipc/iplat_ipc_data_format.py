# status, iplat sensor node, iplat ipc protocol
def ENCODE_DATA_FORMAT(status, isn, iip):
    return {
        "status": status,
        "isn": isn,
        "iip": iip
    }

def DECODE_DATA_FORMAT(data):
    return data["status"], data["isn"], data["iip"]