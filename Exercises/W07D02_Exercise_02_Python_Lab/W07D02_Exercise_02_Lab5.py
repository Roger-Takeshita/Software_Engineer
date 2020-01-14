# exercise-05 Fibonacci sequence for first 50 terms

# Write the code that:
# 1. Calculates and prints the first 50 terms of the fibonacci sequence.
# 2. Print each term and number as follows:
#      term: 0 / number: 0
#      term: 1 / number: 1
#      term: 2 / number: 1
#      term: 3 / number: 2
#      term: 4 / number: 3
#      term: 5 / number: 5
#      etc.

# Hint: The next number is found by adding the two numbers before it

number_list = []
input_number = input("Enter a number to calculate the fibonacci sequence: ")
for number in range(int(input_number)):
   if number == 0:
      number_list.append(number);
   elif number == 1:
      number_list.append(number);
   else:
      number_list.append(number_list[number-1]+number_list[number-2])
print(number_list)
print(number_list[-1])