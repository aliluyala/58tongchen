from  spiders import Tong58_Spider
from settings import  *
if __name__ == '__main__':
    a = Tong58_Spider()
    a.start_req()
    a.run(CON_NUMS)