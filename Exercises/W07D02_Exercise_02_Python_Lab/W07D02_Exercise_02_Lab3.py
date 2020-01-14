# exercise-03 Calculate Dog Years

# Write the code that:
# 1. Prompts the user to enter a dog's age in human years like this:
#      Input a dog's age in human years: 
# 2. Calculates the equivalent dog years, where:
#      - The first two years count as 10 years each
#      - Any remaining years count as 7 years each
# 3. Prints the answer in the following format:
#      The dog's age in dog years is xx

# Hint:  Use the int() function to convert the string returned from input() into an integer

while True:
   input_dogs_age = int(input("Input a dog's age in human years: "))
   if type(input_dogs_age) is int:
      if input_dogs_age > 0 and input_dogs_age <= 30:
         if input_dogs_age <= 2:
            print(f"he dog's age in dog years is {input_dogs_age*5}")
         else:
            print(f"he dog's age in dog years is {input_dogs_age*7}")