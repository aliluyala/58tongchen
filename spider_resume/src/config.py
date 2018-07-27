# coding=utf-8
import os
import random
import requests
import json

#开发
env = ''
zk_db_info = dict(zk_ip = '10.1.48.44:2181', path='/dev/fql/db/SpiderDB')
zk_redis_info = ['10.1.48.44:2181','/dev/fql/redis/Spider_Queue']
splash_url = 'http://10.1.50.225:8050/'
ip_pool_url = 'http://10.1.50.125:8182/proxy?websitCode='

#测试
# env = ''
# zk_redis_info = ['10.1.50.110:2181','/pre/fql/redis/Spider_Queue']
# zk_db_info = dict(zk_ip = '10.1.50.110:2181', path='/pre/fql/db/SpiderDB')
# splash_url = 'http://10.1.50.225:8050/'
# ip_pool_url = 'http://10.1.50.125:8182/proxy?websitCode='

#预发布
# env = 'PRE_'
# zk_redis_info = ['10.10.16.125:2187','/pre/fql/redis/Spider_Queue']
# zk_db_info = dict(zk_ip = '10.10.16.125:2187', path='/pre/fql/db/SpiderDB')
# splash_url = 'http://192.168.85.66:40500/'
# ip_pool_url = 'http://192.168.85.142:8182/proxy?websitCode='

#灰度
# env = 'GRAY_'
# zk_redis_info = ['10.10.16.125:2187','/gray/fql/redis/Spider_Queue']
# zk_db_info = dict(zk_ip = '10.10.16.125:2187', path='/gray/fql/db/SpiderDB')
# splash_url = 'http://192.168.85.66:40500/'
# ip_pool_url = 'http://192.168.85.142:8182/proxy?websitCode='

#线上 
# env = ''
# zk_redis_info = ['10.10.16.125:2187','/prod/fql/redis/Spider_Queue']
# zk_db_info = dict(zk_ip = '10.10.16.125:2187', path='/prod/fql/db/SpiderDB')
# splash_url = 'http://splash.spider.fenqile.cn/'
# ip_pool_url = 'http://192.168.85.142:8182/proxy?websitCode='

MYSQL_DB = 'spider_poi_info_db'


PROXIES = [
    dict(proxy_host="http-pro.abuyun.com",proxy_port='9010', proxy_user='HAVR80800N850IZP', proxy_pass='5A75EEEBBD300D56'),
    dict(proxy_host= "http-pro.abuyun.com",proxy_port='9010',proxy_user='HK02JI09RDSQ5HGP', proxy_pass='C258DC424A3FDE15'),
    dict(proxy_host="http-pro.abuyun.com",proxy_port='9010', proxy_user='H1Z5W387A092011P', proxy_pass='2EA595EED133AA06'),
    dict(proxy_host="http-pro.abuyun.com",proxy_port='9010', proxy_user='H59Z80I4F0S9XJ8P', proxy_pass='77B2681159CAFE0C'),
    dict(proxy_host="http-pro.abuyun.com",proxy_port='9010', proxy_user='HIG7I9U439016U5P', proxy_pass='05BE6AFFC60554A3'),
]

change_url = "http://proxy.abuyun.com/switch-ip"
current_ip = 'http://proxy.abuyun.com/current-ip'

#拿代理IP
def get_proxy():
    chosen_proxy = random.choice(PROXIES)
    proxy_meta = "http://%(user)s:%(pass)s@%(host)s:%(port)s" % {
        "host": chosen_proxy['proxy_host'],
        "port": chosen_proxy['proxy_port'],
        "user": chosen_proxy['proxy_user'],
        "pass": chosen_proxy['proxy_pass'],
    }
    proxies = {'http': proxy_meta,
               'https': proxy_meta}
    return proxies