from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Pet
from .serializers import PetLost,PetFound
# Create your views here.

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def petLost(request):
    data = request.data
    
    try:
        pet = Pet.objects.create(
            name = data["name"],
            date = data["date"],
            contact = data["contact"],
            place = data["place"],
            description = data["description"],
            img = request.FILES.get("img")
        )
        serializers = PetLost(pet, many=False)
        return Response(serializers.data)
    except:
        message = {"detail":"Something went Wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def petFound(request):
    data = request.data
    try:
        pet = Pet.objects.create(
            date = data["date"],
            contact = data["contact"],
            place = data["place"],
            description = data["description"],
            img = request.FILES.get("img")
        )
        serializers = PetFound(pet, many=False)
        return Response(serializers.data)
    except:
        message = {"detail":"Something went Wrong"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)