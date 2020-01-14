# exercise-04 What kind of Triangle?

# Write the code that:
# 1. Prompts the user to enter the three lengths of a triangle (one at a time):
#      Enter the lengths of three side of a triangle:
#      a: 
#      b:
#      c:
# 2. Write the code that determines if the triangle is:
#      equalateral - all three sides are equal in length
#      scalene - all three sides are unequal in length
#      isosceles - two sides are the same length
# 3. Print a message such as:
#      - A triangle with sides of <a>, <b> & <c> is a <type of triangle> triangle

whil1e True:
   print("Enter the lenghts of three side of a triangle:")
   input_a = int(input('a: '))
   if input_a == 0:
      break
   input_b = int(input('b: '))
   if input_b == 0:
      break
   input_c = int(input('c: '))
   if input_c == 0:
      break

   if input_a == input_b == input_c :
      triangle = "equaleteral"
   elif input_a == input_b or input_a == input_c or input_b == input_c:
      triangle = "isosceles"
   else:
      triangle = "scalene"
      
   print(f"A triangle with sides of {input_a}, {input_b} & {input_c} is a {triangle} triangle")