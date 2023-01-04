from django.db import models
from django.contrib.auth.models import User

class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField()

    class Meta:
        app_label='apfelschuss.votes'

    def __str__(self):
        return self.user.username

class Category(models.Model):
    name = models.CharField(max_length=50)

class Transaction(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    members = models.ManyToManyField(User)
