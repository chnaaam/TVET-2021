def NOTICE_BOARD_REGISTER_FORMAT(status):
    return {"status": status}

def NOTICE_BOARD_LIST_FORMAT(status, notice_board_list, notice_board_list_length):
    return {"status": status, "notice_board_list": notice_board_list, "notice_board_list_length": notice_board_list_length}

def NOTICE_BOARD_CONTENT_FORMAT(status, content):
    return {"status": status, "notice_board_content": content}