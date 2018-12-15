from django.conf.urls import url
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('add-child/', views.add_child, name='child'),
    path('push-token/', views.push_token, name='token'),
    path('assets/images/', views.add_image, name='image'),
    url(r'^children/', views.get_children, name='children'),
    path('settings/', views.add_settings, name='settings'),
    path('add-routine/', views.add_routine, name='add-routine'),
    path('edit-routine/', views.edit_routine, name='edit-routine'),
    path('delete-routine/', views.delete_routine, name='delete-routine'),
    path('remove-child/', views.remove_child, name='remove-child'),
    url(r'^routine/', views.get_child_routines, name='child-routines'),
    path('switch-routine-weight', views.switch_routine_weight, name='routine-weights'),
    path('switch-activity-weight', views.switch_activity_weight, name='activity-weights')
] + staticfiles_urlpatterns()
