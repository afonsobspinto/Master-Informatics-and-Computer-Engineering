from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json

from .models import Child, UserInfo, Settings, Routine, Activity


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

        with open('routine_manager/default_data.json') as data_file:
            data = json.load(data_file)
            for routine in data['routines']:
                new_routine = Routine(childID=child, title=routine['title'], image=routine['image'], photo=routine['photo'], color=routine['color'], weight=routine['weight'], periodicity=routine['periodicity'])
                new_routine.save()
                for activity in routine['activities']:
                    new_activity = Activity(routineID=new_routine, title=activity['title'], image=activity['image'], photo=activity['photo'], color=activity['color'], weight=activity['weight'], timeGoal=activity['time']['goal'], timeMax=activity['time']['max'], timeMin=activity['time']['min'])
                    new_activity.save()
        return JsonResponse({'status': '200'})

@csrf_exempt
def remove_child(request):
    if request.method == 'DELETE':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = User.objects.get(username=body['email'])
        user_info = UserInfo.objects.get(user=user)
        children = Child.objects.filter(userID=user_info) #esta a dar delete a primeira crianca, alterar quando houver front end
        print(children)
        child_to_delete = children[0]
        child_to_delete.delete()
        children = Child.objects.filter(userID=user_info) #esta a dar delete a primeira crianca, alterar quando houver front end
        print(children)
        return JsonResponse({'status': '400'})
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

@csrf_exempt
def add_history(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        loggedUser = User.objects.get(username=body['userEmail'])
        child = Child.objects.get(userID=loggedUser, name=body['name'])
        routine = Routine.objects.get(childID=child, title=body['routineTitle'])
        activity = Activity.objects.get(routineID = routine,title=body['activityTitle'])
        history = (childId=child, activityID=activity, rewardGained=body['rewardGained'],
                    elapsedTime=body['elapsedTime'], timeStamp=body['timeStamp'])
        history.save()
        return JsonResponse({'status': '200'})
