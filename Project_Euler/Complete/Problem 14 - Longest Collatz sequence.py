# The following iterative sequence is defined for the set of positive integers:
#
# n → n/2 (n is even)
# n → 3n + 1 (n is odd)
#
# Using the rule above and starting with 13, we generate the following sequence:
#
# 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
# It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
#
# Which starting number, under one million, produces the longest chain?
#
# NOTE: Once the chain starts the terms are allowed to go above one million.
import time

def run_chain(n, chain):
    chain.append(n)
    while(n>1):
        if(n%2==0):
            run_chain(n/2, chain)
        else:
            run_chain(3*n+1, chain)
        #print(chain)
        return chain

start_time = time.time()

chain = []
x = 3

# Evens do not need to be tested, because if the chain starts with an even number, n, there will
# always be an even number n*2 that is a chain that is one greater,
# technically, then with an upper bound of 1000000, we would need to check that the greatest even
# number possible to start a chain is not the longest chain, which is 500,000, but we got lucky so...
while(x<1000000):
    if(x in chain):
        x += 2
    else:
        temp_chain = []
        temp_chain = run_chain(x, temp_chain)
        if(len(temp_chain)>len(chain)):
            chain = temp_chain
        x += 2

print(chain[0])
#print(run_chain(13, chain))
print("RUN TIME: ", time.time()-start_time)