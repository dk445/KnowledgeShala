from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('add/',views.addcollege),
    path('college/<id>',views.collegeFeed),
    path('college/<id>/requests',views.requeststocollege),
    path('college/<id>/requests/<email>/accept',views.acceptrequest),
    path('college/<id>/requests/<email>/reject',views.rejectrequest),
]
