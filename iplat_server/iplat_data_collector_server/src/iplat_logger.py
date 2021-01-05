import sys
import logging
import pprint

IPLAT_LOG_INFO = "INFO"
IPLAT_LOG_DEBUG = "DEBUG"

def iplat_log_init(level):
    logging.basicConfig(
        level=level,
        format='[%(asctime)s][%(levelname)s] >>> %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
        stream=sys.stdout,

    )

def iplat_print(msg, type=IPLAT_LOG_DEBUG):
    msg = pprint.pformat(msg)

    if type == IPLAT_LOG_DEBUG:
        logging.debug(msg=msg)
    else:
        logging.info(msg=msg)
