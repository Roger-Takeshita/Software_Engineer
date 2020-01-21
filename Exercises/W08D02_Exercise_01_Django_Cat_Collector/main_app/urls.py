
#!                                             mm                              
#!                                             MM                              
#!            `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
#!              MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
#!              MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
#!              MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
#!            .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

from django.urls import path
from . import views                       #! 1- looks inside this dir (package) and import the view file

urlpatterns = [
   path('', views.home, name='home'),     #+ 2- defining the path of the home page, insid of views, we have the template home, and we are giving a name as 'home'
                                          #- 3- in other parts of the application (usually in templates) instead of hard code of the route, we give a name to this reference
   path('about/', views.about, name='about'), #- 4 I have to add the '/' after the router (in django)
   path('cats/', views.cats_index, name='index'),  #- 5
   path('cats/<int:cat_id>/', views.cats_detail, name='detail'),
   path('cats/create/', views.CatCreate.as_view(), name='cats_create'),
   path('cats/<int:pk>/update/', views.CatUpdate.as_view(), name='cats_update'),
   path('cats/<int:pk>/delete/', views.CatDelete.as_view(), name='cats_delete'),
]