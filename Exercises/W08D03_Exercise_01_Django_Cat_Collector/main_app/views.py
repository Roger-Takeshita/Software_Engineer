
#!                                                                        ,,    ,,                            
#!                                             mm                       `7MM  `7MM                            
#!                                             MM                         MM    MM                            
#!             ,p6"bo   ,pW"Wq.  `7MMpMMMb.  mmMMmm  `7Mb,od8  ,pW"Wq.    MM    MM   .gP"Ya  `7Mb,od8 ,pP"Ybd 
#!            6M'  OO  6W'   `Wb   MM    MM    MM      MM' "' 6W'   `Wb   MM    MM  ,M'   Yb   MM' "' 8I   `" 
#!            8M       8M     M8   MM    MM    MM      MM     8M     M8   MM    MM  8M""""""   MM     `YMMMa. 
#!            YM.    , YA.   ,A9   MM    MM    MM      MM     YA.   ,A9   MM    MM  YM.    ,   MM     L.   I8 
#!             YMbmd'   `Ybmd9'  .JMML  JMML.  `Mbmo .JMML.    `Ybmd9'  .JMML..JMML. `Mbmmd' .JMML.   M9mmmP'

from django.shortcuts import render, redirect                              #! 12 Import redirect
from django.http import HttpResponse
from .models import Cat, Toy                                               #! 1  Import the model
from django.views.generic.edit import CreateView, UpdateView, DeleteView   #! 6  Import Generic Views 8- Import Update and Delete view
from .forms import FeedingForm                                             #! 11 Import FeedingForm

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
   toys_cat_doesnt_have = Toy.objects.exclude(id__in = cat.toys.all().values_list('id'))
   feeding_form = FeedingForm()                             #+ 11.1 Instanciate the form
   return render(request, 'cats/detail.html', {             #+ 11.2 send the form to render
     'cat': cat, 'feeding_form': feeding_form,
     'toys': toys_cat_doesnt_have
   })

def assoc_toy(request, cat_id, toy_id):
   # Note that you can pass a toy's id instead of the whole object
   Cat.objects.get(id=cat_id).toys.add(toy_id)
   return redirect('detail', cat_id=cat_id)

#! 7- Class based views - Create cat form
class CatCreate(CreateView):
   model = Cat                                              #+ 7.1- Need to tell which model I want to use. We are overriding Cat model 
   fields = ['name', 'breed', 'description', 'age']         #+ 7.2- We need to specify the fields

#! 9- Class based views - Update a cat
class CatUpdate(UpdateView):
   model = Cat
   fields = '__all__'                                       #+ 9.1- We cannot rename a cat

#! 10- Class base views -  Delete a cat
class CatDelete(DeleteView):
   model = Cat
   success_url = '/cats/'

#! 13 - Add Feeding to a Cat (by Id)
def add_feeding(request, cat_id):
   form = FeedingForm(request.POST)                         #+ 13.1 create the ModelForm using the data in request.POST
   if form.is_valid():                                      #+ 13.2 validate the form
      new_feeding = form.save(commit=False)                 #+ 13.3 don't save the form to the db until it has the cat_id assigned. commit=Flase (if it's savable)
                                                               #+ 13.3.1 After ensuring that the form contains valid data, we save the form with the commit=False option, 
                                                                  #+ which returns an in-memory model so that we can assign the cat_id before actually saving to the database.
      new_feeding.cat_id = cat_id
      new_feeding.save()
   return redirect('detail', cat_id=cat_id)                 #+ 13.4 Always be sure to redirect instead of render if data has been changed in the database.
