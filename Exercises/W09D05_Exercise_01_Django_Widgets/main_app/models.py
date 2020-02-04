from django.db import models

class Widget(models.Model):
    description = models.CharField(max_length=150)
    quantity = models.IntegerField()

    def __str__(self):
        return self.description
