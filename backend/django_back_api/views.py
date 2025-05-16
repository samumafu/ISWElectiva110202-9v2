from django.views.generic import TemplateView
from django.views import View
from django.http import HttpResponse
import os

class FrontendAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(os.path.dirname(__file__), 'frontend_build', 'index.html')) as file:
                return HttpResponse(file.read())
        except FileNotFoundError:
            return HttpResponse(
                "El archivo index.html no fue encontrado. ¿Ejecutaste `npm run build` en el frontend?",
                status=501,
            )
