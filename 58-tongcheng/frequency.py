import time
import datetime
import random

def frequency_control(now_hour,now_day):
    if now_day == 5 or now_day == 6:
        time.sleep(24*3600)
    else:
        if now_hour >= 9 and now_hour < 12:
            time.sleep(random.randint(6,12))
            # print(" 9,,12")
        elif now_hour >=12 and now_hour < 14:
            time.sleep(2*3600)
            # print(" 12,,14")
        elif now_hour >= 14 and now_hour < 17:
            time.sleep(random.randint(6,18))
            # print(" 14,,17")
        elif now_hour >= 17:
            time.sleep(16*2400)
            # print(" 17之后")

if __name__ == '__main__':
    while True:
        now_day = datetime.datetime.now().weekday()
        nowTime = datetime.datetime.now().strftime('%H:%M:%S')
        print(nowTime)
        now_hour = int(nowTime.split(":")[0])
        frequency_control(now_hour,now_day)
