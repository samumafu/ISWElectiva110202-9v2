from django.test import TestCase
from django.core.exceptions import ValidationError
from django.utils.timezone import now, timedelta
from products.models import Product

class ProductModelTest(TestCase):
    def setUp(self):
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

    def test_valid_product_creation(self):
        product = Product(**self.valid_data)
        product.full_clean()
        product.save()
        self.assertEqual(str(product), "Laptop - ELEC123")

    def test_negative_sale_price_validation(self):
        product = Product(
            name="Camisa",
            category="Ropa",
            code="ROP001",
            purchase_price=30.00,
            sale_price=-50.00,
            stock_quantity=5
        )
        with self.assertRaises(ValidationError):
            product.full_clean()  # Usar full_clean para validar antes de guardar

    def test_clean_method_invalid_sale_price(self):
        data = self.valid_data.copy()
        data["sale_price"] = 800.00  # Precio de venta menor al de compra
        product = Product(**data)
        with self.assertRaises(ValidationError):
            product.full_clean()

    def test_clean_method_expired_product(self):
        data = self.valid_data.copy()
        data["expiration_date"] = now().date() - timedelta(days=1)  # Fecha de caducidad pasada
        product = Product(**data)
        with self.assertRaises(ValidationError):
            product.full_clean()
