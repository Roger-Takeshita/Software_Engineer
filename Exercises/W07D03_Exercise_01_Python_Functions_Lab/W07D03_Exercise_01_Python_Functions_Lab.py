print("---------------Exercise 1---------------")
def sum_to (num):
   result = 0
   while (num > 0):
      result += num
      num -= 1
   return result

print(sum_to(6))
print(sum_to(10))
print()

print("---------------Exercise 2---------------")
def largest(array):
   who_is_it = 0;
   for value in array:
      if value > who_is_it:
         who_is_it = value
   return who_is_it

print(largest([1, 2, 3, 4, 0]))
print(largest([10, 4, 2, 231, 91, 54]))
print()

print("---------------Exercise 3---------------")
def occurances (string_1, string_2):
   return string_1.count(string_2)

print(occurances('fleep floop', 'e'))
print(occurances('fleep floop', 'p'))
print(occurances('fleep floop', 'ee'))
print(occurances('fleep floop', 'fe'))
print()

print("---------------Exercise 4---------------")
def product(*args):
   result = 1;
   for numb in args:
      result *= numb
   return result

print(product(-1, 4))
print(product(2, 5, 5))
print(product(4, 0.5, 5))