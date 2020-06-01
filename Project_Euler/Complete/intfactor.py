import math

###############################################################
## Name: Trial Division
## Input: Integer to be factored
## Output: A list of unsorted factors (prime & composite)
## Algorithm Overview: Starting from 1 or 2, proceed up to n incrementally, testing if each iteration
##                     divides n evenly. If x does divide n evenly, append x as well as n/x to the return
##                     list. Iterate while x is less than square_root(n)
## Run Time: This algorithm iterates at worst
###############################################################
def trial_division(n):
    x = 1
    factors = []
    while(math.sqrt(n)>=x):
        if(n%x==0):
            factors.append(x)
            factors.append(int(n/x))
        x += 1
    return factors

def fermat_factorization(n):

###############################################################
## Name: prime factor
## Input: Integer to be factored
## Output: A list of sorted prime factors, with duplicates
## Algorithm Overview: First, divide n by 2 as many times as it takes to make n odd, appending 2 to the list of prime
##                     factors each time. Then, while f (can start at 3) is less than square_root(n), if n is divided evenly by
##                     f, then add f to the factors list and divide it out of n, otherwise increment f by 2 since we shouldn't
##                     need to test even divisors due to our initial 2 division.
## Run Time: This algorithm iterates at worst
###############################################################
def prime_factor(n):
    a = []
    while n%2 == 0:
        a.append(2)
        n/=2
    f=3
    while f * f <= n:
        if (n % f == 0):
            a.append(f)
            n /= f
        else:
            f += 2
    if(n!=1):
        a.append(n)
    #Only odd number is possible
    return a

def
print(factor(36))