from django.urls import path
from . import views

app_name = 'introduction'
urlpatterns = [
    path('Ajout', views.AjouterIntroduction, name="FormIntrod"),
    path('ExecuterAjout', views.ExecuterFormIntrod, name="ExecuterFormIntrod"),
    path('listeIntro', views.ListerIntroduction, name="ListerIntroduction"),
    path('ListeJsonIntro', views.ListerJsonIntroduction, name="ListerJsonIntroduction"),
    path('SupprIntro', views.SupprimerIntroduction, name="SupprimerIntroduction"),
    path('ModifierIntro', views.ModifierIntroduction, name="ModifierIntroduction"),
    path('ExecuterModifIntro', views.ExecuterModificationIntroduction, name="ExecuterModificationIntroduction"),
]