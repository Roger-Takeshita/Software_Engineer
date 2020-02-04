<h1 id='create-new-app'>Create a New App</h1>

<h3 id='create-database'>Create Database</h3>

* On Terminal

   ```Bash
      createdb dogcollector
   ```

<h3 id='start-project'>Start the Project</h3>

   ```Bash
      django-admin startproject catcollector
   ```

<h3 id='create-app'>Create the App</h3>

   ```Bash
      python manage.py startapp main_app
   ```

<h3 id='start-server'>Start the Server</h3>

   ```Bash
      python manage.py runserver
   ```

<h1 id='on-vscode'>On VSCode</h1>

### On `settings.py`

[Go Back to S ummary](#summary)

* Change the database to `postgresql` and the **NAME** fo the database (**line 76**):

   ```Python
      DATABASES = {
         'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'dogcollector',
         }
      }
   ```

 * add the `main_app` to the list of **INSTALLED_APPS** dictionary:

   ```Python
         INSTALLED_APPS = [
            'main_app',
            'django.contrib.admin',
            'django.contrib.auth',
            'django.contrib.contenttypes',
            'django.contrib.sessions',
            'django.contrib.messages',
            'django.contrib.staticfiles',
         ]
   ```

### On `terminal`

* Test our database connections by getting rid of the red unapplied migrations message:

  >You have 17 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
  >Run 'python manage.py migrate' to apply them.

   ```Bash
      python manage.py migrate
   ```

### Create our `routes URL`

  * There's already a project `dogcollector/urls.py` that we could use, but it's a best practice for each app to define its own and include those URLs in the project **URLconf**.
  * Create the **URLconf** insde `main_app` folder named `urls.py`

### On `dogcollector/urls.py`:

   ```Python
      #!                                             mm                              
      #!                                             MM                              
      #!            `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
      #!              MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
      #!              MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
      #!              MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
      #!            .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

      from django.contrib import admin
      from django.urls import path, include       #! include allow us to include all files in our project

      urlpatterns = [
         path('admin/', admin.site.urls),
         path('', include('main_app.urls')),     #! We are mounting the main page on the root of the website
      ]
   ```

  * Similar to how Express appends paths defined in a router module to the path in `app.use`, the paths defined in `main_app.urls` will be **appended** to the path specified in the `include` function.

### On `main_app/urls.py`:

   ```Python
      #!                                             mm                              
      #!                                             MM                              
      #!            `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
      #!              MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
      #!              MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
      #!              MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
      #!            .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

      from django.urls import path                    #! 1- import 'path' function that will be used to define each route
      from . import views                             #! 2- '.' looks inside of package directory and imports the view package

      urlpatterns = [                                    #+ 2.1 - 'urlpatterns' will hold each route we define for 'main_app'
         path('', views.home, name='home'),                 #- 2.1.1 - Define the path of the home page
                                                               #? 2.1.1.1 - Inside of `main_app/views.py` we have our 'home' (controller)
                                                               #? 2.1.1.2 - Instead of hard code the name of the controller, We are giving the name 'home' so we can use it in other parts of the applicaton (usually in templates)
      ]
   ```

### On `main_app/views.py`:

   ```Python
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

      #+ 3- Home view
      def home(request):
         return HttpResponse('<h1>Home of Dog Collector</h1>')
   ```

### Make a dir `main_app/templates`:

   ```Bash
      mkdir main_app/templates
   ```

### Create file `about.html`

   ```Bash
      touch main_app/templates/about.html
   ```

### In `main_app/templates/about.html`

* Create html boiler plate

   ```HTML
      <!DOCTYPE html>
      <html lang="en">
      <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="X-UA-Compatible" content="ie=edge">
         <title>Dog Collector</title>
      </head>
      <body>
         <h1>About the Dog Collector</h1>
         <hr />
         <p>Hire the Dog Collector!</p>
         <footer></footer>
      </body>
      </html>
   ```

### In `views.py` 

* Render the `about.html` template.

   ```Python
      #+ 4- About view
      def about(request):
         return render(request, 'about.html')
   ```

### Create the **base** template for our templates, `main_app/templates/base.html`

   ```Bash
      touch main_app/templates/base.html
   ```

### On `base.html`

   ```HTML
         <!DOCTYPE html>
         <html lang="en">
         <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link href="https://fonts.googleapis.com/css?family=Dancing+Script&display=swap" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Fredoka+One&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
            <title>Dog Collector</title>
         </head>
         <body>
            <header class="navbar-fixed">
               <nav>
                     <div class="nav-wrapper">
                        <ul>
                           <li><a href="/" class="left brand-logo">&nbsp;&nbsp;DogCollector</a></li>
                        </ul>
                        <ul class="right">
                           <li><a href="/about">About</a></li>
                        </ul>
                     </div>
               </nav>
            </header>
            <main class="container">
               {% block content %}
               {% endblock %}
            </main>
            <footer class="page-footer">
               <hr>
               <p><a href="https://github.com/roger-takeshita" target="blank"><span>Developed by</span>&nbsp;Roger Takeshita&nbsp;<img src="/images/github.png" alt="github"></a></p>
            </footer>
         </body>
         </html>
   ```

### On `main_app/tempaltes/about.html`
  
  * Change the structure to:

   ```HTML
      {% extends 'base.html' %}
      {% block content %}
         <h1>About the Dog Collector</h1>
         <hr />
         <p>Hire the Dog Collector!</p>
      {% endblock %}
   ```

### Including Static Files in a Template

  * Static files are `.css`, `.js`, images files, etc..
  * Django projects are pre-configured with a `django.contrib.staticfiles` app installed for the purpose of serving static files
  * A the bottom of `settings.py`, there is a `STATIC_URL = '/static/` variable that declares what folder within the app to look for static files in.
  
### Create the static folder:

   ```Bash
         mkdir main_app/static/css
   ```

### CSS
  * Create the css file:

   ```Bash
      touch main_app/static/css/style.css
   ```

### In `main_app/templates/base.html`

* Add `load` template tag at the top of the
   
   ```HTML
      {% load static %}
      <!DOCTYPE html>
      .
      .
      .
   ```

    * Below the Materialize CDN add the `css` path

   ```HTML
      <link rel="stylesheet" type="text/css" href="{% static 'css/style.css' %}">
   ```

* Create our `main_app/models.py`, this will be our schema:

   ```Bash
      touch main_app/models.py
   ```

   ```Python
      from django.db import models                          #! Import models form Django

      #+ Create Dog Schema
      class Dog(models.Model):
         name = models.CharField(max_length=100)
         breed = models.CharField(max_length=100)
         description = models.TextField(max_length=250)
         age = models.IntegerField()

         def __str__(self):
            return self.name
   ```

<h2 id='orm'>Object-Relational-Mapper (ORM)</h2>

[Go Back to Summary](#summary)

* It's called that because it creates Python objects from rows in a relational database table and vice-versa.
* The ORM allows developers to write object-oriented code to interact with a database insdead of SQL.
* Another benefit is that ORM and Model layer abstracts away the differences between the falvors of SQL that exists -  we get to write the same Python code to performe CRUD operations, regardless of which database is being used.

<h3 id='django-orm'>Django's ORM</h3>

[Go Back to Summary](#summary)

* The Django ORM is automatically going to generate, a plethora of methods for each Model.
* Django's ORM will have methods for perfoming:
  * Filtering (querying based on criteria)
  * Ordering
  * Even accessing the data from related Models
* Django refers to the ORM funcions availaible as its [database API](https://docs.djangoproject.com/en/2.1/topics/db/queries/). 

<h2 id='performing-crud'>Performing CRUD in Python Interactive Shell</h2>

[Go Back to Summary](#summary)

* Python Interactive Shell
  * Create the dog table into our database

   ```Bash
      python manage.py makemigrations
   ```

  * Synchronize the database's schema with our database
    * Simply creating migration files does not update our database

   ```Bash
      python manage.py migrate
   ``` 

* PostgreSQL Shell

   ```Bash
      psql              # Run PostgreSQL Shell
      \c dogcollector   # Select dogcollector database
      \d                # Check dogcollector tables
   ```

   ```Bash
      List of relations
      Schema |               Name                |   Type   |   Owner
      --------+-----------------------------------+----------+------------
      public | auth_group                        | table    | roger-that
      public | auth_group_id_seq                 | sequence | roger-that
      public | auth_group_permissions            | table    | roger-that
      public | auth_group_permissions_id_seq     | sequence | roger-that
      public | auth_permission                   | table    | roger-that
      public | auth_permission_id_seq            | sequence | roger-that
      public | auth_user                         | table    | roger-that
      public | auth_user_groups                  | table    | roger-that
      public | auth_user_groups_id_seq           | sequence | roger-that
      public | auth_user_id_seq                  | sequence | roger-that
      public | auth_user_user_permissions        | table    | roger-that
      public | auth_user_user_permissions_id_seq | sequence | roger-that
      public | django_admin_log                  | table    | roger-that
      public | django_admin_log_id_seq           | sequence | roger-that
      public | django_content_type               | table    | roger-that
      public | django_content_type_id_seq        | sequence | roger-that
      public | django_migrations                 | table    | roger-that
   ```

* Python Interactive Shell
  * Insert data into our database using command line

   ```Bash
      python manage.py shell    # Run Pyhton Shell
   ```

   ```Bash
      In [1]: from main_app.models import Dog

      In [2]: Dog.objects.all()

      Out[2]: <QuerySet []>

      In [3]: new_dog = Dog(name="Yumi", breed="Jack Russell Terrier", description="The destroyer of toys", age=2)

      In [4]: new_dog.__dict__

      Out[4]:
      {'_state': <django.db.models.base.ModelState at 0x10859d390>,
      'id': None,
      'name': 'Yumi',
      'breed': 'Jack Russell Terrier',
      'description': 'The destroyer of toys',
      'age': 2}

      In [5]: new_dog.save()

      In [6]: new_dog.id

      Out[6]: 1

      In [7]: new_dog = Dog(name="Mike", breed="Spitz", description="Little pig", age=3)

      In [8]: new_dog.save()

      In [9]: new_dog.id

      Out[9]: 2

      In [10]: new_dog = Dog(name="Joy", breed="West Terrier", description="The jellous", age=5)

      In [11]: new_dog.save()

      In [12]: new_dog.id

      Out[12]: 3

      In [13]: Dog.objects.all()

      Out[13]: <QuerySet [<Dog: Yumi>, <Dog: Mike>, <Dog: Joy>]>
   ```


* On `main_app/views.py`:

* Import the Dog model

   ```Python
      from .models import Cat
   ```

* Get all the dogs from our databse

   ```Python
      def dogs_index(request):
         dogs = Dog.objects.all()
         return render(request, 'dogs/index.html', { 'dogs': dogs })
   ```



* Create a superuser

   ```Bash
      python manage.py createsuperuser
   ```

* On `main_app/admin.py`

   ```Python
      from django.contrib import admin
      from .models import Dog                   #! 1- Import the dog model

      #!+ 1.1 - Register your models here
      admin.site.register(Dog)
   ```

* Restart the server
  * Ctrl+C
  * python manage.py runserver