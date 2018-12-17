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
    url(r'^get-settings', views.get_settings, name='get-settings'),
    path('add-routine/', views.add_routine, name='add-routine'),
    path('add-activity/', views.add_activity, name='add-activity'),
    path('remove-child/', views.remove_child, name='remove-child'),
    path('add-history/', views.add_history, name='add-history'),
    path('history/', views.get_history, name='get-history'),
    path('add-stars/', views.add_stars, name='add-stars'),
    path('remove-stars/', views.remove_stars, name='remove-stars'),
    path('edit-routine/', views.edit_routine, name='edit-routine'),
    path('delete-routine/', views.delete_routine, name='delete-routine'),
    path('edit-activity/', views.edit_activity, name='edit-activity'),
    path('delete-activity/', views.delete_activity, name='delete-activity'),
    path('remove-child/', views.remove_child, name='remove-child'),
    url(r'^routine', views.get_child_routines, name='child-routines'),
    url(r'^get-daily-routine', views.get_daily_routines, name='daily-routines'),
    path('switch-routine-weight/', views.switch_routine_weight, name='routine-weights'),
    path('switch-activity-weight/', views.switch_activity_weight, name='activity-weights'),
    path('switch-reward-weight/', views.switch_reward_weight, name='reward-weights'),
    path('update-avatar/', views.update_avatar, name='update-avatar'),
    path('add-reward/', views.add_reward, name='add-reward'),
    path('edit-reward/', views.edit_reward, name='edit-reward'),
    path('remove-reward/', views.remove_reward, name='remove-reward'),
    url(r'^get-reward', views.get_reward, name='get-reward')
] + staticfiles_urlpatterns()
