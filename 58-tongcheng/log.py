import logging
from settings import *
class Log(object):
    def __init__(self,set_level=LOG_LEVLE):
        choi = {"debug": logging.DEBUG, "info": logging.INFO, "warning": logging.WARNING, "error": logging.ERROR}
        self.logger = logging.getLogger()
        self.logger.setLevel(choi[set_level])
        logfile = 'logger.txt'
        fh = logging.FileHandler(logfile, mode='a', encoding="utf-8")
        fh.setLevel(choi["warning"])
        ch = logging.StreamHandler()
        ch.setLevel(choi[set_level])
        formatter = logging.Formatter("%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s")
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)
        self.logger.addHandler(fh)
        self.logger.addHandler(ch)
    def log(self,obj,obj_level):
        self.logger.debug(obj) if obj_level == "debug" else None
        self.logger.info(obj) if obj_level == "info" else None
        self.logger.warning(obj) if obj_level == "warning" else None
        self.logger.error(obj) if obj_level == "error" else None
log = Log()
if __name__ == '__main__':
    l = Log()
    for i in range(10):
        l.log(str(i),"info")
