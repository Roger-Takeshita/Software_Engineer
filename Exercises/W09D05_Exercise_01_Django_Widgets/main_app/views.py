from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Widget
from .forms import WidgetForm
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.db.models import Sum

def home(request):
    widget_list = Widget.objects.all()
    total = Widget.objects.aggregate(Sum('quantity'))
    widget_form = WidgetForm()
    return render(request, 'index.html', {
        'title': 'Wacky Widgets',
        'widget_form': widget_form,
        'widget_list': widget_list,
        'total': total['quantity__sum']
    })

class WidgetCreate(CreateView):
    model = Widget
    fields = ['description', 'quantity']
    success_url = '/'

class WidgetDelete(DeleteView):
    model = Widget
    success_url = '/'