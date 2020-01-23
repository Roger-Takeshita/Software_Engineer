from django.db import models                                   #! 1- Import models form Django
from django.urls import reverse                                #! 2- Import reverse
from datetime import date
from django.contrib.auth.models import User                    #! 5- Import User from auth models
MEALS = (
   ('B', 'Breakfast'),
   ('L', 'Lunch'),
   ('D', 'Dinner')
)

class Toy(models.Model):                                          #+ 1.1- Create Toy Schema
   name = models.CharField(max_length=50)
   color = models.CharField(max_length=20)

   def __str__(self):
      return self.name

   def get_absolute_url(self):
      return reverse('toys_detail', kwargs={'pk': self.id})

class Dog(models.Model):                                          #+ 1.2- Create Dog Schema
   name = models.CharField(max_length=100)
   breed = models.CharField(max_length=100)
   description = models.TextField(max_length=250)
   age = models.IntegerField()
   toys = models.ManyToManyField(Toy)                          #! 4- Add many to many relationship
   user = models.ForeignKey(User, on_delete=models.CASCADE)       #+ 5.1- Add use ForeignKey - models.CASCADE is required. It ensures that if a record is deleted, all of the child Feeding will be deleted automatically as well

   def __str__(self):
      return self.name
   
   def get_absolute_url(self):                                    #+ 2.1- The `reverse` function is using the URL pattern `detail` and providing `self.id` to use as the `dog_id` route parameter
      return reverse('detail', kwargs={'dog_id': self.id})

   def fed_for_today(self):
      return self.feeding_set.filter(date=date.today()).count() >= len(MEALS)

class Feeding(models.Model):                                      #+ 1.3- Create Feeding Schema
   date = models.DateField('feeding date')
   meal = models.CharField(
      max_length=1,
      choices=MEALS,
      default=MEALS[0][0]
   )
   dog = models.ForeignKey(Dog, on_delete=models.CASCADE)            #- models.CASCADE is required. It ensures that if a record is deleted, all of the child Feeding will be deleted automatically as well

   def __str__(self):
      return f"{self.get_meal_display()} on {self.date}"             #- Because meal is a CharField with options, method Django creates to access the human-friendly value of a Field.choice like we have on meal.
      
   class Meta:
      ordering = ['-date']

class Photo(models.Model):                                        #+ 1.4- Create Photo Schema
   url = models.CharField(max_length=200)
   dog = models.ForeignKey(Dog, on_delete=models.CASCADE)

   def __str__(self):
      return f"Photo for dog_id: {self.dog_id} @{self.url}"