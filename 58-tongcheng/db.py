from settings import *
import pymongo
import pymysql

class Mon(object):
    def __init__(self):
        self.client = pymongo.MongoClient(MONGO_HOST,MONGO_PORT)
        self.db = self.client[MONGO_DB_NAME]
    def insert(self,coll_name,data):
        self.db[coll_name].insert(data)
    def close(self):
        self.client.close()

class Msql(object):
    def __init__(self):
        try:
            self.conn = pymysql.connect(host=MYSQL_HOST,user=MYSQL_USER,passwd=MYSQL_PASSWORD,db=MYSQL_DATABASE,port=MYSQL_PORT,charset='utf8')
        except Exception as e:
            print(e)
        else:
            print('连接成功')
            self.cur = self.conn.cursor()
    def create_table(self,sql):
        # sql = 'create table testtb(id int, name varchar(10),age int)'
        try:
            res = self.cur.execute(sql)
        except:
            print("创建表失败！")
    def add(self,sql):
        # sql = 'insert into testtb values(1,"Tom",18),(2,"Jerry",16),(3,"Hank",24)'
        res = self.cur.execute(sql)
        if res:
            self.conn.commit()
        else:
            self.conn.rollback()
    def close(self):
        self.cur.close()
        self.conn.close()
if __name__ == '__main__':
    m = Msql()
    create_resume_sql = "create table resume_data(name varchar(10),sex char(3),age int,experience varchar(20),expect_salary varchar(20),expect_Location varchar(5),native char(5))"
    create_edu_sql = "create table edu_data(college varchar(20),graduate_time varchar(30),profession varchar(50))"
    m.create_table(create_edu_sql)
    create_exper_sql = "create table exper_data(company_name varchar(100),job_time varchar(100),salary char(30),pose_name varchar(50))"
    m.create_table(create_exper_sql)






    # data = {"name":"刘杰","age":12}
    # insert_sql = "insert into resume_data values('{name}',{age})".format(name=data["name"],age=data["age"])
    # print(insert_sql)
    # m.add(insert_sql)





