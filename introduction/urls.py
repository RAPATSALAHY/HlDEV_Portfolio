from django.urls import path
from . import views

app_name = 'introduction'
urlpatterns = [
    path('Ajout', views.formulaireIntroduction, name="FormIntrod"),
]