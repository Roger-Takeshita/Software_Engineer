from django.urls import path
from . import views       # current folder that i am in, i am going to import my view modules

urlpatterns = [
   path('', views.index, name='index')   # we gave a name to our routes as 'index'
]