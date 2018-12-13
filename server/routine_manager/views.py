import json
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Child, UserInfo, Settings, Routine, Activity


def index(request):
    return JsonResponse({'foo': 'bar'})


# TODO:
# try and catch nisto tudo
# adicionar Token

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
        logged_user = User.objects.get(username=body['email'])
        settings_model = Settings.objects.get(user=logged_user)
        if user is not None:
            return JsonResponse({
                'status': '200',
                'activityProgressType': settings_model.activityProgressType,
                'activityShowTimer': settings_model.activityShowTimer,
                'activityFeedback': settings_model.activityFeedback,
                'feedbackFrequency': settings_model.feedbackFrequency,
                'visualStyle': settings_model.visualStyle,
                'routinePlayType': settings_model.routinePlayType,
                'playSounds': settings_model.playSounds
            })

        else:
            return JsonResponse({'status': '400'})


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
def add_routine(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        routine = None
        for child in Child.objects.all():
            if 'photo' in body and 'image' in body:
                routine = Routine(childID=child, title=body['title'], color=body['color'], image=body['image'],
                                  photo=body['photo'], periodicity=body['periodicity'])
            elif 'photo' in body:
                routine = Routine(childID=child, title=body['title'], color=body['color'],
                                  photo=body['photo'], periodicity=body['periodicity'])
            elif 'image' in body:
                routine = Routine(childID=child, title=body['title'], color=body['color'], image=body['image'],
                                  periodicity=body['periodicity'])

        if routine is not None:
            routine.save()
        return JsonResponse({'status': '200'})

@csrf_exempt
def remove_child(request):
    if request.method == 'DELETE':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user = User.objects.get(username=body['email'])
        user_info = UserInfo.objects.get(user=user)
        children = Child.objects.filter(userID=user_info) # TODO: esta a dar delete a primeira crianca, alterar quando houver front end
        child_to_delete = children[0]
        child_to_delete.delete()
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
def add_settings(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        logged_user = User.objects.get(username=body['userEmail'])
        settings_model = Settings.objects.get(user=logged_user)
        settings_model.activityProgressType = body['activityProgressType']
        settings_model.activityShowTimer = body['activityShowTimer']
        settings_model.activityFeedback = body['activityFeedback']
        settings_model.feedbackFrequency = body['feedbackFrequency']
        settings_model.routinePlayType = body['routinePlayType']
        settings_model.playSounds = body['playSounds']
        try:
            settings_model.save()
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})


@csrf_exempt
def add_image(request):
    if request.method == 'POST':
        handle_uploaded_file(request.FILES['photo'])
        return JsonResponse({'status': '200'})


def handle_uploaded_file(f):
    with open('./server/static/assets/images/' + f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)


def get_children(request):
    if request.method == 'GET':
        user = User.objects.get(username=request.GET.get('userEmail', ''))
        children = Child.objects.filter(userID=user.userinfo)
        dict_child_wrapper = []
        for child in children:
            dict_child_wrapper.append({"name": child.name,
                                       "image": "http://" + settings.LOCALIP + ':8000/static/assets/images/' + child.image})
        response = json.dumps(dict_child_wrapper)
        return JsonResponse({'status': '200',
                             'response': response})

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
