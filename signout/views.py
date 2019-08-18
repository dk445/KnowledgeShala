from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import auth,User

# Create your views here.

def signout(request):
    auth.logout(request)
    return redirect('/api/signin',{'message':'Signed out successfully'})
