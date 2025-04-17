from rest_framework import serializers
from .models import Product
from django.utils.timezone import now

class ProductSerializer(serializers.ModelSerializer):
    def validate(self, data):
        if data.get("sale_price") <= data.get("purchase_price"):
            raise serializers.ValidationError({"sale_price": "El precio de venta debe ser mayor al de compra."})
        if data.get("expiration_date") and data["expiration_date"] <= now().date():
            raise serializers.ValidationError({"expiration_date": "La fecha debe ser futura."})
        return data

    class Meta:
        model = Product
        fields = '__all__'
