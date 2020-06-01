# 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
#
# What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

def is_divisible(x):
    nums = list(range(1,20))
    for y in nums:
        if(x%y!=0):
            return False
    return True

x = 20

while(is_divisible(x)==False):
    x += 10

print(x)