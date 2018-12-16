import json
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Child, UserInfo, Settings, Routine, Activity, ActivityHistory


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
                new_routine = Routine(childID=child, title=routine['title'], image=routine['image'],
                                      photo=routine['photo'], color=routine['color'], weight=routine['weight'],
                                      periodicity=routine['periodicity'])
                new_routine.save()
                for activity in routine['activities']:
                    new_activity = Activity(routineID=new_routine, title=activity['title'], image=activity['image'],
                                            photo=activity['photo'], color=activity['color'], weight=activity['weight'],
                                            timeGoal=activity['time']['goal'], timeMax=activity['time']['max'],
                                            timeMin=activity['time']['min'])
                    new_activity.save()
        return JsonResponse({'status': '200'})


@csrf_exempt
def remove_child(request):
    if request.method == 'DELETE':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        childID = int(body['childID'])
        child = Child.objects.filter(pk=childID)
        try:
            child.delete()
        except Exception:
            return JsonResponse({'status': '400'})
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
def add_activity(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        routine_id = int(body['routineID'])
        activity_routine = Routine.objects.get(pk=routine_id)
        activity_weight = Activity.objects.filter(routineID=routine_id).count() + 1
        new_activity = None
    
        if 'photo' in body and 'image' in body:
            new_activity = Activity(routineID=activity_routine, title=body['title'], image=body['image'],
                                    photo=body['photo'], color=body['color'], weight=activity_weight,
                                    timeGoal=int(body['timeGoal']), timeMax=int(body['timeMax']), timeMin=int(body['timeMin']))
        elif 'photo' in body:
            new_activity = Activity(routineID=activity_routine, title=body['title'], photo=body['photo'], color=body['color'],
                                    weight=activity_weight, timeGoal=int(body['timeGoal']), timeMax=int(body['timeMax']),
                                    timeMin=int(body['timeMin']))
        elif 'image' in body:
            new_activity = Activity(routineID=activity_routine, title=body['title'], image=body['image'], color=body['color'],
                                    weight=activity_weight, timeGoal=int(body['timeGoal']), timeMax=int(body['timeMax']),
                                    timeMin=int(body['timeMin']))
        else:
            new_activity = Activity(routineID=activity_routine, title=body['title'], color=body['color'],
                                    weight=activity_weight, timeGoal=int(body['timeGoal']), 
                                    timeMax=int(body['timeMax']), timeMin=int(body['timeMin']))

        if new_activity is not None:
            new_activity.save()
        else:   
            print("Was not saved")

    return JsonResponse({'status': '200'})

@csrf_exempt
def edit_routine(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        routineID = int(body['routineID'])
        routine_to_edit = Routine.objects.get(pk=routineID)
        routine_to_edit.title = body['title']
        routine_to_edit.color = body['color']
        # TODO: adicionar a edicao das fotos
        routine_to_edit.periodicity = body['periodicity']
        routine_to_edit.isWeeklyRepeatable = body['isWeeklyRepeatable'] == 'true'
        try:
            routine_to_edit.save()
        except Exception:
            return JsonResponse({'status': '400'})
    return JsonResponse({'status': '200'})

@csrf_exempt
def delete_routine(request):
    if request.method == 'DELETE':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        routineID = int(body['routineID'])
        routine_to_delete = Routine.objects.get(pk=routineID)
        try:
            routine_to_delete.delete()
        except Exception:
            return JsonResponse({'status': '400'})
    return JsonResponse({'status': '200'})


@csrf_exempt
def edit_activity(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        activityID = int(body['activityID'])
        routineID = int(body['routineID'])
        activity_routine = Routine.objects.get(pk=routineID)
        activity_to_edit = Activity.objects.get(pk=activityID)

        # if activity routine is changed, move lower weight activities up
        if activity_to_edit.routineID == routineID:
            activity_to_edit.weight = activity_to_edit.weight
        else:
            lowerActivities = Activity.objects.filter(routineID=activity_to_edit.routineID, weight__gt=activity_to_edit.weight)
            for activity in lowerActivities:
                activity.weight = activity.weight - 1
                activity.save()
            activity_to_edit.weight = Activity.objects.filter(routineID=routineID).count() + 1

        activity_to_edit.routineID = activity_routine
        activity_to_edit.title = body['title']
        activity_to_edit.color = body['color']
        # TODO: adicionar a edicao das fotos
        activity_to_edit.timeGoal = int(body['timeGoal'])
        activity_to_edit.timeMin = int(body['timeMin'])
        activity_to_edit.timeMax = int(body['timeMax'])
        try:
            activity_to_edit.save()
        except Exception:
            return JsonResponse({'status': '400'})
    return JsonResponse({'status': '200'})


@csrf_exempt
def delete_activity(request):
    if request.method == 'DELETE':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        activityID = int(body['activityID'])
        activity_to_delete = Activity.objects.get(pk=activityID)

        lowerActivities = Activity.objects.filter(routineID=activity_to_delete.routineID, weight__gt=activity_to_delete.weight)
        for activity in lowerActivities:
            activity.weight = activity.weight - 1
            activity.save()
        try:
            activity_to_delete.delete()
        except Exception:
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


@csrf_exempt
def handle_uploaded_file(f):
    with open('./server/static/assets/images/' + f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)


@csrf_exempt
def get_children(request):
    if request.method == 'GET':
        user = User.objects.get(username=request.GET.get('userEmail', ''))
        children = Child.objects.filter(userID=user.userinfo)
        dict_child_wrapper = []
        for child in children:
            dict_child_wrapper.append(
                {
                    "id": child.id,
                    "name": child.name,
                    "gender": child.gender,
                    "level": int(child.level),
                    "xp": int(child.xp),
                    "stars": int(child.stars),
                    "avatar": child.avatar,
                    "image": "http://" + settings.LOCALIP + ':8000/static/assets/images/' + child.image})
            response = json.dumps(dict_child_wrapper)
        return JsonResponse({'status': '200',
                             'response': response})

@csrf_exempt
def add_history(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        # loggedUser = User.objects.get(username=body['userEmail'])
        child = Child.objects.get(pk=body['id'])
        timestampReceived = str(body['timeStamp'])
        routine = Routine.objects.get(childID=child, title=body['routineTitle'])
        activity = Activity.objects.get(routineID = routine,title=body['activityTitle'])
        history = ActivityHistory(childID=child, activityID=activity, rewardGained=body['rewardGained'],
                   elapsedTime=body['elapsedTime'], timeStamp=timestampReceived)
        history.save()

def get_child_routines(request):
    if request.method == 'GET':
        child = Child.objects.get(pk=int(request.GET.get('selectedChildID', '')))
        child_routines = Routine.objects.filter(childID=child).order_by('weight')
        dict_routine_wrapper = []
        for routine in child_routines:
            routine_activities = Activity.objects.filter(routineID=routine).order_by('weight')
            dict_activity_wrapper = []
            for activity in routine_activities:
                dict_activity_wrapper.append(
                    {
                        "id": activity.id,
                        "title": activity.title,
                        "image": activity.image,
                        "photo": None if activity.photo == 'null' else "http://" + settings.LOCALIP + ':8000/static/assets/images/' + activity.photo,
                        "color": activity.color,
                        "weight": int(activity.weight),
                        "time": {
                            "goal": activity.timeGoal,
                            "max": activity.timeMax,
                            "min": activity.timeMin
                        }})
            dict_routine_wrapper.append(
                {
                    "id": routine.id,
                    "title": routine.title,
                    "image": routine.image,
                    "photo": None if routine.photo == 'null' else "http://" + settings.LOCALIP + ':8000/static/assets/images/' + routine.photo,
                    "color": routine.color,
                    "weight": int(routine.weight),
                    "periodicity": routine.periodicity,
                    "isRepeat": routine.isWeeklyRepeatable,
                    "activities": dict_activity_wrapper})
            response = json.dumps(dict_routine_wrapper)
        return JsonResponse({'status': '200',
                                'response': response})

@csrf_exempt
def switch_routine_weight(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        routine1 = Routine.objects.get(pk=body['firstRoutineID'])
        routine2 = Routine.objects.get(pk=body['secondRoutineID'])
        routine1_weight = int(routine1.weight)
        routine2_weight = int(routine2.weight)
        routine1.weight = int(routine2_weight)
        routine2.weight = int(routine1_weight)
        try:
            routine1.save()
            routine2.save()
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})

@csrf_exempt
def switch_activity_weight(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        activity1 = Activity.objects.get(pk=body['firstActivityID'])
        activity2 = Activity.objects.get(pk=body['secondActivityID'])
        activity1_weight = int(activity1.weight)
        activity2_weight = int(activity2.weight)
        activity1.weight = int(activity2_weight)
        activity2.weight = int(activity1_weight)
        try:
            activity1.save()
            activity2.save()
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})