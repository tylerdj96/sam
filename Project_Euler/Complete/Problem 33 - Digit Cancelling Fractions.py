# The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.
#
# We shall consider fractions like, 30/50 = 3/5, to be trivial examples.
#
# There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.
#
# If the product of these four fractions is given in its lowest common terms, find the value of the denominator.

# In order to solve this problem, we must identify all fractions a/b such that a and b => 10 and < = 99 and that a < b.
# We must try to identify if there is a way we can "improperly" reduce the fraction as listed above. If such a way exists,
# then we must try to reduce the fraction properly using the largest common factor. If the fraction reduces with a largest common factor,
# then the improper reduction must also reduce to that same fraction with it's largest common factor

import math

fractions = []

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


def trim_digits(x, y):

	x = list(str(x))
	y = list(str(y))
	comparator = list(set(x) & set(y))

	if (len(comparator) > 0 and comparator[0] != '0'):
		x.remove(comparator[0])
		y.remove(comparator[0])

	x = ''.join(str(elem) for elem in x)
	y = ''.join(str(elem) for elem in y)
	print(x, y)

	x_prime = int(x)
	y_prime = int(y)

	if(x_prime!=0 and y_prime!= 0):
		return(x_prime, y_prime)
	else:
		return(1 ,1)

def find_largest_common_factor(x, y):
	xs = trial_division(x)
	ys = trial_division(y)

	common_factors = list(set(xs) & set(ys))
	common_factors.sort()
	print(common_factors)

	if(len(common_factors) > 0):
		return common_factors[-1]
	else:
		return 1

print(10/11)
for x in range (10,100):
	for y in range (11,100):
		if(x/y < 1):
			(xp, yp)=trim_digits(x, y)
			if(xp != 0 and yp != 0 and xp != x and yp != y):
				reduced_bad = xp/yp
				lcf = find_largest_common_factor(x, y)
				if(lcf != 1):
					if(reduced_bad ==((x/lcf)/(y/lcf))):
						fractions.append((x,y))


print(fractions)
numerator = 1
denominator = 1
for frac in fractions:
	numerator *= frac[0]
	denominator *= frac[1]

print("final fraction: ", numerator, denominator)
lcf_final = find_largest_common_factor(numerator, denominator)
print("Answer: ", denominator/lcf_final)

