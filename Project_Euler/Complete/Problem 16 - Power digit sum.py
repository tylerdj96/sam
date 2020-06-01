# 215 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
#
# What is the sum of the digits of the number 21000?

num = 2 ** 1000
digits  = []
num = str(num)

for x in num:
    integer = int(x)
    digits.append(integer)

print(sum(digits))