from django.http import JsonResponse
from routine_manager.models import Parent
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password


def index(request):
    return JsonResponse({'foo': 'bar'})


@csrf_exempt
def register(request):
    if request.method == 'POST':
        parent = Parent(email=request.POST['email'], password=make_password(request.POST['password']))
        try:
            parent.save()
        except Exception:
            return JsonResponse({'status': '400'})
        return JsonResponse({'status': '200'})

