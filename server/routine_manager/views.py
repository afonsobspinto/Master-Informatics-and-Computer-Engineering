from django.http import HttpResponse
from routine_manager.models import User


def index(request):
    return HttpResponse("Hello, world. You're at the routine-manager index!")


def register(request):
    if request.method == 'POST':
        user = User(email=request.POST['name'], password=make_password(request.POST['password']))
        try:
            user.save()
        except Exception:
            return HttpResponse(status=400)
        return HttpResponse(status=200)

