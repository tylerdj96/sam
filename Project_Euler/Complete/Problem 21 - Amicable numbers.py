# Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
# If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.
#
# For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.
#
# Evaluate the sum of all the amicable numbers under 10000.
import math

def trial_division(n):
    x = 1
    factors = []
    while(math.sqrt(n)>=x):
        if(n%x==0):
            factors.append(x)
            factors.append(int(n/x))
        x += 1
    factors.remove(n)
    return factors


my_list = list(range(2,10000))
amicables = []

for x in my_list:
    curr = sum(trial_division(x))
    curr2 = sum(trial_division(curr))
    if(x == curr2 and curr != curr2):
        amicables.append(curr)
        amicables.append(x)

        ## we can remove the elements from the master list. Avoid adding duplicates!
        my_list.remove(curr)
        my_list.remove(x)

print(sum(amicables))

