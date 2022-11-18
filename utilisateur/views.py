from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Utilisateur
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.contrib.auth.hashers import make_password


# Create your views here.
@csrf_exempt
def formUtilisateur(request):
    return render(request, 'contents/administrateur/Formulaire_ajout_admin.html', context=None)

@csrf_exempt
def AjouterUtilisateur(request): 
    if request.method =='POST': 
        email_utilisateur = request.POST.get('email_utilisateur')
        role_utilisateur = request.POST.get('role_utilisateur')
        motDePasse_utilisateur = make_password(request.POST.get('motDePasse_utilisateur'))
        Utilisateur.objects.create(email_utilisateur=email_utilisateur, role_utilisateur=role_utilisateur, motDePasse_utilisateur=motDePasse_utilisateur)
        return JsonResponse({'status': 1})
    else: return JsonResponse({'status': 0})

@csrf_exempt
def ListerAdministrateur(request):
    return render(request, 'contents/administrateur/Listage-administrateur.html', context=None)

@csrf_exempt
def ListerJsonAdministrateur(request): 
    administrateurs = Utilisateur.objects.all()
    data = serializers.serialize('json', list(administrateurs), fields=('id','email_utilisateur','role_utilisateur','motDePasse_utilisateur'))
    return JsonResponse(data, safe=False)

@csrf_exempt
def ModifierListeUtilisateur(request):
    if request.method=="POST":
        id = request.POST.get("id")
        data_bdd_modif = Utilisateur.objects.get(pk=id)
        data = {
            "id": data_bdd_modif.id,
            "email": data_bdd_modif.email_utilisateur,
            "role": data_bdd_modif. role_utilisateur,
            "mdp": data_bdd_modif.motDePasse_utilisateur,
        }
        return JsonResponse(data)
    else : return JsonResponse({'data':'erreur_chargement_donnees'})

@csrf_exempt
def ExecuterModification(request):
    if request.method=="POST":
        id = request.POST.get('id')
        email = request.POST.get('email')
        role = request.POST.get('role')
        mdp = make_password(request.POST.get('mdp'))
        Utilisateur.objects.filter(id=id).update(email_utilisateur=email,role_utilisateur=role, motDePasse_utilisateur=mdp)
        return JsonResponse({'status':1})
    else : return JsonResponse({'status':0})

@csrf_exempt   
def SupprimerUtilisateur(request): 
    if request.method=="POST": 
        id_suppr=request.POST.get('id')
        user_supprimer=Utilisateur.objects.get(pk=id_suppr)
        user_supprimer.delete()
        return JsonResponse({'status':1})
    else: return JsonResponse({'status':0})