from django.shortcuts import render,redirect
from requests.models import  Relation
from signup.models import UserData
from django.http import HttpResponse


# Create your views here.

def displaymates(request):
    loggedinuser = request.user.email

    mates = Relation.objects.filter(user_id=loggedinuser)

    return render(request,'mates.html',{'result':mates})
