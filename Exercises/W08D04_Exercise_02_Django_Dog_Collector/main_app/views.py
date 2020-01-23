
#!                                                                        ,,    ,,                            
#!                                             mm                       `7MM  `7MM                            
#!                                             MM                         MM    MM                            
#!             ,p6"bo   ,pW"Wq.  `7MMpMMMb.  mmMMmm  `7Mb,od8  ,pW"Wq.    MM    MM   .gP"Ya  `7Mb,od8 ,pP"Ybd 
#!            6M'  OO  6W'   `Wb   MM    MM    MM      MM' "' 6W'   `Wb   MM    MM  ,M'   Yb   MM' "' 8I   `" 
#!            8M       8M     M8   MM    MM    MM      MM     8M     M8   MM    MM  8M""""""   MM     `YMMMa. 
#!            YM.    , YA.   ,A9   MM    MM    MM      MM     YA.   ,A9   MM    MM  YM.    ,   MM     L.   I8 
#!             YMbmd'   `Ybmd9'  .JMML  JMML.  `Mbmo .JMML.    `Ybmd9'  .JMML..JMML. `Mbmmd' .JMML.   M9mmmP'

from django.shortcuts import render,redirect                                              #! 1- Import render   13- Import redirect
from django.http import HttpResponse                                                      #! 2- Import the HttpResponse function. HttpResponse is the simplest way to send something back in response to a request
from .models import Dog, Toy, Photo                                                       #! 5- Import Dog model     #! 16- Import Photo (amazon s3)
from django.views.generic.edit import CreateView, UpdateView, DeleteView                  #! 8- Import Generic Views
from .forms import FeedingForm                                                            #! 12- Import forms
import uuid                                                                               #! 17- Import uuid (amazon s3)
import boto3                                                                              #! 18- Import boto3 (amazon s3)
from django.views.generic import ListView, DetailView                                     #! 21- Import ListView DetailView
from django.contrib.auth import login                                                     #! 23 - import login
from django.contrib.auth.forms import UserCreationForm                                    #! 24 - import UserCreationForm
from django.contrib.auth.decorators import login_required                                 #! 25 - import login_required decorators from auth (decorators extend the functionality to our function)
from django.contrib.auth.mixins import LoginRequiredMixin                                 #! 26 - import LoginRequiredMixin from auth for class-based views

#+ 19- Endpoint for the region
S3_BASE_URL = 'https://s3.amazonaws.com/'
BUCKET = 'catcollector-2'

#+ 3- Home view
def home(request):
   return HttpResponse('<h1>Home of Dog Collector</h1>')

#+ 4- About view
def about(request):
   return render(request, 'about.html')

#+ 6- Dogs views
@login_required                                                                              #+ 25.1 Extends the functionality of login_required
def dogs_index(request):
   dogs = Dog.objects.filter(user=request.user)                                              #+ Get only the dogs of this especific user
   return render(request, 'dogs/index.html', { 'dogs': dogs })

#+ 7- Details views
@login_required                                                                              #+ 25.2 Extends the functionality of login_required
def dogs_detail(request, dog_id):
   dog = Dog.objects.get(id=dog_id)
   toys_dog_doesnt_have = Toy.objects.exclude(id__in = dog.toys.all().values_list('id'))     #+ 14- Get all the toys from this dog
   feeding_form = FeedingForm()                                                              #+ 12.1 Instantiate FeedingForm to be rendered in the template
   return render(request, 'dogs/detail.html', { 
      'dog': dog,
      'feeding_form': feeding_form,
      'toys': toys_dog_doesnt_have
   })

#+ 9- Class Based View - Create Dog
class DogCreate(LoginRequiredMixin,CreateView):                                              #+ 26.1- LoginRequired for class-based views
   model = Dog
   fields = ['name', 'breed', 'description', 'age']
   success_url = '/dogs/'

   def form_valid(self, form):                                                            #! 22 Create a function to validade the form. When the user creates a new cat, this cat will be associated with his user id
      form.instance.user = self.request.user                                                 #+ Assign the logged in user (self.request.user)
      return super().form_valid(form)                                                        #+ Let the CreateView do its job as usual  

#+ 10 - Class Based View - Update Dog
class DogUpdate(LoginRequiredMixin, UpdateView):                                             #+ 26.2- LoginRequired for class-based views
   model = Dog
   # fields = '__all__'
   fields = ['name', 'breed', 'description', 'age']

