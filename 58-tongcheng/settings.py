import random
SPIDER_NAME = "58-tong"

REDIS_HOST = "localhost"
REDIS_PORT = 6379
REDIS_PASSWORD = None

MYSQL_HOST = 'localhost'
MYSQL_PORT = 3306
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'Ljj281150'
MYSQL_DATABASE = "Resume58"



TIMEOUT = None

CON_NUMS = 1

LOG_LEVLE = "info"

TRANS_ITEM = False

MONGO_HOST = "localhost"
MONGO_PORT = 27017
MONGO_DB_NAME = SPIDER_NAME

INTO_DB = False

agents = [
    "Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    "Avant Browser/1.2.789rel1 (http://www.avantbrowser.com)",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.0 Safari/532.5",
    "Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/532.9 (KHTML, like Gecko) Chrome/5.0.310.0 Safari/532.9",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.514.0 Safari/534.7",
    "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/534.14 (KHTML, like Gecko) Chrome/9.0.601.0 Safari/534.14",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.14 (KHTML, like Gecko) Chrome/10.0.601.0 Safari/534.14",
    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.20 (KHTML, like Gecko) Chrome/11.0.672.2 Safari/534.20",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.27 (KHTML, like Gecko) Chrome/12.0.712.0 Safari/534.27",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.24 Safari/535.1",
    "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.36 Safari/535.7",
    "Mozilla/5.0 (Windows; U; Windows NT 6.0 x64; en-US; rv:1.9pre) Gecko/2008072421 Minefield/3.0.2pre",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.10) Gecko/2009042316 Firefox/3.0.10",
    "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-GB; rv:1.9.0.11) Gecko/2009060215 Firefox/3.0.11 (.NET CLR 3.5.30729)",
    "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 GTB5",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; tr; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8 ( .NET CLR 3.5.30729; .NET4.0E)"
]

proxyHost = "http-dyn.abuyun.com"
proxyPort = "9020"
# 代理隧道验证信息
proxyUser = "H0430Z21W9G039LD"
proxyPass = "6197FECC49ED762A"
proxyMeta = "http://%(user)s:%(pass)s@%(host)s:%(port)s" % {
    "host": proxyHost,
    "port": proxyPort,
    "user": proxyUser,
    "pass": proxyPass,
}
proxies = {
    "http": proxyMeta,
    "https": proxyMeta,
}

HEADERS = {
'cookie': '58home=sz; id58=c5/njVtYB8uhzGlcBAaHAg==; city=sz; 58tj_uuid=21b767c1-136b-4975-a73c-9d8e7069d9d5; xxzl_deviceid=J0sHJY6t9OmSCVXw5GCBuBzMBLsEcKnqoVSf1g5SEGniGm8GbPEqpCBF9cCYUgBM; als=0; wmda_uuid=56a2375fe1815622161a8ce8d662b5a9; wmda_new_uuid=1; wmda_visited_projects=%3B1731916484865; xxzl_smartid=250f3edaf22e0fb455da0be3f08be011; show_zcm_banner=true; param8616=1; param8716kop=1; ljrzfc=1; isSmartSortTipShowed=true; ppStore_fingerprint=7300967C7D1A035B7CE8166CFDDAC2D77A4FF8E8E01540CC%EF%BC%BF1532567206070; 58cooper="userid=56013406849297&username=n7ufpw3xy&cooperkey=34f2046e1206086f55887931fcc8462f"; www58com="AutoLogin=false&UserID=56013406849297&UserName=n7ufpw3xy&CityID=0&Email=&AllMsgTotal=0&CommentReadTotal=0&CommentUnReadTotal=0&MsgReadTotal=0&MsgUnReadTotal=0&RequireFriendReadTotal=0&RequireFriendUnReadTotal=0&SystemReadTotal=0&SystemUnReadTotal=0&UserCredit=0&UserScore=0&PurviewID=&IsAgency=false&Agencys=null&SiteKey=08CDD29DF3C975887D9CDFB82C6EB1C6E6F78B5DB29FC5D72&Phone=&WltUrl=&UserLoginVer=887EB60F8846773DBC56996B601E55398&LT=1532567238793"; sessionid=b3ee71aa-9a14-4b61-9dbd-a12d6daf4afd; wmda_session_id_1731916484865=1532588731875-fbcd1712-88d8-83b1; PPU="UID=56013406849297&UN=n7ufpw3xy&TT=ea99c821bc062d1d33f2a5c275d242c3&PBODY=LsJ-GkzLIEv5VrxIadCaoPcBn_v7m0zw_CIMgBv6wrO8QdjeUHfNOh7nVjHIXBwTir-BQKtQ2sxjDH2gUvAjQqdtIezf1uBBiqjJGtRhnXpNlEKqK-t1MYeUPZ2_VPOctFxECKMfCeEdDrm_62047Hacw5FdG30NpyWGWGs8-28&VER=1"; new_uv=9; utm_source=; spm=; init_refer=http%253A%252F%252Fsz.58.com%252Fsearchjob%252Fpn28%252F%253Fkey%253D%2525E5%2525B9%2525BF%2525E4%2525B8%25259C%2525E5%2525B7%2525A5%2525E4%2525B8%25259A%2525E5%2525A4%2525A7%2525E5%2525AD%2525A6%2526PGTID%253D0d302409-0000-4447-4732-88c475fe748a%2526ClickID%253D1; showPTTip=1; new_session=0',
'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
}
PROXIES = None