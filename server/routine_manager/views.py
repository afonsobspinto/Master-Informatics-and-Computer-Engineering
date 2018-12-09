from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json


def index(request):
    return JsonResponse({'foo': 'bar'})


@csrf_exempt
def register(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        try:
            user = User.objects.create_user(email=body['email'], password=body['password'])
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})

