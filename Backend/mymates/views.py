from django.shortcuts import render,redirect
from requests.models import  Relation
from signup.models import UserData
from django.http import HttpResponse
from django.core import serializers
import json
import jsonpickle


# Create your views here.

def displaymates(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser =  data['email']
    #loggedinuser = 'kartikdambre.160410116022@gmail.com'
    print(loggedinuser)
    result = []
    #loggedinuser = request.user.email
    mates = Relation.objects.filter(user_id=loggedinuser)
    for mate in mates:
        result.append(mate.getView()) 
    #result = serializers.serialize('json',mates)

    return HttpResponse(jsonpickle.encode(result))
