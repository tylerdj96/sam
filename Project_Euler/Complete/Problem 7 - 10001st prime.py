# By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
#
# What is the 10 001st prime number?

import math

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

numbers = []
i = 1

while(len(numbers)<10001):
    if(is_prime(i)==True):
        numbers.append(i)
    i += 1

print(len(numbers))
print(numbers[-1])