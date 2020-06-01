import math

ps = [0]*1000;

for x in range(1,1000):
    for y in range(x,1000):
        current_c = math.sqrt((x**2)+(y**2))
        if(current_c.is_integer()):
            p = int(current_c) + x + y
            if(p<=1000):
                ps[p-1] = ps[p-1] + 1



print("Solution max is: ", ps.index(max(ps)))