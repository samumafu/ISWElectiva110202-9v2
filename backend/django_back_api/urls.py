from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('products.urls')),  # Bien hecho aquí
    path('api/', include('accounts.urls')),  # OK también
]
