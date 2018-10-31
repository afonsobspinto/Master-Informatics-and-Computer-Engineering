from django.db import models


class Parent(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Child(models.Model):
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.name
