# TODO : Get Method Error

def LOGIN_FORMAT(status, user_token, is_manager):
    return {"status": status, "user_token": user_token, "is_manager": is_manager}

def LOGOUT_FORMAT(status):
    return {"status": status}

def REGISTER_FORMAT(status):
    return {"status": status}

def SALT_FORMAT(status, salt):
    return {"status": status, "salt": salt}