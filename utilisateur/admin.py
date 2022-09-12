from django.contrib import admin
from .models import Utilisateur


class UtilisateurAdmin(admin.ModelAdmin):
    list_display = ["email_utilisateur", "role_utilisateur", "motDePasse_utilisateur"]
    search_fields = ["email_utilisateur", "role_utilisateur", "motDePasse_utilisateur"]

# Register your models here.
admin.site.register(Utilisateur, UtilisateurAdmin)