from django.db import models


# Create your models here.
class Utilisateur(models.Model):
    email_utilisateur = models.CharField(max_length=150)
    role_utilisateur = models.CharField(max_length=150)
    motDePasse_utilisateur = models.CharField(max_length=150)

    def __str__(self):
        return self.email_utilisateur 