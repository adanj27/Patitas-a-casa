from rest_framework import serializers
from .models import *
## Serializer para que al hacer register y login nos devuelva los datos del usuario

class PetLost(serializers.ModelSerializer):
## Definimos de que clase queremos nuestros datos y que campos queremos que se envien al hacer la request
    class Meta:
        model = Pet
        fields = '__all__'

class PetFound(serializers.ModelSerializer):
## Definimos de que clase queremos nuestros datos y que campos queremos que se envien al hacer la request
    class Meta:
        model = Pet
        exclude = ("name",)
        

