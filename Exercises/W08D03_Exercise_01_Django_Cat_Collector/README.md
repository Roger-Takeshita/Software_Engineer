python manage.py shell
>Python 3.7.5 (default, Nov  1 2019, 02:16:23)
>Type 'copyright', 'credits' or 'license' for more information
>IPython 7.9.0 -- An enhanced Interactive Python. Type '?' for help.


In [1]: from main_app.models import Cat

In [2]: Cat.objects.all()

Out[2]: <QuerySet []>

In [3]: c = Cat(name="Biscuit", breed='Sphinx', description='Evil looking cuddle monster. Hairless', age=2)

In [4]: c.__dict__

Out[4]:
{'_state': <django.db.models.base.ModelState at 0x109a88c50>,
 'id': None,
 'name': 'Biscuit',
 'breed': 'Sphinx',
 'description': 'Evil looking cuddle monster. Hairless',
 'age': 2}

In [5]: c.save()

In [6]: c.id

Out[6]: 1

In [8]: Cat.objects.all()

Out[8]: <QuerySet [<Cat: Cat object (1)>]>

In [9]: d = Cat.objects.all()[0]

In [10]: d

Out[10]: <Cat: Biscuit>

In [11]: d.name = 'Rubber Biscuit'

In [12]: d.save()

In [13]: d

Out[13]: <Cat: Rubber Biscuit>

In [14]: Cat.objects.all()[0]

Out[14]: <Cat: Rubber Biscuit>

In [15]: Cat.objects.all()

Out[15]: <QuerySet [<Cat: Rubber Biscuit>]>

In [16]: c.id

Out[16]: 1