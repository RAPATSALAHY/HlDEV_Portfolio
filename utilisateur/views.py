from django.shortcuts import render
from django.http import HttpResponse
from .models import Utilisateur


# Create your views here.
def index(request):
    utilisateurs =  Utilisateur.objects.all()
    # utilisateurs_email = [utilisateur.email_utilisateur for utilisateur in utilisateurs]
    # utilisateurs_email_name = ", ".join(utilisateurs_email)
    # return HttpResponse(utilisateurs_email_name)
    return render(request, 'contents/test/test.html', {'utilisateurs' : utilisateurs})
    #return render(request, 'utilisateur/index.html', {'utilisateurs' : utilisateurs})