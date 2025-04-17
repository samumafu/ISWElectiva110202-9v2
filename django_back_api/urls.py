from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('products.urls')),  # Se quitó el prefijo "products/" para evitar URLs repetitivas
]
