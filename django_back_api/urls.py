from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),  # Aquí aseguramos que las URLs de la app 'accounts' están siendo incluidas
    path('', include('products.urls')),  # Esto debe ser para la app de productos
]
