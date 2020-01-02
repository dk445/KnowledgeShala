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
    uniId =  data['uniId']
    #loggedinuser = 'kartikdambre.160410116022@gmail.com'
    print(uniId)
    result = []
    #loggedinuser = request.user.email

    loggedinUser = UserData.objects.get(uniId=uniId)
    mates = Relation.objects.filter(user_id=loggedinUser.email)
    for mate in mates:
        result.append(mate.getView()) 
    #result = serializers.serialize('json',mates)

    return HttpResponse(jsonpickle.encode(result))

def deleteMate(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId =  data['uniId']
    mateEmail = data['reqUser']
    loggedinUser = UserData.objects.get(uniId=uniId)
    try:
        Relation.objects.filter(user=loggedinUser.email).filter(mate=mateEmail).delete()
        Relation.objects.filter(user=mateEmail).filter(mate=loggedinUser.email).delete()
        return HttpResponse('success')
    except:
        return HttpResponse('failed')

