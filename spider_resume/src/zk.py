# coding=utf-8
from kazoo.client import KazooClient
import json

#mysqldb 的信息
def get_mysqldb_info(ip,path):
    zk = KazooClient(hosts=ip)
    zk.start()
    if zk.exists(path):
        data = zk.get(path)
    else:
        raise IOError('please check ZooKeeper path')
    json_data = json.loads(data[0])
    db_ip = json_data["SpiderDB.master.ip"]
    db_port = json_data["SpiderDB.master.port"]
    db_user = json_data['SpiderDB.master.username']
    db_pwd = json_data['SpiderDB.master.password']
    zk.stop()
    zk.close()
    return dict(host=db_ip, port=db_port, username=db_user, password=db_pwd)

#redis的信息
def get_redis_info(ip,path):
    zk = KazooClient(hosts=ip)
    zk.start()
    if zk.exists(path):
        data = zk.get(path)
    else:
        raise IOError('please check ZooKeeper path')
    json_data = json.loads(data[0])
    ip = json_data['Spider_Queue.master.ip'].split(',')[0]
    port = json_data['Spider_Queue.master.port'].split(',')[0]
    password = json_data["Spider_Queue.master.password"]
    zk.stop()
    zk.close()
    return dict(ip=ip, port=port, password=password)


if __name__ == '__main__':
    print (get_mysqldb_info('10.1.50.110:2181', '/pre/fql/redis/Spider_Queue'))