import json
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Child, UserInfo, Settings, Routine


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
