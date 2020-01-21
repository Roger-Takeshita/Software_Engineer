
#!                                             mm                              
#!                                             MM                              
#!            `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
#!              MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
#!              MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
#!              MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
#!            .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

"""dogcollector URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
   https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
   1. Add an import:  from my_app import views
   2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
   1. Add an import:  from other_app.views import Home
   2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
   1. Import the include() function: from django.urls import include, path
   2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include       #! include allow us to include all files in our project

urlpatterns = [
   path('admin/', admin.site.urls),
   path('', include('main_app.urls')),     #! We are mounting the main page on the root of the website
]