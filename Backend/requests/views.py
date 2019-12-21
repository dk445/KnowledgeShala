from django.shortcuts import render,redirect
from requests.models import Requests , Relation
from signup.models import UserData
from django.http import HttpResponse
from django.core import serializers


# Create your views here.
def accept(request,acceptingemail):
    loggedinuser = request.user.email
    Requests.objects.filter(requested_id=acceptingemail , requesting_id=loggedinuser).update(statusid_id='1') 
    
    Relation.objects.create(user_id = loggedinuser , mate_id = acceptingemail)
    Relation.objects.create(mate_id = loggedinuser , user_id = acceptingemail)
    
    #print(requestObj)
    #requestObj.statusid_id='1'
    print('accept')
    #return redirect('/request')

    

def displayrequests(request):
    loggedinuser = request.user.email
    users = Requests.objects.filter(requestMaker=loggedinuser,statusid_id='0')
    result = serializers.serialize('json',users)
    return HttpResponse(result)
    
    

def makeRequest(request,requestedemail):
    if not request.user.is_authenticated:
        return redirect('/api/signin/')
    else:
        loggedinuser = request.user.email
        #requestedemail = requestedemail
        statusid = '0'
        
        Requests.objects.create(requestMaker_id=loggedinuser , requestReceiver_id=requestedemail , statusid_id=statusid)
        
        return HttpResponse('<script>window.close()</script>')



