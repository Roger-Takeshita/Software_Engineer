from django.db import models
from django.urls import reverse
from datetime import date

MEALS = (
   ('B', 'Breakfast'),
   ('L', 'Lunch'),
   ('D', 'Dinner')
)

class Toy(models.Model):
   name = models.CharField(max_length=50)
   color = models.CharField(max_length=20)

   def __str__(self):
      return self.name

   def get_absolute_url(self):
      return reverse('toys_detail', kwargs={'pk': self.id})
  
class Cat(models.Model):
   name = models.CharField(max_length=100)
   breed = models.CharField(max_length=100)
   description = models.TextField(max_length=250)
   age = models.IntegerField()
   toys = models.ManyToManyField(Toy)                       #+ Many to Many relationship

   def __str__(self):
      return self.name

   def get_absolute_url(self):
      return reverse('detail', kwargs={'cat_id': self.id})

class Feeding(models.Model):
   date = models.DateField('feeding date')
   meal = models.CharField(
      max_length=1,                 #+ Max Lenght
      choices=MEALS,                #+ Choices from our tuple
      default=MEALS[0][0]           #+ Default value
   )
   
   cat = models.ForeignKey(Cat, on_delete=models.CASCADE)   #+ models.CASCADE is required. It ensures that if a record is deleted,
                                                               #+ all of the child Feeding will be deleted automatically as well

   def __str__(self):
      return f"{self.get_meal_display()} on {self.date}"    #+ 'get_meal_display()' method Django creates to access the human-friendly value of 
                                                               #+ a Field.choice like we have on 'meal'.
   class Meta:
      ordering = ['-date']