from django.db import models                          #! Import models form Django
from django.urls import reverse                       #! 2- Import reverse
from datetime import date

MEALS = (
   ('B', 'Breakfast'),
   ('L', 'Lunch'),
   ('D', 'Dinner')
)

#+ 3- Create Toy Schema
class Toy(models.Model):
   name = models.CharField(max_length=50)
   color = models.CharField(max_length=20)

   def __str__(self):
      return self.name

   def get_absolute_url(self):
      return reverse('toys_detail', kwargs={'pk': self.id})

#+ Create Dog Schema
class Dog(models.Model):
   name = models.CharField(max_length=100)
   breed = models.CharField(max_length=100)
   description = models.TextField(max_length=250)
   age = models.IntegerField()
   toys = models.ManyToManyField(Toy)                 #+ 4- Add many to many relationship

   def __str__(self):
      return self.name
   
   def get_absolute_url(self):                        #+ 2.1- The `reverse` function is using the URL pattern `detail` and providing `self.id` to use as the `dog_id` route parameter
      return reverse('detail', kwargs={'dog_id': self.id})

   def fed_for_today(self):
      return self.feeding_set.filter(date=date.today()).count() >= len(MEALS)

#+ Create Feeding Schema
class Feeding(models.Model):
   date = models.DateField('feeding date')
   meal = models.CharField(
      max_length=1,
      choices=MEALS,
      default=MEALS[0][0]
   )

   dog = models.ForeignKey(Dog, on_delete=models.CASCADE)   #+ models.CASCADE is required. It ensures that if a record is deleted,
                                                               #+ all of the child Feeding will be deleted automatically as well

   def __str__(self):
      return f"{self.get_meal_display()} on {self.date}"    #+ Because meal is a CharField with options, method Django creates to 
                                                               #+ access the human-friendly value of a Field.choice like we have on meal.
   class Meta:
      ordering = ['-date']

#+ Create Photo Schema
class Photo(models.Model):
   url = models.CharField(max_length=200)
   dog = models.ForeignKey(Dog, on_delete=models.CASCADE)

   def __str__(self):
      return f"Photo for cat_id: {self.dog_id} @{self.url}"