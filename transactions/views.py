from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import TransactionSerializer
from .models import Transaction

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

