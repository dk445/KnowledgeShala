from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('college/requests',views.requeststocollege),
    path('add/',views.addcollege),
    path('signup/clg',views.CollegeSignup),
    path('college/accept',views.acceptrequest),
    path('college/reject',views.rejectrequest),
    path('college/remove',views.remove),
    path('college/list',views.List),
    path('college/details',views.CollegeDetails),
    path('clg/reqCount',views.ReqCount),
    path('college/<id>',views.collegeFeed),  
    
]
