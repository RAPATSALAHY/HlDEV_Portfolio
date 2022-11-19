from django.shortcuts import render
from .models import Introduction
from django.http import HttpResponse, JsonResponse
from django.db.models.expressions import RawSQL
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json

@csrf_exempt
def AjouterIntroduction(request):
    return render(request, 'contents/introduction/Formulaire_ajout_intro.html', context=None)

@csrf_exempt
def ExecuterFormIntrod(request):
    if request.method == 'POST':
        titre = request.POST.get('titre')
        description = request.POST.get('description')
        date = request.POST.get('datepicker')
        Introduction.objects.create(titreintroduction=titre, descriptionintroduction=description, date=date)
        return JsonResponse({'status':1})
    else: return JsonResponse({'status':0}) 

@csrf_exempt
def ListerIntroduction(request):
    intro_liste = Introduction.objects.all()
    return render(request,'contents/introduction/Listage.html', {'intro': intro_liste})

@csrf_exempt
def ListerJsonIntroduction(request):
        introductions= Introduction.objects.all()
        data = serializers.serialize('json', list(introductions),fields=('id','titreintroduction','descriptionintroduction','date'))
        return JsonResponse(data, safe=False)

@csrf_exempt
def SupprimerIntroduction(request):
    if request.method == "POST":
        id = request.POST.get('id')
        data_bdd_suppr = Introduction.objects.get(pk=id)
        data_bdd_suppr.delete()
        return JsonResponse({'status': 1})
    else:
        return JsonResponse({'status': 0})

@csrf_exempt
def ModifierIntroduction(request):
    if request.method== "POST":
        id=request.POST.get('id')
        data_bdd_modif=Introduction.objects.get(pk=id)
        data_json = { "id" : data_bdd_modif.id, 
                "titreintroduction": data_bdd_modif.titreintroduction, 
                "descriptionintroduction" : data_bdd_modif.descriptionintroduction,
                "date": data_bdd_modif.date
                }
        return JsonResponse(data_json)
    else: return JsonResponse({'data':'erreur_chargement_donnees'})       

@csrf_exempt
def ExecuterModificationIntroduction(request):
    if request.method == "POST":
        id = request.POST.get('id')
        titre = request.POST.get('titre')
        descriptionIntroduction= request.POST.get('descriptionintroduction')
        date = request.POST.get('date')
        Introduction.objects.filter(id=id).update(titreintroduction=titre, descriptionintroduction=descriptionIntroduction, date=date)
        return JsonResponse({'status': 1})
    else: 
        return JsonResponse({'status': 0})
