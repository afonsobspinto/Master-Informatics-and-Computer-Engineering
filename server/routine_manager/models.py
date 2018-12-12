from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.TextField(max_length=500, null=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserInfo.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.userinfo.save()


class Child(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    userID = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='M')
    level = models.IntegerField(default=1)
    xp = models.IntegerField(default=0)
    stars = models.IntegerField(default=0)
    avatar = models.CharField(max_length=500, null=True)
    image = models.CharField(max_length=500, null=True)

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
