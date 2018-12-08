from django.db import models


class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=50) 

    def __str__(self):
        return self.name


class Child(models.Model):
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    level = models.IntegerField(default=0)
    xp = models.IntegerField(default=0)
    stars = models.IntegerField(default=0)
    avatar = models.CharField(max_length=500)

    def __str__(self):
        return self.name

class Routine(models.Model):
    childID = models.ForeignKey(Child, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.IntegerField(default=0)
    photo = models.CharField(max_length=200)
    color = models.IntegerField(defaul=0)
    weight = models.IntegerField(defaul=0)
    timeGoal = models.IntegerField(defaul=0)
    timeMax = models.IntegerField(defaul=0)
    timeMin = models.IntegerField(defaul=0)
