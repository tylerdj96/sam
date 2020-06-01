import math

nums = list(range(10)) ##declare an array to hold integers 0-9


## permutations are helpful here
## We know that there are 10! total ways to arrange all of these numbers
## Given a starting digit, there are 9! ways to arrange the remaining numbers with that number at the start
## Lexiographic implies order, so if we want the millionth element, we can identify that
## 9! = 362880, and 362880 * 3 > 1,000,000 (1,088,640) , so we know that the millionth element begins with 2, and is the 274240 element in the set of
## permutations that begin with 2.

## 10! = 3628800
## 9! = 362880
## 8! = 40320
## 7! = 5040
## 6! = 720
## 5! = 120
## 4! = 24
## 3! = 6
## 2! = 2
## 1 = 1


## Let's rearrange the order of the list to have 2 at the beginning. 725761st permutation
nums = [2,0,1,3,4,5,6,7,8,9]

##274240-241920 =
nums = [2,0,