from django.db import models
from django.core.exceptions import ValidationError
from django.utils.timezone import now

def validate_sale_price(value):
    if value < 0:
        raise ValidationError("El precio de venta no puede ser negativo.")

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Alimentos', 'Alimentos'),
        ('Electrónica', 'Electrónica'),
        ('Ropa', 'Ropa'),
        ('Hogar', 'Hogar'),
        ('Otro', 'Otro'),
    ]

    name = models.CharField(max_length=255, unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    code = models.CharField(max_length=50, unique=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[validate_sale_price])
    stock_quantity = models.PositiveIntegerField()
    entry_date = models.DateField(default=now)
    expiration_date = models.DateField(null=True, blank=True)

    def clean(self):
        if self.sale_price <= self.purchase_price:
            raise ValidationError("El precio de venta debe ser mayor que el de compra.")
        if self.expiration_date and self.expiration_date <= now().date():
            raise ValidationError("La fecha de caducidad debe ser posterior a hoy.")

    def __str__(self):
        return f"{self.name} - {self.code}"
