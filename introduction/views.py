from django.shortcuts import render

def formulaireIntroduction(request):
    return render(request, 'contents/introduction/Formulaire_ajout_intro.html', context=None)
