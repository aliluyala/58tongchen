import aiohttp
import requests
import redis
import asyncio
from settings import *
from requests import Request
from lxml import etree
import pickle
from m_queue import TaskQueue
import random
from log import log
tt = TaskQueue()

class Aio_Req(object):
    def __init__(self,url,callback,meta = {}):
        self.url = url
        self.callback = callback
        self.meta = meta
        self.headers = {"User-Agent":random.choice(agents)}
    async def aio_req(self):
        async with aiohttp.ClientSession() as resp:
            try:
                async with resp.get(url=self.url,headers=self.headers) as resp:
                    page = await resp.text()
                    self.meta["response"] = page
                    log.log(str(resp.status) + "   " + self.url, "info")
                    self.callback(self.meta)
                    tt.old_task(self.url)
            except Exception as e:
                print(e)
                tt.add_task(Aio_Req(self.url,self.callback,meta=self.meta))
                log.log(self.url + "   " + str(e),"error")

class Sin_Req(object):
    def __init__(self,url,callback,meta = {}):
        self.url = url
        self.callback = callback
        self.meta = meta
        self.headers = {
'cookie': '58home=sz; id58=c5/njVtYB8uhzGlcBAaHAg==; city=sz; 58tj_uuid=21b767c1-136b-4975-a73c-9d8e7069d9d5; xxzl_deviceid=J0sHJY6t9OmSCVXw5GCBuBzMBLsEcKnqoVSf1g5SEGniGm8GbPEqpCBF9cCYUgBM; als=0; wmda_uuid=56a2375fe1815622161a8ce8d662b5a9; wmda_new_uuid=1; wmda_visited_projects=%3B1731916484865; xxzl_smartid=250f3edaf22e0fb455da0be3f08be011; show_zcm_banner=true; param8616=1; param8716kop=1; ljrzfc=1; isSmartSortTipShowed=true; ppStore_fingerprint=7300967C7D1A035B7CE8166CFDDAC2D77A4FF8E8E01540CC%EF%BC%BF1532567206070; 58cooper="userid=56013406849297&username=n7ufpw3xy&cooperkey=34f2046e1206086f55887931fcc8462f"; www58com="AutoLogin=false&UserID=56013406849297&UserName=n7ufpw3xy&CityID=0&Email=&AllMsgTotal=0&CommentReadTotal=0&CommentUnReadTotal=0&MsgReadTotal=0&MsgUnReadTotal=0&RequireFriendReadTotal=0&RequireFriendUnReadTotal=0&SystemReadTotal=0&SystemUnReadTotal=0&UserCredit=0&UserScore=0&PurviewID=&IsAgency=false&Agencys=null&SiteKey=08CDD29DF3C975887D9CDFB82C6EB1C6E6F78B5DB29FC5D72&Phone=&WltUrl=&UserLoginVer=887EB60F8846773DBC56996B601E55398&LT=1532567238793"; sessionid=b3ee71aa-9a14-4b61-9dbd-a12d6daf4afd; wmda_session_id_1731916484865=1532588731875-fbcd1712-88d8-83b1; PPU="UID=56013406849297&UN=n7ufpw3xy&TT=ea99c821bc062d1d33f2a5c275d242c3&PBODY=LsJ-GkzLIEv5VrxIadCaoPcBn_v7m0zw_CIMgBv6wrO8QdjeUHfNOh7nVjHIXBwTir-BQKtQ2sxjDH2gUvAjQqdtIezf1uBBiqjJGtRhnXpNlEKqK-t1MYeUPZ2_VPOctFxECKMfCeEdDrm_62047Hacw5FdG30NpyWGWGs8-28&VER=1"; new_uv=9; utm_source=; spm=; init_refer=http%253A%252F%252Fsz.58.com%252Fsearchjob%252Fpn28%252F%253Fkey%253D%2525E5%2525B9%2525BF%2525E4%2525B8%25259C%2525E5%2525B7%2525A5%2525E4%2525B8%25259A%2525E5%2525A4%2525A7%2525E5%2525AD%2525A6%2526PGTID%253D0d302409-0000-4447-4732-88c475fe748a%2526ClickID%253D1; showPTTip=1; new_session=0',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
}
    def get(self):
        try:
            r = requests.get(url=self.url,headers = self.headers,proxies = PROXIES)
            log.log(str(r.status_code)+"   "+self.url,"info")
            self.meta["response"] = r.text
            self.callback(self.meta)
            # tt.old_task(self.url)
        except Exception as e:
            tt.add_task(Sin_Req(self.url, self.callback,meta=self.meta))
            log.log(self.url+"  "+str(e),"error")

if __name__ == '__main__':
    pass