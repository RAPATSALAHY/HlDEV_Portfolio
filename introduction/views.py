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
        page, pagelimit, totalenregistrement = int(request.GET['page']), int(request.GET['pagelimit']), Introduction.objects.count()
        sautpage = ((page-1) * pagelimit)
        #Calcul le nombre totat de page
        quotientSansReste, QuotientavecReste = (totalenregistrement // pagelimit), (totalenregistrement // pagelimit) + 1
        NbreTotalpage = (QuotientavecReste, quotientSansReste)[totalenregistrement % pagelimit == 0]
        #creer un dictionnaire vide
        dictionnaire_introduction = {}
        #creer une liste vide
        liste_introduction = []
        for elem in Introduction.objects.raw("select * from introduction_introduction limit %s, %s", [sautpage, pagelimit]):
            #construire le dictionnaire
            dictionnaire_introduction = {
                "id": elem.id,
                "titreintroduction": elem.titreintroduction,
                "descriptionintroduction": elem.descriptionintroduction,
                #convert the object to a string directly before passing it for serialization using the str() function.
                "date": str(elem.date)
            }
            #Ajouter le dictionnaire dans une liste
            liste_introduction.append(dictionnaire_introduction)
        return JsonResponse(json.dumps([{"Data": liste_introduction}, {'TailleBdd': totalenregistrement, 'PageCourante':page,'NombreTotalPage': NbreTotalpage}]), safe=False)

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
