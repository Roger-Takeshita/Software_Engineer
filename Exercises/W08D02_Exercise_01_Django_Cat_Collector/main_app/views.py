
#!                                                                        ,,    ,,                            
#!                                             mm                       `7MM  `7MM                            
#!                                             MM                         MM    MM                            
#!             ,p6"bo   ,pW"Wq.  `7MMpMMMb.  mmMMmm  `7Mb,od8  ,pW"Wq.    MM    MM   .gP"Ya  `7Mb,od8 ,pP"Ybd 
#!            6M'  OO  6W'   `Wb   MM    MM    MM      MM' "' 6W'   `Wb   MM    MM  ,M'   Yb   MM' "' 8I   `" 
#!            8M       8M     M8   MM    MM    MM      MM     8M     M8   MM    MM  8M""""""   MM     `YMMMa. 
#!            YM.    , YA.   ,A9   MM    MM    MM      MM     YA.   ,A9   MM    MM  YM.    ,   MM     L.   I8 
#!             YMbmd'   `Ybmd9'  .JMML  JMML.  `Mbmo .JMML.    `Ybmd9'  .JMML..JMML. `Mbmmd' .JMML.   M9mmmP'

from django.shortcuts import render
from django.http import HttpResponse
from .models import Cat                            #! Import the model
from django.views.generic.edit import CreateView, UpdateView, DeleteView   #! 6 Import Generic Views 8- Import Update and Delete view

#! 1- Defining the home view
def home(request):
   return HttpResponse('<h1>Hello /ᐠ｡‸｡ᐟ\ﾉ</h1>')

#! 2- Defining the about view
def about(request):
   # return HttpResponse('<h1>About the CatCollector</h1>')
   return render(request, 'about.html')                     #+ Render out about.html

#! 3- Defining the cat index view
def cats_index(request):
   return render(request, 'cats/index.html', { 'cats': cats })

#! 4- Get the cats from our database
def cats_index(request):
   cats = Cat.objects.all()
   return render(request, 'cats/index.html', { 'cats': cats })

#! 5- Get cat details
def cats_detail(request, cat_id):
   cat = Cat.objects.get(id=cat_id)
   return render(request, 'cats/detail.html', { 'cat': cat })

#! 7- Class based views - Create cat form
class CatCreate(CreateView):
   model = Cat                                              #+ 7.1- Need to tell which model I want to use. We are overriding Cat model 
   fields = ['name', 'breed', 'description', 'age']         #+ 7.2- We need to specify the fields

#! 9- Class based views - Update a cat
class CatUpdate(UpdateView):
   model = Cat
   fields = ['breed', 'description', 'age']                 #+ 9.1- We cannot rename a cat

#! 10- Class base views -  Delete a cat
class CatDelete(DeleteView):
   model = Cat
   success_url = '/cats/'