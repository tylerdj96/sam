# A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
#
# Find the largest palindrome made from the product of two 3-digit numbers.

def is_palindrome(x):
    xs = str(x)
    for i in range(0, len(xs)):
        if(xs[i] != xs [-i-1]):
            return False
    return True


largest_num = 0

for i in range(100, 1000):
    for j in range(100, 1000):
        if(is_palindrome(i*j) and i*j>largest_num):
            largest_num = i*j

print(largest_num)