from django.shortcuts import render,redirect
from requests.models import Requests , Relation
from signup.models import UserData
from django.http import HttpResponse
from django.core import serializers
import json
import jsonpickle


# Create your views here.

def rejectReq(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['loggedUser']
    email = data['reqUser']

    try:    
        (Requests.objects.filter(requestMaker_id=email).filter(requestReceiver_id=loggedinuser)).delete()     
        print('reject')
        return HttpResponse('success')
    except:
        return HttpResponse('failed')    


def reqCount(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['email']
    req = False
    users = Requests.objects.filter(requestReceiver_id=loggedinuser).filter(statusid_id='0')
    if(len(users)>0):
        print('true')
        req = True
    return HttpResponse(req)



def accept(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['loggedUser']
    email = data['reqUser']

    #try:    
    (Requests.objects.filter(requestMaker_id=email).filter(requestReceiver_id=loggedinuser)).update(statusid_id='1')        
    Relation.objects.create(user_id = loggedinuser , mate_id = email)
    Relation.objects.create(mate_id = loggedinuser , user_id = email)        
    print('accept')
    return HttpResponse('success')
    #except:
     #   return HttpResponse('failed')    

    

def displayrequests(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['email']
    req = []
    
    users = Requests.objects.filter(requestReceiver_id=loggedinuser).filter(statusid_id='0')
    for user in users:
        req.append(user.requestMaker.get_user_view())

    return HttpResponse(jsonpickle.encode(req))
    
    

def makeRequest(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['loggedUser']
    email = data['reqUser']
    statusid = '0'
    
    #try:
    Requests.objects.create(requestMaker_id=loggedinuser , requestReceiver_id=email , statusid_id=statusid)
    return HttpResponse('success')
  #  except:
   #     return HttpResponse('failed')
    



def cancelRequest(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['loggedUser']
    email = data['reqUser']

    try:
        (Requests.objects.filter(requestMaker_id = loggedinuser).filter(requestReceiver_id=email)).delete()
        return HttpResponse('success')
    except:
        return HttpResponse('failed')
     