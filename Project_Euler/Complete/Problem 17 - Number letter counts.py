# If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
#
# If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
#
#
# NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.

# strings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fifteen", "teen", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred"]

def split_num_into_digits_chars(x):
    return list(str(x))

def convert_chars_to_ints(mylist):
    return list(map(lambda x: int(x), mylist))
dict = {
    0: "",
    "0": "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    15: "fifteen",
    "1": "teen",
    "2": "twenty",
    "3": "thirty",
    "4": "forty",
    "5": "fifty",
    "6": "sixty",
    "7": "seventy",
    "8": "eighty",
    "9": "ninety",
    "_": "hundred"
}
print(dict[1])
print(dict['_'])

running_sum = 0

for x in range(1, 1000, 1):
    if(len(str(x))==1):
        running_sum += len(dict[x])
    elif(len(str(x))==2):
        if(x==10 or x==11 or x==12 or x==13 or x==15):
            running_sum += len(dict[x])
        else:
            digits = split_num_into_digits_chars(x)
            running_sum += len(dict[digits[0]]) + len(dict[int(digits[1])])
    elif(len(str(x))==3):
        digits = split_num_into_digits_chars(x)
        checker = int(digits[1] + digits[2])
        if(x%100==0):
            running_sum += len(dict[int(digits[0])]) + len(dict[digits[1]]) + len(dict[int(digits[2])]) + len(dict["_"])
        elif(checker==10 or checker==11 or checker==12 or checker==13 or checker==15):
            running_sum += len(dict[checker]) + len(dict["_"]) + 3 + len(dict[int(digits[0])])
        else:
            running_sum += len(dict[int(digits[0])]) + len(dict[digits[1]]) + len(dict[int(digits[2])]) + len(dict["_"]) + 3

## EIGHTEEN HAS ONE T, NOT TWO!!!!!! SUBRTRACT 10 AFTER THE HARD CODED THOUSAND ADDITION DUE TO TOO MANY T's
print(running_sum+11-10)


