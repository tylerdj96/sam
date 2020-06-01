# A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
#
# a2 + b2 = c2
# For example, 32 + 42 = 9 + 16 = 25 = 52.
#
# There exists exactly one Pythagorean triplet for which a + b + c = 1000.
# Find the product abc.

import math

for x in range(1,1000):
    for y in range(x,1000):
        current_c = math.sqrt((x**2)+(y**2))
        if(current_c.is_integer()):
            p = int(current_c) + x + y
            if(p == 1000):
                answer = x*y*current_c
print(answer)