# exercise-06 What's the  Season?

# Write the code that:
# 1. Prompts the user to enter the month (as three characters):
#      Enter the month of the season (Jan - Dec):
# 2. Then propts the user to enter the day of the month: 
#      Enter the day of the month:
# 3. Calculate what season it is based upon this chart:
#      Dec 21 - Mar 19: Winter
#      Mar 20 - Jun 20: Spring
#      Jun 21 - Sep 21: Summer
#      Sep 22 - Dec 20: Fall
# 4. Print the result as follows:
#      <Mmm> <dd> is in <season> 

# Hints:
   # Consider using the in operator to check if a string is in a particular list/tuple like this:
   # if input_month in ('Jan', 'Feb', 'Mar'):
   #
   # After setting the likely season, you can use another if...elif...else statement to "adjust" if
   # the day number falls within a certain range.

months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dec']
         #  0      1      2      3      4      5      6      7      8      9     10     11
input_month = months.index(input("Enter the month of the season (Jan - Dec): ").lower())
input_day = int(input("Enter the day of the month: "))

month_number = months.index(input_month.lower())

if (month_number <= 1):
   season = "Winter"
elif (month_number == 2):
   if input_day <= 19:
      season = "Winter"
   else:
      season = "Spring"
elif (month_number <= 4):
   season = "Summer"
elif (month_number == 5):
   if (input_day <= 20):
      season = "Summer"
   else:
      season = "Fall"
elif (month_number <= 10):
   season = "Fall"
else:
   if (input_day <= 20):
      season = "Fall"
   else:
      season = "Winter"

print(f"{input_month} {input_day} is in {season}")