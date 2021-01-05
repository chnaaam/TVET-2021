def FREE_BOARD_REGISTER_FORMAT(status):
    return {"status": status}

def FREE_BOARD_LIST_FORMAT(status, free_board_list, free_board_list_length):
    return {"status": status, "free_board_list": free_board_list, "free_board_list_length": free_board_list_length}

def FREE_BOARD_CONTENT_FORMAT(status, content):
    return {"status": status, "free_board_content": content}