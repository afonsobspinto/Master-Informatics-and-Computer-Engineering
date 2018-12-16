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
    path('children/', views.get_children, name='children'),
    path('settings/', views.add_settings, name='settings'),
    path('add-routine/', views.add_routine, name='add-routine'),
    path('add-activity/', views.add_activity, name='add-activity'),
    path('remove-child/', views.remove_child, name='remove-child'),
    path('add-history/', views.add_history, name='add-history'),
    path('history/', views.get_history, name='get-history'),
    path('add-reward/', views.add_reward, name='add-reward'),
    path('remove-reward/', views.remove_reward, name='remove-reward'),
    path('edit-routine/', views.edit_routine, name='edit-routine'),
    path('delete-routine/', views.delete_routine, name='delete-routine'),
    path('edit-activity/', views.edit_activity, name='edit-activity'),
    path('delete-activity/', views.delete_activity, name='delete-activity'),
    path('remove-child/', views.remove_child, name='remove-child'),
    url(r'^routine/', views.get_child_routines, name='child-routines'),
    path('switch-routine-weight', views.switch_routine_weight, name='routine-weights'),
    path('switch-activity-weight', views.switch_activity_weight, name='activity-weights')
] + staticfiles_urlpatterns()
