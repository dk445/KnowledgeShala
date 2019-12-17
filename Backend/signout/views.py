from django.shortcuts import render,redirect,HttpResponse
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import auth,User
import json

# Create your views here.

def signout(request):
    data = json.loads(request.body.decode('utf-8'))
    #email = data['email'] 
    #print(email)
    auth.logout(request)
    return HttpResponse('logout success')
    #return redirect('/api/signin',{'message':'Signed out successfully'})