#+ 11 - Class Based View - Delete Dog
class DogDelete(LoginRequiredMixin, DeleteView):                                             #+ 26.3- LoginRequired for class-based views
   model = Dog
   success_url = '/dogs/'

#+ 13.1- Add a new feeding
@login_required                                                                              #+ 25.3 Extends the functionality of login_required
def add_feeding(request, dog_id):
   form = FeedingForm(request.POST)
   if form.is_valid():
      new_feeding = form.save(commit=False)
      new_feeding.dog_id = dog_id
      new_feeding.save()
   return redirect('detail', dog_id=dog_id)

#+ 15 - Associate the dog with the toy
def assoc_toy(request, dog_id, toy_id):
   Dog.objects.get(id=dog_id).toys.add(toy_id)                                               #+ Note that you can pass a toy's id instead of the whole object
   return redirect('detail', dog_id=dog_id)

#+ 20- Add Photo
@login_required                                                                              #+ 25.4 Extends the functionality of login_required
def add_photo(request, dog_id):
   photo_file = request.FILES.get('photo-file', None)                                        #+ photo-file will be the "name" attribute on the <input type="file">
   if photo_file:                                                                            #+ Check if you have a file
      s3 = boto3.client('s3')                                                                   #- Instantiate boto3
      key = uuid.uuid4().hex[:6] + \
         photo_file.name[photo_file.name.rfind('.'):]                                           #- Need a unique "key" for s3 / needs image file extension too
      try:                                                                                   #+ just in case something goes wrong
         s3.upload_fileobj(photo_file, BUCKET, key)                                             #- upload_fileobj() is a method from boto3 (file, bucket, uniuqe key)
         url = f"{S3_BASE_URL}{BUCKET}/{key}"                                                   #- build the full url string
         photo = Photo(url=url, dog_id=dog_id)                                                  #- We can assign to dog_id or dog (if you have a dog object)
         photo.save()
      except err:
         print(err)
         print('An error occurred uploading file to S3')
   return redirect('detail', dog_id=dog_id)

@login_required                                                                              #+ 25.5 Extends the functionality of login_required
def assoc_toy(request, dog_id, toy_id):
  Dog.objects.get(id=dog_id).toys.add(toy_id)
  return redirect('detail', dog_id=dog_id)

@login_required                                                                              #+ 25.6 Extends the functionality of login_required
def unassoc_toy(request, dog_id, toy_id):
  Dog.objects.get(id=dog_id).toys.remove(toy_id)
  return redirect('detail', dog_id=dog_id)

#+ 21.1 Class Base View - Toy List
class ToyList(LoginRequiredMixin, ListView):                                                 #+ 26.4- LoginRequired for class-based views
  model = Toy

#+ 21.2 Class Base View - Toy Detail
class ToyDetail(LoginRequiredMixin, DetailView):                                             #+ 26.5- LoginRequired for class-based views
  model = Toy

#+ 21.3 Class Base View - Toy Create
class ToyCreate(LoginRequiredMixin, CreateView):                                             #+ 26.6- LoginRequired for class-based views
  model = Toy
  fields = '__all__'

#+ 21.4 Class Base View - Toy Update
class ToyUpdate(LoginRequiredMixin, UpdateView):                                             #+ 26.7- LoginRequired for class-based views
  model = Toy
  fields = ['name', 'color']

#+ 21.5 Class Base View - Toy Delete
class ToyDelete(LoginRequiredMixin, DeleteView):                                             #+ 26.8- LoginRequired for class-based views
  model = Toy
  success_url = '/toys/'

#+ 23.1 Signup function
def signup(request):
   error_message = ''                                                                        #+ At frist the msg is empty
   if request.method == 'POST':                                                                 #- If it's a POST request
                                                                                                   #- This is how to create a 'user' form object
                                                                                                   #- that includes the data from the browser
      form = UserCreationForm(request.POST)                                                     #- Create an instance of the form
      if form.is_valid():                                                                       #- Check if the form is valid (all the fields)
         user = form.save()                                                                        #? This will add the user to the database
         login(request, user)                                                                      #? This is how we log a user in via code
         return redirect('index')                                                                  #? Redirect to index page
      else:                                                                                     #- If the form is not valid
         error_message = 'Invalid sign up - try again'                                             #? A bad POST or a GET request, so render signup.html with an empty form
   form = UserCreationForm()                                                                 #+ If the form is not valid the code will continue and create a new form
   context = {'form': form, 'error_message': error_message}                                  #+ Then it will create a new object 'context' with the form and the error message
   return render(request, 'registration/signup.html', context)                               #+ Then it will render the page again with the context information