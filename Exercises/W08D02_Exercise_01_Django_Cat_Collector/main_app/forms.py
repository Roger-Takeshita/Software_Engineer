from django.forms import ModelForm     #! 1- Import django forms
from .models import Feeding            #! 2- Import models

class FeedingForm(ModelForm):          #+ Create a parent class, inherits from the super class
   class Meta:                         #- Redefine Meta Class (ModelForm has a nested class Meta: to define the model and the fields we want inputs generated for.)
      model = Feeding
      fields = ['date', 'meal']