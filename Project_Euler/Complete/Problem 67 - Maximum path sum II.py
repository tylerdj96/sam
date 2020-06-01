# By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.
#
# 3
# 7 4
# 2 4 6
# 8 5 9 3
#
# That is, 3 + 7 + 4 + 9 = 23.
#
# Find the maximum total from top to bottom in triangle.txt (right click and 'Save Link/Target As...'), a 15K text file containing a triangle with one-hundred rows.
#
# NOTE: This is a much more difficult version of Problem 18. It is not possible to try every route to solve this problem, as there are 299 altogether! If you could check one trillion (1012) routes every second it would take over twenty billion years to check them all. There is an efficient algorithm to solve it. ;o)

import time

def ingest_pyramid(filelocation):
    file = open(filelocation).read()
    array_of_rows = file.split('\n')
    array_of_rows = list(map(lambda x: list(x.split()), array_of_rows))
    array_of_ints = list(map(lambda x: list(map(lambda y: int(y), x)), array_of_rows))
    ##dont wanna deal with weird for loop indexing, so just reverse it
    return array_of_ints[::-1]


start_time = time.time()


ready_pyramid = ingest_pyramid("C:/Users/r633478/Project_Euler/Project_Euler/Provided Files/problem67_100linetrianglesum.txt")

for x in range(0, len(ready_pyramid)):
    for y in range(0, len(ready_pyramid[x])-1):
        if(ready_pyramid[x][y] >= ready_pyramid[x][y+1]):
            ready_pyramid[x+1][y] += ready_pyramid[x][y]
        else:
            ready_pyramid[x+1][y] += ready_pyramid[x][y+1]

print("Answer is: ", ready_pyramid[-1][0])
print("RUN TIME: ", time.time() - start_time)