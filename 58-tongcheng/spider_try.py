import requests
import re
from urllib import request
from filter_words import map_rule
from lxml import etree
TEST_URL = "https://jianli.58.com/resumedetail/singles/3_ner5nvdQTEOanG6uTeyslEDkTenpTvn5TETknpsunemYnedYneHpMGypnhsunErsnEgknenfnEm*?psid=189929350200876679999187452&entinfo=3_ner5nvdQTEOanG6uTeyslEDkTenpTvn5TETknpsunemYnedYneHpMGypnhsunErsnEgknenfnEm*_p&sourcepath=pc-jllistb-zhineng&f=pc_list_detai&dpid=ac54dc2e2edb477ab5d60500e9bafb54&followparam=%7B%22searchID%22%3A%227fab1e8c254048f087c9d095a33a982a%22%2C%22searchVersion%22%3A21300%2C%22searchAreaID%22%3A4%2C%22searchFirstAreaID%22%3A4%2C%22searchPositionID%22%3A2080%2C%22searchSecondPositionID%22%3A2080%2C%22page%22%3A1%2C%22location%22%3A21%2C%22resumeType%22%3A1%2C%22platform%22%3A%22pc%22%2C%22sourcePage%22%3A%22pc-jllistb-zhineng%22%2C%22operatePage%22%3A%22list%22%7D&PGTID=0d302409-0000-468d-2a00-9837490f3e1a&ClickID=7"
HEADERS = {
'Cookie': '58home=sz; id58=c5/njVtYB8uhzGlcBAaHAg==; city=sz; 58tj_uuid=21b767c1-136b-4975-a73c-9d8e7069d9d5; xxzl_deviceid=J0sHJY6t9OmSCVXw5GCBuBzMBLsEcKnqoVSf1g5SEGniGm8GbPEqpCBF9cCYUgBM; als=0; wmda_uuid=56a2375fe1815622161a8ce8d662b5a9; wmda_new_uuid=1; wmda_visited_projects=%3B1731916484865; xxzl_smartid=250f3edaf22e0fb455da0be3f08be011; expire_oneday=20186251431; show_zcm_banner=true; param8616=1; param8716kop=1; showPTTip=1; ljrzfc=1; isSmartSortTipShowed=true; expire_vcode=20186251453; Hm_lvt_a3013634de7e7a5d307653e15a0584cf=1532500292,1532501599; f=n; commontopbar_new_city_info=4%7C%E6%B7%B1%E5%9C%B3%7Csz; new_uv=5; utm_source=; spm=; init_refer=https%253A%252F%252Fwww.baidu.com%252Flink%253Furl%253DVDn8ch9WTFPNEJs7je3kXr6V0T3u3aVbBvH5ZjErwKm%2526wd%253D%2526eqid%253Db9a17bdb000382f0000000065b591eb3; commontopbar_ipcity=sz%7C%E6%B7%B1%E5%9C%B3%7C0; new_session=0; ppStore_fingerprint=7300967C7D1A035B7CE8166CFDDAC2D77A4FF8E8E01540CC%EF%BC%BF1532567206070; PPU="UID=56013406849297&UN=n7ufpw3xy&TT=ea99c821bc062d1d33f2a5c275d242c3&PBODY=KwOubGjkBeoqqlprqwtcwD8y7hbGT78DnL7-IJp6ZDcOetOs60wSOTtPqCxEAgW-V4TvW9DBpcV5Kcpbx-sWQkiXv-yweibjUwoYEj_kidrQckAjHNfX1nhdBe1tvO9oHalwBJ8ElEQqYtzj2cMPQvPiefDTjDeUK7TBlOf5hws&VER=1"; 58cooper="userid=56013406849297&username=n7ufpw3xy&cooperkey=34f2046e1206086f55887931fcc8462f"; www58com="AutoLogin=false&UserID=56013406849297&UserName=n7ufpw3xy&CityID=0&Email=&AllMsgTotal=0&CommentReadTotal=0&CommentUnReadTotal=0&MsgReadTotal=0&MsgUnReadTotal=0&RequireFriendReadTotal=0&RequireFriendUnReadTotal=0&SystemReadTotal=0&SystemUnReadTotal=0&UserCredit=0&UserScore=0&PurviewID=&IsAgency=false&Agencys=null&SiteKey=08CDD29DF3C975887D9CDFB82C6EB1C6E6F78B5DB29FC5D72&Phone=&WltUrl=&UserLoginVer=887EB60F8846773DBC56996B601E55398&LT=1532567238793"; commontopbar_myfeet_tooltip=end',
'User-Agent':"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36"
}

def try_data():
    r = requests.get(TEST_URL,headers=HEADERS)
    html = etree.HTML(r.text)
    data = dict()
    name = html.xpath('//span[@id="name"]/text()')
    sex = html.xpath('//span[@class="sex stonefont"]/text()')
    age = html.xpath('//span[@class="age stonefont"]/text()')
    edu = html.xpath('//span[@class="edu stonefont"]/text()')
    status = html.xpath('//span[@class="stonefont"]/text()')
    woff_url = re.findall(r'src:url\((.*?)\)  format',r.text,re.M)[0]
    try_woff(woff_url)
    data["name"] = str(name)[2:-2]
    data["sex"] = str(sex)[2:-2]
    data["age"] = str(age)[2:-2]
    data["status"] = str(status)[2:-2]
    cleaned_data = clean_data(data,remap_data())
    return data

def try_woff(woff_url):
    r = request.urlopen(woff_url)
    with open("58.woff","wb") as f:
        f.write(r.read())

def remap_data():
    data = map_rule()
    return data

def clean_data(raw_data,rule):
    for i in rule.keys():
        raw_data["name"] = raw_data["name"].replace(i,rule[i]) if i in raw_data["name"] else raw_data["name"]
        raw_data["sex"] = raw_data["sex"].replace(i,rule[i]) if i in raw_data["sex"] else raw_data["sex"]
        raw_data["age"] = raw_data["age"].replace(i,rule[i]) if i in raw_data["age"] else raw_data["age"]
        raw_data["status"] = raw_data["status"].replace(i,rule[i]) if i in raw_data["status"] else raw_data["status"]
    return raw_data


if __name__ == '__main__':
    data = try_data()
    print(data)




