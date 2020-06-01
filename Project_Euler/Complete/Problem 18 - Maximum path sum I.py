# By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.
#
# 3
# 7 4
# 2 4 6
# 8 5 9 3
#
# That is, 3 + 7 + 4 + 9 = 23.
#
# Find the maximum total from top to bottom of the triangle below:
#
# 75
# 95 64
# 17 47 82
# 18 35 87 10
# 20 04 82 47 65
# 19 01 23 75 03 34
# 88 02 77 73 07 63 67
# 99 65 04 28 06 16 70 92
# 41 41 26 56 83 40 80 70 33
# 41 48 72 33 47 32 37 16 94 29
# 53 71 44 65 25 43 91 52 97 51 14
# 70 11 33 28 77 73 17 78 39 68 17 57
# 91 71 52 38 17 14 91 43 58 50 27 29 48
# 63 66 04 68 89 53 67 30 73 16 69 87 40 31
# 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23
#
# NOTE: As there are only 16384 routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method! ;o)
import time

def ingest_pyramid(n):
    array_of_rows = n.split('\n')
    array_of_rows = list(map(lambda x: list(x.split()), array_of_rows))
    array_of_ints = list(map(lambda x: list(map(lambda y: int(y), x)), array_of_rows))
    ##dont wanna deal with weird for loop indexing, so just reverse it
    return array_of_ints[::-1]

pyramid = """75
95 64
17 47 82
18 35 87 10
20 04 82 47 65
19 01 23 75 03 34
88 02 77 73 07 63 67
99 65 04 28 06 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23"""

test = """3
7 4
2 4 6
8 5 9 3"""

start_time = time.time()

ready_pyramid = ingest_pyramid(pyramid)

for x in range(0, len(ready_pyramid)):
    for y in range(0, len(ready_pyramid[x])-1):
        if(ready_pyramid[x][y] >= ready_pyramid[x][y+1]):
            ready_pyramid[x+1][y] += ready_pyramid[x][y]
        else:
            ready_pyramid[x+1][y] += ready_pyramid[x][y+1]

print("Answer is: ", ready_pyramid[-1][0])
print("RUN TIME: ", time.time() - start_time)
