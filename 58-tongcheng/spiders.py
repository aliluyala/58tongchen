from req import Aio_Req,Sin_Req
from lxml import etree
import asyncio
from settings import *
import threading as th
from m_queue import TaskQueue
import requests
import re
from filter_words import map_rule
import time
import random
from query_list import KEYS
from frequency import frequency_control
import datetime
from log import log
from urllib.parse import quote
from urllib import request
from db import Mon,Msql
task_queue = TaskQueue()
mon = Mon()
m = Msql()
class Tong58_Spider(object):
    def __init__(self):
        self.base_url = "http://sz.58.com/searchjob/?key="
    def start_req(self):
        """
        依据查询关键字形成初始请求
        :return:
        """
        for k in KEYS:
            start_task = Sin_Req(self.base_url+quote(k),self.parse_lst)
            task_queue.add_task(start_task)
    def parse_lst(self,response):
        """
        列表页解析出详情页url，并解析出下一页的请求
        :param response:
        :return:
        """
        html = etree.HTML(response["response"])
        items = html.xpath('//div[@id="infolist"]/dl')
        for i in items:
            detail_url = i.xpath('dt[@class="w325"]/a/@href')
            log.log("详情页    "+detail_url[0],"debug")
            cleaned_detail_url = "https://"+detail_url[0][2:]
            detail_task = Sin_Req(cleaned_detail_url.replace('single',"singles").replace(r'/?psid','?psid'),self.parse_detail)
            # print("https://"+detail_url[0][2:])
            task_queue.add_task(detail_task)
        next_page = html.xpath('//a[@class="next"]/@href')
        if next_page:
            log.log("下一页的链接   "+next_page[0],"debug")
            next_task = Sin_Req(next_page[0],self.parse_lst)
            task_queue.add_task(next_task)
    def parse_detail(self,response):
        """
        详情页解析目标数据，并作字体解密
        :param response:
        :return:
        """
        data = dict()
        html = etree.HTML(response["response"])
        name = html.xpath('//span[@id="name"]/text()')
        sex = html.xpath('//span[@class="sex stonefont"]/text()')
        age = html.xpath('//span[@class="age stonefont"]/text()')
        edu = html.xpath('//span[@class="edu stonefont"]/text()')
        expc_salary = html.xpath('//div[@class="expectInfo"]/p[@class="stonefont"]/text()')
        expc_salary[1] = str(expc_salary[1]).strip() if len(expc_salary) >= 2 else None
        experience = html.xpath('//span[@class="stonefont"]/text()')
        data["name"] = str(name)[2:-2]
        data["sex"] = str(sex)[2:-2]
        data["age"] = str(age)[2:-2]
        data["experience"] = str(experience)[2:-2]
        data["expect_salary"] = str(expc_salary[1:2])[2:-2]

        #woff文件链接解析和下载
        woff_url = re.findall(r'src:url\((.*?)\)  format', response["response"], re.M)[0]
        self.download_woff(woff_url)
        rule = map_rule()
        cleaned_data = self.clean_data(data,rule)

        #未加密的字段解析
        expe_loc = html.xpath('//div[@id="expectLocation"]/text()')
        cleaned_data["expect_Location"] = str(expe_loc[0]).strip() if expe_loc else None
        span = html.xpath('//div[@class="base-detail"]/span')
        native = span[-3].xpath('text()') if len(span) == 11 else None
        cleaned_data["native"] = native[0] if native else None
        live_addr = span[-1].xpath('text()') if len(span) != 7 else None
        cleaned_data["live_address"] = live_addr[0] if live_addr else None
        #受教育信息
        edu_items = html.xpath('//div[@class="education experience"]/div[@class="edu-detail"]')
        edu_info = []
        for i in edu_items:
            edu_data = dict()
            college = i.xpath('div[1]/span[@class="college-name"]/text()')
            gra_time = i.xpath('div[1]/span[@class="graduate-time"]/text()')
            profes = i.xpath('div[2]/span[@class="professional"]/text()')
            edu_data["college"] = college[0] if college else None
            edu_data["graduate_time"] = gra_time[0] if gra_time else None
            edu_data["profession"] = profes[0] if profes else None
            edu_info.append(edu_data)
        cleaned_data["edu_info"] = edu_info
        #工作经验
        exper_items = html.xpath('//div[@class="experience-detail"]')
        exper_info = []
        for j in exper_items:
            exper_data = dict()
            company = j.xpath('div[@class="itemName"]/text()')
            more_item = j.xpath('div[@class="project-content"]/p')
            if more_item:
                job_time = more_item[0].xpath('span/text()')[0]
                salary = more_item[1].xpath('span/text()')[0]
                pose_name = more_item[2].xpath('span/text()')[0]
                exper_data["company"] = company[0] if company else None
                exper_data["job_time"] = job_time
                exper_data["salary"] = salary
                exper_data["pose_name"] = pose_name
                exper_info.append(exper_data)
        cleaned_data["experience_info"] = exper_info
        if cleaned_data["age"]:
            cleaned_data["age"] = int(cleaned_data["age"].replace("岁","")) if "岁" in cleaned_data["age"] else None
        log.log(str(cleaned_data),"info")
        mon.insert("resume",cleaned_data)
    def download_woff(self,woff_url):
        """
        下载对应页面woff文件
        :param woff_url:
        :return:
        """
        r = request.urlopen(woff_url)
        with open("58.woff", "wb") as f:
            f.write(r.read())
    def clean_data(self,raw_data,rule):
        """
        加密数据字段解密处理
        :param raw_data: 加密的数据
        :param rule: 字段解密映射规则
        :return: 解密后数据
        """
        for i in rule.keys():
            raw_data["name"] = raw_data["name"].replace(i, rule[i]) if i in raw_data["name"] else raw_data["name"]
            raw_data["sex"] = raw_data["sex"].replace(i, rule[i]) if i in raw_data["sex"] else raw_data["sex"]
            raw_data["age"] = raw_data["age"].replace(i, rule[i]) if i in raw_data["age"] else raw_data["age"]
            raw_data["experience"] = raw_data["experience"].replace(i, rule[i]) if i in raw_data["experience"] else raw_data["experience"]
            raw_data["expect_salary"] = raw_data["expect_salary"].replace(i, rule[i]) if i in raw_data["expect_salary"] else raw_data["expect_salary"]
        return raw_data
    def run(self,nums):
        while True:
            task_ = [task_queue.pop_task() for _ in range(nums)]
            tasks = [th.Thread(target=i.get()) for i in task_ if i != None]
            for i in tasks:
                i.start()
                time.sleep(random.randint(3,8))
                # now_day = datetime.datetime.now().weekday()
                # nowTime = datetime.datetime.now().strftime('%H:%M:%S')
                # now_hour = int(nowTime.split(":")[0])
                # frequency_control(now_hour, now_day)
            for i in tasks:
                i.join()
            if None in task_:
                log.log("任务队列已空！","info")
                break

if __name__ == '__main__':
    a = Tong58_Spider()
    a.start_req()
    a.run(CON_NUMS)
