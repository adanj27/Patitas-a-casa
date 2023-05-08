from django.urls import path
from . import views
urlpatterns = [
    path("petLost/",views.petLost),
    path("petFound/",views.petFound)
]
