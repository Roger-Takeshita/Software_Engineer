# Branching & Looping Exercises


# Write the if...elif...else statement as described in the lesson

while True:
   color = input('Enter "green", "yellow", "red": ').lower()
   if color == "quit":
      print('bye!')
      break;
   print(f'The user entered {color}')
   if color == "green":
      print("go")
   elif color == "yellow":
      print("wait")
   elif color == "red":
      print("stop")
   else:
      print("Enter a valid color")