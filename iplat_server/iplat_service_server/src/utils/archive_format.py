def ARCHIVE_REGISTER_FORMAT(status):
    return {"status": status}

def ARCHIVE_LIST_FORMAT(status, archive_list):
    return {"status": status, "archive_list": archive_list, "archive_list_length": len(archive_list.keys())}

def ARCHIVE_CONTENT_FORMAT(status, content):
    return {"status": status, "archive_content": content}