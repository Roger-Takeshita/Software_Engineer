
#!                                                                        ,,    ,,                            
#!                                             mm                       `7MM  `7MM                            
#!                                             MM                         MM    MM                            
#!             ,p6"bo   ,pW"Wq.  `7MMpMMMb.  mmMMmm  `7Mb,od8  ,pW"Wq.    MM    MM   .gP"Ya  `7Mb,od8 ,pP"Ybd 
#!            6M'  OO  6W'   `Wb   MM    MM    MM      MM' "' 6W'   `Wb   MM    MM  ,M'   Yb   MM' "' 8I   `" 
#!            8M       8M     M8   MM    MM    MM      MM     8M     M8   MM    MM  8M""""""   MM     `YMMMa. 
#!            YM.    , YA.   ,A9   MM    MM    MM      MM     YA.   ,A9   MM    MM  YM.    ,   MM     L.   I8 
#!             YMbmd'   `Ybmd9'  .JMML  JMML.  `Mbmo .JMML.    `Ybmd9'  .JMML..JMML. `Mbmmd' .JMML.   M9mmmP'

from django.shortcuts import render,redirect       #! 1- Import render   13- Import redirect
from django.http import HttpResponse               #! 2- Import the HttpResponse function. HttpResponse is the simplest way to send something back in response to a request
from .models import Dog, Toy                       #! 5- Import Dog model
from django.views.generic.edit import CreateView, UpdateView, DeleteView   #! 8- Import Generic Views
from .forms import FeedingForm                     #! 12- Import forms

#+ 3- Home view
def home(request):
   return HttpResponse('<h1>Home of Dog Collector</h1>')

#+ 4- About view
def about(request):
   return render(request, 'about.html')

#+ 6- Dogs views
def dogs_index(request):
   dogs = Dog.objects.all()
   return render(request, 'dogs/index.html', { 'dogs': dogs })

#+ 7- Details views
def dogs_detail(request, dog_id):
   dog = Dog.objects.get(id=dog_id)
   toys_dog_doesnt_have = Toy.objects.exclude(id__in = dog.toys.all().values_list('id')) #+ 14- Get all the toys from this dog
   feeding_form = FeedingForm()           #+ 12.1 Instantiate FeedingForm to be rendered in the template
   return render(request, 'dogs/detail.html', { 
      'dog': dog,
      'feeding_form': feeding_form,
      'toys': toys_dog_doesnt_have
   })

#+ 9- Class Based View - Create Dog
class DogCreate(CreateView):
   model = Dog
   fields = ['name', 'breed', 'description', 'age']
   success_url = '/dogs/'

#+ 10 - Class Based View - Update Dog
class DogUpdate(UpdateView):
   model = Dog
   # fields = '__all__'
   fields = ['name', 'breed', 'description', 'age']

#+ 11 - Class Based View - Delete Dog
class DogDelete(DeleteView):
   model = Dog
   success_url = '/dogs/'

#+ 13.1- Add a new feeding
def add_feeding(request, dog_id):
   form = FeedingForm(request.POST)
   if form.is_valid():
      new_feeding = form.save(commit=False)
      new_feeding.dog_id = dog_id
      new_feeding.save()
   return redirect('detail', dog_id=dog_id)

#+ 15 - Associate the dog with the toy
def assoc_toy(request, dog_id, toy_id):
   Dog.objects.get(id=dog_id).toys.add(toy_id)  #+ Note that you can pass a toy's id instead of the whole object
   return redirect('detail', dog_id=dog_id)