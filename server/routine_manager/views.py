from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json

from .models import Child, UserInfo, Settings, Routine


def index(request):
    return JsonResponse({'foo': 'bar'})

#TODO: try and catch
@csrf_exempt
def register(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        User.objects.create_user(username=body['email'], email=body['email'], password=body['password'])
        user = User.objects.get(username=body['email'])
        settings = Settings(user=user)
        settings.save()
        return JsonResponse({'status': '200'})


@csrf_exempt
def login(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = authenticate(username=body['email'], password=body['password'])
        loggedUser = User.objects.get(username=body['email'])
        settings = Settings.objects.get(user=loggedUser)
        if user is not None:
            return JsonResponse({
                'status': '200',
                'activityProgressType': settings.activityProgressType,
                'activityShowTimer': settings.activityShowTimer,
                'activityFeedback': settings.activityFeedback,
                'feedbackFrequency': settings.feedbackFrequency,
                'visualStyle': settings.visualStyle,
                'routinePlayType': settings.routinePlayType,
                'playSounds': settings.playSounds
            })

        else:
            return JsonResponse({'status': '400'})


#TODO: Add try and catch
@csrf_exempt
def add_child(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = User.objects.get(username=body['userEmail'])
        user_info = UserInfo.objects.get(user=user)
        child = Child(userID=user_info, name=body['name'],
                      gender=body['gender'], image=body['image'])
        child.save()
        return JsonResponse({'status': '200'})

@csrf_exempt
def add_routine(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        for child in Child.objects.all():
            if('photo' in body and 'image' in body):
                routine = Routine(childID=child, title=body['title'], color=body['color'], image=body['image'],
                        photo=body['photo'], periodicity=body['periodicity'])
            elif('photo' in body):
                routine = Routine(childID=child, title=body['title'], color=body['color'],
                        photo=body['photo'], periodicity=body['periodicity'])
            elif('image' in body):
                routine = Routine(childID=child, title=body['title'], color=body['color'], image=body['image'],
                        periodicity=body['periodicity'])
                     
        routine.save()
        return JsonResponse({'status': '200'})


@csrf_exempt
def push_token(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user_info = UserInfo.objects.get(username=body['userEmail'])
        user_info.token = body['token'].value
    try:
        user_info.save()
    except Exception:
        return JsonResponse({'status': '400'})
    return JsonResponse({'status': '200'})

@csrf_exempt
def settings(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        loggedUser = User.objects.get(username=body['userEmail'])
        settings = Settings.objects.get(user=loggedUser)
        settings.activityProgressType = body['activityProgressType']
        settings.activityShowTimer = body['activityShowTimer']
        settings.activityFeedback = body['activityFeedback']
        settings.feedbackFrequency = body['feedbackFrequency']
        settings.routinePlayType = body['routinePlayType']
        settings.playSounds = body['playSounds']
        try:
            settings.save()
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})
