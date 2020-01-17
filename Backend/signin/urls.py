from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('signin/',views.signinPage),
    path('college/signin',views.collegesignin),
    path('signin/forgot',views.otpRequest),
    path('signin/forgot/reset',views.PwdReset),
    path('signin/forgot/verifyOtp',views.VerifyOtp)
]
