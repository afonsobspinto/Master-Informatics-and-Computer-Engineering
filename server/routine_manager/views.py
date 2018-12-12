import json
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Child, UserInfo
from django.conf import settings


def index(request):
    return JsonResponse({'foo': 'bar'})

#TODO: try and catch
@csrf_exempt
def register(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        User.objects.create_user(username=body['email'], email=body['email'], password=body['password'])
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
            dict_child_wrapper.append({"name": child.name, "image": "http://" + settings.LOCALIP + ':8000/static/assets/images/' + child.image})
        response = json.dumps(dict_child_wrapper)
        return JsonResponse({'status': '200',
                             'response': response})
