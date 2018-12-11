# Generated by Django 2.1.2 on 2018-12-11 21:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('routine_manager', '0002_auto_20181211_1448'),
    ]

    operations = [
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activityProgressType', models.CharField(default='bar', max_length=10)),
                ('activityShowTimer', models.BooleanField(default=False)),
                ('activityFeedback', models.CharField(default='visual', max_length=15)),
                ('feedbackFrequency', models.CharField(default='normal', max_length=15)),
                ('visualStyle', models.CharField(default='cartoon', max_length=15)),
                ('routinePlayType', models.CharField(default='choose', max_length=15)),
                ('playSounds', models.BooleanField(default=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='routine_manager.UserInfo')),
            ],
        ),
    ]
