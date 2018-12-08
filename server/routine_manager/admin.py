from django.contrib import admin

from .models import User, Child, Routine

admin.site.register(User)
admin.site.register(Child)
admin.site.register(Routine)