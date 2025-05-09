from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductView, inventory_report

router = DefaultRouter()
router.register(r'products', ProductView, basename='products')  # NO TOCAR ESTO

urlpatterns = [
    path('', include(router.urls)),  # NO TOCAR ESTO
    path('report/', inventory_report, name='inventory_report'),  # ✅ Esta ruta se quedará aquí
]
