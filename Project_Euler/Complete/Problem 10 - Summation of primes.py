# The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
#
# Find the sum of all the primes below two million.

import math
import time

def is_prime(x):
    if(x<=1):
        return False
    elif(x<=3):
        return True
    elif(x%2==0 or x%3==0):
        return False
    i = 5
    while(i<=math.sqrt(x)):
        if(x%i==0 or x%(i+2)==0):
            return False
        i += 6
    return True

## True indicates a prime so all values initially set to False
def Eratosthenes(x):
    marked_nums = ['true']*(x-1)
    primes = []
    p = 2
    while(p<=math.sqrt(x)):
        # marked_nums[0] = 'true'
        j = p + 2
        if(marked_nums[p] == 'true'):
            for i in range(p*2, len(marked_nums), p):
                marked_nums[i-2]='false'
        p += 1
        print(marked_nums)
        #     else:
        #         marked_nums[i]='checked'
        # if('false' in marked_nums):
        #     p = marked_nums.index('false')
        # else:
        #     return primes
    for j in range(0, len(marked_nums)):
        if(marked_nums[j]=='true'):
            primes.append(j+2)
    return primes

start_time = time.time()
running_sum = []

for i in range(1,17):
     if(is_prime(i)):
         running_sum.append(i)

print(running_sum)
print("--- %s seconds with trial division ---" % (time.time() - start_time))


start_time = time.time()
# for i in range(1,2000000):
#      if(Eratosthenes(i)):
#          running_sum += i
sum = 0
primes = Eratosthenes(13)
print(primes)


shared = primes or running_sum
print(shared)
for i in range(0, len(primes)):
    sum += primes[i]
print(sum)
print("--- %s seconds with Eratosthenes ---" % (time.time() - start_time))