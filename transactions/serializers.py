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
