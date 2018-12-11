from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('add-child/', views.add_child, name='add-child'),
    path('push-token/', views.push_token, name='push-token'),
    path('assets/images/', views.add_image, name='images')
]