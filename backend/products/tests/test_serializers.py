from rest_framework.exceptions import ValidationError
from rest_framework import serializers
from django.test import TestCase
from django.utils.timezone import now, timedelta
from products.models import Product
from products.serializers import ProductSerializer

class ProductSerializerTest(TestCase):
    def setUp(self):
        # Datos válidos para crear un producto
        self.valid_data = {
            "name": "Laptop",
            "category": "Electrónica",
            "code": "ELEC123",
            "purchase_price": 1000.00,
            "sale_price": 1200.00,
            "stock_quantity": 10,
            "entry_date": now().date(),
            "expiration_date": now().date() + timedelta(days=30)
        }

    def test_valid_serializer(self):
        # Verificamos si el serializer puede serializar los datos correctamente
        serializer = ProductSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        product = serializer.save()
        self.assertEqual(str(product), "Laptop - ELEC123")

    def test_invalid_sale_price(self):
        # Verificamos si el precio de venta es menor o igual al de compra
        data = self.valid_data.copy()
        data["sale_price"] = 800.00  # Precio de venta menor que el de compra
        serializer = ProductSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("sale_price", serializer.errors)

    def test_invalid_expiration_date(self):
        # Verificamos si la fecha de caducidad es válida (posterior a hoy)
        data = self.valid_data.copy()
        data["expiration_date"] = now().date() - timedelta(days=1)  # Fecha de caducidad pasada
        serializer = ProductSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("expiration_date", serializer.errors)

    def test_expiration_date_is_optional(self):
        # Verificamos que no es obligatorio tener fecha de caducidad
        data = self.valid_data.copy()
        data["expiration_date"] = None  # Sin fecha de caducidad
        serializer = ProductSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_missing_required_fields(self):
        # Verificamos si se lanza un error cuando faltan campos requeridos
        data = self.valid_data.copy()
        del data["name"]  # Eliminamos un campo obligatorio
        serializer = ProductSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)
