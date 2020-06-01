# The prime factors of 13195 are 5, 7, 13 and 29.
#
# What is the largest prime factor of the number 600851475143 ?

def prime_factor(n):
    a = []
    x = 2

    while(x<=n):
        if(n%x==0):
            n /= x
            a.append(x)
        else:
            x += 1
    print(a)


prime_factor(600851475143)