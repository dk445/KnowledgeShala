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
    uniId = data['uniId']
    email = data['reqUser']

    loggedinuser = UserData.objects.get(uniId=uniId)

    try:    
        (Requests.objects.filter(requestMaker_id=email).filter(requestReceiver_id=loggedinuser.email)).delete()     
        print('reject')
        return HttpResponse('success')
    except:
        return HttpResponse('failed')    


def reqCount(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    
    loggedinuser = UserData.objects.get(uniId=uniId)

    req = False
    users = Requests.objects.filter(requestReceiver_id=loggedinuser.email).filter(statusid_id='0')
    if(len(users)>0):
        print('true')
        req = True
    return HttpResponse(req)



def accept(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    email = data['reqUser']

    loggedinuser = UserData.objects.get(uniId=uniId)

    #try:    
    (Requests.objects.filter(requestMaker_id=email).filter(requestReceiver_id=loggedinuser.email)).update(statusid_id='1')        
    Relation.objects.create(user_id = loggedinuser.email , mate_id = email)
    Relation.objects.create(mate_id = loggedinuser.email , user_id = email)        
    print('accept')
    return HttpResponse('success')
    #except:
     #   return HttpResponse('failed')    

    

def displayrequests(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    req = []

    loggedinuser = UserData.objects.get(uniId=uniId)
    
    users = Requests.objects.filter(requestReceiver_id=loggedinuser.email).filter(statusid_id='0')
    for user in users:
        req.append(user.requestMaker.get_user_view())

    return HttpResponse(jsonpickle.encode(req))
    
    

def makeRequest(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    email = data['reqUser']
    statusid = '0'
    
    loggedinuser = UserData.objects.get(uniId=uniId)

    #try:
    Requests.objects.create(requestMaker_id=loggedinuser.email , requestReceiver_id=email , statusid_id=statusid)
    return HttpResponse('success')
  #  except:
   #     return HttpResponse('failed')
    



def cancelRequest(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    email = data['reqUser']

    loggedinuser = UserData.objects.get(uniId=uniId)

    try:
        (Requests.objects.filter(requestMaker_id = loggedinuser.email).filter(requestReceiver_id=email)).delete()
        return HttpResponse('success')
    except:
        return HttpResponse('failed')
     

def checkAdminPwd(request):
    print(request.body.decode('utf-8'))
    data = json.loads(request.body.decode('utf-8'))    
    pwd = data['adminPassword']
    print(pwd)
    if(pwd=="11221133"):
        return HttpResponse(True)
    else:
        return HttpResponse(False)