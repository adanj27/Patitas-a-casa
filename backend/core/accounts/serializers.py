from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

## Serializer para que al hacer register y login nos devuelva los datos del usuario
class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)

## Definimos de que clase queremos nuestros datos y que campos queremos que se envien al hacer la request
    class Meta:
        model = User
        fields = ["id", "name", "age",
                  "email", "token", "bio", "image"]
## Funcion que nos devuelve el token para el usuario que estamos pidiendo 
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)