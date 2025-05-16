from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('', include('products.urls')),
]

# Al final añadimos esta ruta para servir el frontend React en cualquier ruta no capturada por Django
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
