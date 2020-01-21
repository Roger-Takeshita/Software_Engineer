from django.contrib import admin
from .models import Dog                   #! 1- Import the dog model

#!+ 1.1 - Register your models here
admin.site.register(Dog)