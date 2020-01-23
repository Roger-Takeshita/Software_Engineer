from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView, DetailView
import uuid
import boto3
from .models import Cat, Toy, Photo
from .forms import FeedingForm
from django.contrib.auth import login                                               #! 1 - import login
from django.contrib.auth.forms import UserCreationForm                              #! 2 - import UserCreationForm
from django.contrib.auth.decorators import login_required                           #! 5 - import login_required decorators from auth (decorators extend the functionality to our function)
from django.contrib.auth.mixins import LoginRequiredMixin                           #! 6 - import LoginRequiredMixin from auth for class-based views

S3_BASE_URL = 'https://s3-us-west-1.amazonaws.com/'
BUCKET = 'catcollector'

class CatCreate(LoginRequiredMixin, CreateView):                                      #+ 6.1 LoginRequired for class-based views
  model = Cat
  fields = ['name', 'breed', 'description', 'age']

  def form_valid(self, form):                                                         #+ 2.1 Create a function to validade the form. When the user creates a new cat, this cat will be associated with his user id
    form.instance.user = self.request.user                                              #- Assign the logged in user (self.request.user)
    return super().form_valid(form)                                                     #- Let the CreateView do its job as usual  

class CatUpdate(LoginRequiredMixin, UpdateView):                                      #+ 6.2 LoginRequired for class-based views
  model = Cat
  fields = ['breed', 'description', 'age']

class CatDelete(LoginRequiredMixin, DeleteView):                                      #+ 6.3 LoginRequired for class-based views
  model = Cat
  success_url = '/cats/'

def home(request):
  return render(request, 'home.html')

def about(request):
  return render(request, 'about.html')

def cats_index(request):
  cats = Cat.objects.filter(user=request.user)                                      #! 4- Filter the cats by the user
  return render(request, 'cats/index.html', { 'cats': cats })

@login_required                                                                       #+ 5.1 Extends the functionality of login_required
def cats_detail(request, cat_id):
  try:
    cat = Cat.objects.get(id=cat_id)
    # Get the toys the cat doesn't have
    toys_cat_doesnt_have = Toy.objects.exclude(id__in = cat.toys.all().values_list('id'))
    # Instantiate FeedingForm to be rendered in the template
    feeding_form = FeedingForm()
    return render(request, 'cats/detail.html', {
      # Pass the cat and feeding_form as context
      'cat': cat, 'feeding_form': feeding_form,
      # Add the toys to be displayed
      'toys': toys_cat_doesnt_have
    })
  except :
    return redirect('index')

@login_required                                                                       #+ 5.2 Extends the functionality of login_required
def add_feeding(request, cat_id):
	# create the ModelForm using the data in request.POST
  form = FeedingForm(request.POST)
  # validate the form
  if form.is_valid():
    # don't save the form to the db until it
    # has the cat_id assigned
    new_feeding = form.save(commit=False)
    new_feeding.cat_id = cat_id
    new_feeding.save()
  return redirect('detail', cat_id=cat_id)

@login_required                                                                       #+ 5.3 Extends the functionality of login_required
def add_photo(request, cat_id):
	# photo-file was the "name" attribute on the <input type="file">
  photo_file = request.FILES.get('photo-file', None)
  if photo_file:
    s3 = boto3.client('s3')
    # need a unique "key" for S3 / needs image file extension too
    key = uuid.uuid4().hex[:6] + photo_file.name[photo_file.name.rfind('.'):]
    # just in case something goes wrong
    try:
      s3.upload_fileobj(photo_file, BUCKET, key)
      # build the full url string
      url = f"{S3_BASE_URL}{BUCKET}/{key}"
      # we can assign to cat_id or cat (if you have a cat object)
      photo = Photo(url=url, cat_id=cat_id)
      photo.save()
    except:
      print('An error occurred uploading file to S3')
  return redirect('detail', cat_id=cat_id)

@login_required                                                                       #+ 5.4 Extends the functionality of login_required
def assoc_toy(request, cat_id, toy_id):
  Cat.objects.get(id=cat_id).toys.add(toy_id)
  return redirect('detail', cat_id=cat_id)

@login_required                                                                       #+ 5.5 Extends the functionality of login_required
def unassoc_toy(request, cat_id, toy_id):
  Cat.objects.get(id=cat_id).toys.remove(toy_id)
  return redirect('detail', cat_id=cat_id)

class ToyList(LoginRequiredMixin, ListView):                                          #+ 6.4 LoginRequired for class-based views
  model = Toy

class ToyDetail(LoginRequiredMixin, DetailView):                                      #+ 6.5 LoginRequired for class-based views
  model = Toy

class ToyCreate(LoginRequiredMixin, CreateView):                                      #+ 6.6 LoginRequired for class-based views
  model = Toy
  fields = '__all__'

class ToyUpdate(LoginRequiredMixin, UpdateView):                                      #+ 6.7 LoginRequired for class-based views
  model = Toy
  fields = ['name', 'color']

class ToyDelete(LoginRequiredMixin, DeleteView):                                      #+ 6.8 LoginRequired for class-based views
  model = Toy
  success_url = '/toys/'

#! 3- signup function 
def signup(request):
  error_message = ''                                                                  #+ At frist the msg is empty
  if request.method == 'POST':                                                          #- If it's a POST request
                                                                                          #- This is how to create a 'user' form object
                                                                                          #- that includes the data from the browser
    form = UserCreationForm(request.POST)                                               #- Create an instance of the form
    if form.is_valid():                                                                 #- Check if the form is valid (all the fields)
      user = form.save()                                                                  #? This will add the user to the database
      login(request, user)                                                                #? This is how we log a user in via code
      return redirect('index')                                                            #? Redirect to index page
    else:                                                                               #- If the form is not valid
      error_message = 'Invalid sign up - try again'                                       #? A bad POST or a GET request, so render signup.html with an empty form
  form = UserCreationForm()                                                           #+ If the form is not valid the code will continue and create a new form
  context = {'form': form, 'error_message': error_message}                            #+ Then it will create a new object 'context' with the form and the error message
  return render(request, 'registration/signup.html', context)                         #+ Then it will render the page again with the context information