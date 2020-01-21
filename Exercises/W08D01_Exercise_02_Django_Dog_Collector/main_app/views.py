
#!                                                                        ,,    ,,                            
#!                                             mm                       `7MM  `7MM                            
#!                                             MM                         MM    MM                            
#!             ,p6"bo   ,pW"Wq.  `7MMpMMMb.  mmMMmm  `7Mb,od8  ,pW"Wq.    MM    MM   .gP"Ya  `7Mb,od8 ,pP"Ybd 
#!            6M'  OO  6W'   `Wb   MM    MM    MM      MM' "' 6W'   `Wb   MM    MM  ,M'   Yb   MM' "' 8I   `" 
#!            8M       8M     M8   MM    MM    MM      MM     8M     M8   MM    MM  8M""""""   MM     `YMMMa. 
#!            YM.    , YA.   ,A9   MM    MM    MM      MM     YA.   ,A9   MM    MM  YM.    ,   MM     L.   I8 
#!             YMbmd'   `Ybmd9'  .JMML  JMML.  `Mbmo .JMML.    `Ybmd9'  .JMML..JMML. `Mbmmd' .JMML.   M9mmmP'

from django.shortcuts import render                #! 1- Import render
from django.http import HttpResponse               #! 2- Import the HttpResponse function. HttpResponse is the simplest way to send something back in response to a request
from .models import Dog                            #! 5- Import Dog model
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
   return render(request, 'dogs/detail.html', { 'dog': dog })