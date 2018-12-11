from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json

from .models import Child, UserInfo


def index(request):
    return JsonResponse({'foo': 'bar'})


@csrf_exempt
def register(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        try:
            user = User.objects.create_user(username=body['email'], email=body['email'], password=body['password'])
            user.save()
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})


@csrf_exempt
def login(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = authenticate(username=body['email'], password=body['password'])
        if user is not None:
            return JsonResponse({'status': '200'})

        else:
            return JsonResponse({'status': '400'})


@csrf_exempt
def add_child(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        child = Child(userID=User.objects.get(username=body['userEmail']), name=body['name'],
                      gender=body['gender'], image=body['image'])
        try:
            child.save()
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})

@csrf_exempt
def push_token(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = UserInfo.objects.get(username=body['user'].username)
        user.token = body['token'].value
        user.save()

        