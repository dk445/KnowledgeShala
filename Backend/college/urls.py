from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('college/requests',views.requeststocollege),
    path('signup/clg',views.CollegeSignup),
    path('college/accept',views.acceptrequest),
    path('college/reject',views.rejectrequest),
    path('college/remove',views.remove),
    path('college/list',views.List),
    path('college/logout',views.CollegeLogout),
    path('college/details',views.CollegeDetails),
    path('clg/reqCount',views.ReqCount),    
]
