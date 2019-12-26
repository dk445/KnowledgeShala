from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('',views.signupPage),
    path('get/clg',views.getClgList),
    path('get/dept',views.getDeptList)
]
