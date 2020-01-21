* [Installation Django](https://github.com/bitmakerlabs/python-dev-setup-guide-mac)
* [Django Intro](https://git.generalassemb.ly/roger-takeshita/Software-Engineer/blob/master/work/w07/d5/django-intro.md)
  
* Start a new project

   ```Bash
      django-admin startproject <name of your site>
   ```

* Run server

   ```Bash
      python manage.py runserver
   ```
                                       
* Start a new app

   ```Bash
      python manage.py startapp polls
   ```

* Done part 1 and 2 of the tutorial

  * [Part 1](https://docs.djangoproject.com/en/2.2/intro/tutorial01/)
  * [Part 2](https://docs.djangoproject.com/en/2.2/intro/tutorial02/)


---------
# Terminal Commands

python manage.py shell
> Python 3.7.5 (default, Nov  1 2019, 02:16:23)
> Type 'copyright', 'credits' or 'license' for more information
> IPython 7.9.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: from polls.models import Choice, Question

In [2]: from django.utils import timezone

In [3]: q = Question(question_text="What's new?", pub_date=timezone.now())

In [4]: q

Out[4]: <Question: Question object (None)>

In [5]: q.save()

In [6]: q.id

Out[6]: 1

In [7]: q.question_text

Out[7]: "What's new?"

In [8]: q.pub_date

Out[8]: datetime.datetime(2020, 1, 17, 20, 29, 0, 126734, tzinfo=<UTC>)

In [9]: q.question_text = "New Value?"

In [10]: q.save()

In [11]: q.id

Out[11]: 1

In [12]: q.question_text

Out[12]: 'New Value?'