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
    title = models.CharField(max_length=100)
    image = models.CharField(max_length=32)
    photo = models.CharField(max_length=256, null=True)
    color = models.CharField(max_length=10)
    weight = models.IntegerField(default=0)
    periodicity = models.CharField(max_length=7, default='1111111')
    isWeeklyRepeatable = models.BooleanField(default=True)

class Activity(models.Model):
    routineID = models.ForeignKey(Routine, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    image = models.CharField(max_length=32)
    photo = models.CharField(max_length=256, null=True)
    color = models.CharField(max_length=10)
    weight = models.IntegerField(default=0)
    timeGoal = models.IntegerField(default=0)
    timeMax = models.IntegerField(default=0)
    timeMin = models.IntegerField(default=0)

class ActivityHistory(models.Model):
    childID = models.ForeignKey(Child, on_delete=models.CASCADE)
    activityID = models.ForeignKey(Activity, on_delete=models.CASCADE)
    rewardGained = models.IntegerField(default=0)
    elapsedTime = models.IntegerField(default=0)
    timeStamp = models.IntegerField(default=0)

class Settings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activityProgressType = models.CharField(max_length=10, default='bar')
    activityShowTimer = models.BooleanField(default=False)
    activityFeedback = models.CharField(max_length=15, default='visual')
    feedbackFrequency = models.CharField(max_length=15, default='normal')
    visualStyle = models.CharField(max_length=15, default='cartoon')
    routinePlayType = models.CharField(max_length=15, default='choose')
    playSounds = models.BooleanField(default=True)
