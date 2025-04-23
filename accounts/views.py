from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()

# Vista para el registro de un nuevo usuario
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Vista para el login (token de acceso JWT)
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]  # Permite el acceso sin necesidad de autenticación
