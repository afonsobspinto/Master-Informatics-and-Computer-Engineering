# Generated by Django 2.1.2 on 2018-12-11 23:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('routine_manager', '0006_auto_20181211_2241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='settings',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
