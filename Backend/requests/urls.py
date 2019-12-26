from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('makeReq',views.makeRequest),   
    path('displayReq',views.displayrequests) ,
    path('acceptReq', views.accept),
    path('cancelReq', views.cancelRequest),
    path('rejectReq' , views.rejectReq),
    path('reqCount',views.reqCount),
    path('college/auth',views.checkAdminPwd),
] 
