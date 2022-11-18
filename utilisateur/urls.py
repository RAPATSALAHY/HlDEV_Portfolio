from django.urls import path
from . import views

app_name='utilisateur'
urlpatterns = [
    path('formUtilisateur', views.formUtilisateur, name="formUtilisateur"),
    path('AjouterUtilisateur', views.AjouterUtilisateur, name="AjouterUtilisateur"),
    path('ListerAdministrateur', views.ListerAdministrateur, name="ListerAdministrateur"),
    path('ListerJsonAdministrateur', views.ListerJsonAdministrateur, name="ListerJsonAdministrateur"),
    path('ModifierListeUtilisateur', views.ModifierListeUtilisateur, name="ModifierListeUtilisateur"),
    path('ExecuterModification', views.ExecuterModification, name="ExecuterModification"),
    path('SupprimerUtilisateur', views.SupprimerUtilisateur, name="SupprimerUtilisateur"),
]
