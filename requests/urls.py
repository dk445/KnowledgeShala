from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('<requestedemail>',views.makeRequest),   
    path('',views.displayrequests) ,
    path('accept/', views.accept),
] 
