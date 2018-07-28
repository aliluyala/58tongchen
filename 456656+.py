
# import hashlib
# data1 = {"name":"liujie","age":24,"job":"enginerr"}
# data2 = {"name":"cj.j.","age":34,"job":"travel"}
# m = hashlib.md5()
# m.update(str(data2).encode())
# data_md5 = m.hexdigest()[10:-10]
# print(data_md5)

import pymysql
from pymysql import IntegrityError
conn = pymysql.Connect(host = "127.0.0.1",port = 3306,user="root",passwd = "Ljj281150",db = "hehe",charset = "utf8")
cur = conn.cursor()
insert_sql = "insert into A(id,name) values('BM0W','k00j')"

try:
    cur.execute(insert_sql)
    conn.commit()
except IntegrityError:
    print("asd")




# conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='Ljj281150', db='hehe', charset='utf8')
# cur = conn.cursor()
# create_table_sql = "create table AMG(id char(50) primary key,name char(20))"
# insert_sql = "insert into amg(id,name) values('BM','liujie')"
# print(insert_sql)
# cur.execute(insert_sql)
