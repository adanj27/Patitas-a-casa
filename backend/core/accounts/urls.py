from django.urls import path, include
from . import views
urlpatterns = [
    path("login/", views.MyTokenObtainPairView.as_view()),
    path('register/', views.register),
]
