from django.urls import path
from . import views
urlpatterns = [
    path('hti/', views.HtmlToImage.as_view()),
]