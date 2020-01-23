from django.contrib import admin
from .models import Dog, Feeding, Toy              #! 1- Import the dog model
                                                   #! 2- Import the feeding model

#+ 1.1 - Register your models here
admin.site.register(Dog)
admin.site.register(Feeding)
admin.site.register(Toy)