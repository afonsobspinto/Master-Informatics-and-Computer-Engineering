from django.db import models
from django import forms


class User(models.Model):
    name = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=50)
    password = forms.CharField(widget=forms.PasswordInput)

    def __str__(self):
        return self.name


class Child(models.Model):
    userID = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200)
    level = models.IntegerField(default=0)
    xp = models.IntegerField(default=0)
    stars = models.IntegerField(default=0)
    avatar = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.name


class Routine(models.Model):
    childID = models.ForeignKey(Child, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.IntegerField(default=0)
    photo = models.CharField(max_length=200)
    color = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    timeGoal = models.IntegerField(default=0)
    timeMax = models.IntegerField(default=0)
    timeMin = models.IntegerField(default=0)
