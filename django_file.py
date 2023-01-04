# create a new Django project
django-admin startproject budget_tracker

# navigate to the project directory
cd budget_tracker

# create a new Django app
python manage.py startapp transactions

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)

class Transaction(models.Model):
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    members = models.ManyToManyField(User)


from rest_framework import serializers
from .models import Transaction, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class TransactionSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    members = serializers.StringRelatedField(many=True)

    class Meta:
        model = Transaction
        fields = ('id', 'name', 'amount', 'date', 'category', 'members')

from rest_framework import viewsets
from .serializers import TransactionSerializer
from .models import Transaction

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

from rest_framework import routers
from .views import TransactionViewSet

router = routers.DefaultRouter()
router.register('transactions', TransactionViewSet)

from django.contrib import admin
from django.urls import include, path
from transactions import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

INSTALLED_APPS = [
    ...
    'rest_framework.authtoken',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ]
}

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
