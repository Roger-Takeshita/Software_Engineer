print("--------------------- Exercise 1 -----------------------")
students_list = ["Roger Takeshita", "Thaisa Sakima", "Mike Cabecinha", "Joy", "Yumi Sakima"]

print(students_list[1])
print(students_list[-1])
print(" ")

print("--------------------- Exercise 2 -----------------------")
foods_tuple = ("banana", "apple", "orange", "grape", "kiwi")

for idx, student in enumerate(students_list):
   print(f"{student}: {foods_tuple[idx]} is a good food")
print(" ")

print("--------------------- Exercise 3 -----------------------")
for idx in range(len(foods_tuple)-2,len(foods_tuple)):
   print(foods_tuple[idx])
print(" ")

print("--------------------- Exercise 4 -----------------------")
home_town_dict = {
   "city": "Curitiba",
   "state": "Paraná",
   "population": "je ne sais pas"
}

print(f"I was born in {home_town_dict['city']}, {home_town_dict['state']} - {home_town_dict['population']} of population")
print(" ")

print("--------------------- Exercise 5 -----------------------")
for key in home_town_dict:
   print(f"{key} = {home_town_dict[key]}")
print(" ")

print("--------------------- Exercise 6 -----------------------")
cohort_list = []
cohort_list.append({
   "student": "Tina",
   "fav_food": "Cheeseburguer"
})
print(cohort_list)
print(" ")

print("--------------------- Exercise 7 -----------------------")
awesome_students_list = []
for idx in range(len(students_list)):
   awesome_students_list.append(f"{students_list[idx]} is awesome!")
   print(awesome_students_list[idx])
print(" ")

awesome_students_list_2 = [print(f"{student} is awesome") for student in students_list]
print(" ")

print("--------------------- Exercise 8 -----------------------")
for food in foods_tuple:
   if "a" in food:
      print(food)
print(" ")

fruit_a = [print(fruit) for fruit in foods_tuple if "a" in fruit]
print(" ")