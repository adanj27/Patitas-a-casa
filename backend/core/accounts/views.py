from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User
from .serializers import UserSerializerWithToken
# Create your views here.

## Funcion que sirve para hacer el login 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

## Esta funcion valida al usuario 
    def validate(self,attrs):
        data = super().validate(attrs)
## Una vez tenemos la data validada
## Pedidos que el serializer procese el usuario y nos devuelva el tolen
        serializers = UserSerializerWithToken(self.user).data

## Esta funcion es para que el serializer nos refresque el token y lo devuelva
        for token,user in serializers.items():
            data[token] = user
        
        return data
    
## Aqui llamamos al la funcion anterior, para llamar a esta clase como una VIEW
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

## Esta es la funcion para hacer register
## Creamos un usuario y generamos su token por medio del serializer
## Devolvemos el token automaticamente
## asi que podemos hacer login automatico
@api_view(["POST"])
def register(request):
    data = request.data
    print(data)
    try:
        user = User.objects.create(
            name=data["name"],
            email=data["email"],
            password=make_password(data["password"])
        )
        serializers = UserSerializerWithToken(user, many=False)
        return Response(serializers.data)
    except:
        message = {"detail":"Something went Wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    