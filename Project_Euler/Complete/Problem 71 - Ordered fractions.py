# Consider the fraction, n/d, where n and d are positive integers. If n<d and HCF(n,d)=1, it is called a reduced proper fraction.
#
# If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:
#
# 1/8, 1/7, 1/6, 1/5, 1/4, 2/7, 1/3, 3/8, 2/5, 3/7, 1/2, 4/7, 3/5, 5/8, 2/3, 5/7, 3/4, 4/5, 5/6, 6/7, 7/8
#
# It can be seen that 2/5 is the fraction immediately to the left of 3/7.
#
# By listing the set of reduced proper fractions for d ≤ 1,000,000 in ascending order of size, find the numerator of the fraction immediately to the left of 3/7.
import time

def trial_division(n):
	"""Return a list of the factors for a natural number."""
	a = []               #Prepare an empty list.
	f = 2                #The first possible factor.
	while f <= n:         #While n still has remaining factors...
		if (n % f == 0):     #The remainder of n divided by f might be zero.
			a.append(f)         #If so, it divides n. Add f to the list.
			f += 1              #Divide that factor out of n.n += n
		else:                #But if f is not a factor of n,
			f += 1              #Add one to f and try again.
	return a

def find_largest_common_factor(x, y):
	xs = trial_division(x)
	ys = trial_division(y)

	common_factors = list(set(xs) & set(ys))
	common_factors.sort()

	if(len(common_factors) > 0):
		return common_factors[-1]
	else:
		return 1

def sort_by_fraction_size(xs):
	return (xs[0]/xs[1])

def Euclidean(one, two):
	if (one > two):
		three = one % two
		while (three != 0):

			one = two
			two = three

			three = one % two
		return two


start_time = time.time()

current_max = (0, 1)

# for x in range(1, 1000000):
# 	for y in range(1000000, 1, -1):
# 		if(x/y < 3/7):
# 			lcf = Euclidean(y, x)
# 			if((x/lcf)/(y/lcf) > (current_max[0]/current_max[1])):
# 				current_max =((x/lcf),(y/lcf))
# 				print(current_max)
#
# for x in range(200000, 300000):
# 	for y in range(500000, 700000):
# 		tracker = 3/7 - (x/y)
# 		if(tracker <= 1/1000000 and tracker > 0):
# 			print(current_max)
# 			current_max =(x,y)

for i in range (1, 1000001):
	if(i%7==0):
		denom = i

numerator = denom/7 *3

print(denom)
print("Answer is ", numerator -1)

print("--- %s seconds ---" % (time.time() - start_time))
