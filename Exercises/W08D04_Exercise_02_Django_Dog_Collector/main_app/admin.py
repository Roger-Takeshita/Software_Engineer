from django.contrib import admin
from .models import Dog, Feeding, Toy, Photo       #! 1- Import the dog model
                                                   #! 2- Import the feeding model
                                                   #! 3- Import the toy model
                                                   #! 4- Import the photo model

#+ 1.1 - Register your models here
admin.site.register(Dog)
admin.site.register(Feeding)
admin.site.register(Toy)
admin.site.register(Photo)