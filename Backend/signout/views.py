from django.shortcuts import render,redirect,HttpResponse
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import auth,User
from signup.models import UserData
import json

# Create your views here.

def signout(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId'] 
    #print(email)
    loggedinuser = UserData.objects.get(uniId=uniId)

    try:
        loggedinuser.uniId = None
        loggedinuser.save()

        return HttpResponse(True)
    except:
        return HttpResponse(False)
    #return redirect('/api/signin',{'message':'Signed out successfully'})
