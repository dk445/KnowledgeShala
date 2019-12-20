from django.shortcuts import render,redirect,HttpResponse
from signup.models import UserData
from django.contrib.postgres.operations import UnaccentExtension
from django.core import serializers
import json 
import jsonpickle

# Create your views here.

def search(request):
    data = json.loads(request.body.decode('utf-8'))
    print(data['search'])
    query = data['search']
    users= []
    
    try:
        result = UserData.objects.filter(name__unaccent__icontains = query).defer('name','email')
        #user = UserData.objects.get(email=email)
        for user in result:
            users.append(user.get_user_view())
    except:
        return HttpResponse('No users found')
    return HttpResponse(jsonpickle.encode(users))
        
