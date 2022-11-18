from django.db import models

# Create your models here.
class Introduction(models.Model):
    titreintroduction = models.CharField(max_length=200, unique=False)
    descriptionintroduction = models.TextField(blank=True)
    date = models.DateField()
