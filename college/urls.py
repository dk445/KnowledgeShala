from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('add/',views.addcollege),
    path('college/<password>',views.collegeFeed)
]
