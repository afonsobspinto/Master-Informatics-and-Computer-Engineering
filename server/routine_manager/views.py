from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User


def index(request):
    return JsonResponse({'foo': 'bar'})


@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            user = User.objects.create_user(email='lennon@thebeatles.com', password='johnpassword')
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})

