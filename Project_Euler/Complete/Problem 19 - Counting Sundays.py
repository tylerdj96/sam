# You are given the following information, but you may prefer to do some research for yourself.
#
# 1 Jan 1900 was a Monday.
# Thirty days has September,
# April, June and November.
# All the rest have thirty-one,
# Saving February alone,
# Which has twenty-eight, rain or shine.
# And on leap years, twenty-nine.
# A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.
# How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?


#1 January 1901 was a wednesday, due to 1900 being a leap year and 366%7 = 2. so, we just need to calculate what day of the week
# the first of each month was and add it to a running sum
import time

start_time = time.time()
current_day = 2
sundays = 0

for x in range (1901, 2001):
    for y in range (1,13):
        # Handle for September, April, june and november
        if(y==4 or y==6 or y==9 or y==11):
            if(current_day==0):
                sundays += 1
            current_day = (current_day+2)%7
        # Handle for February + leap February
        elif(y==2):
            if(x%4==0 and x%400!=0):
                if(current_day==0):
                    sundays += 1
                current_day = (current_day+1)%7
            else:
                if(current_day==0):
                    sundays += 1
                current_day = current_day
        else:
            if(current_day==0):
                sundays += 1
            current_day = (current_day+3)%7

print("Answer: ", sundays)
print("RUN TIME: ", time.time() - start_time)

