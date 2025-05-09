from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@api_view(['GET'])
def inventory_report(request):
    # ✅ Vamos a construir un JSON como este:
    # [
    #   { category: "Alimentos", stock_quantity: 150, total_sales: 2000.00 },
    #   ...
    # ]
    data = Product.objects.values('category').annotate(
        stock_quantity=Sum('stock_quantity'),
        total_sales=Sum('sale_price')  # Solo cuenta si cada producto se vendió al menos una vez
    )
    return Response(data)
