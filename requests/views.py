from django.shortcuts import render,redirect
from requests.models import Requests
from signup.models import UserData
from django.http import HttpResponse

# Create your views here.
def accept(request,acceptingemail):
    loggedinuser = request.user.email
    requestObj = Requests.objects.get(requested=acceptingemail , requesting=loggedinuser) 
    print(requestObj)
    requestObj.statusid_id='1'
    print('accept')
    return redirect('/request')

    

def displayrequests(request):
    loggedinuser = request.user.email
    users = Requests.objects.filter(requesting=loggedinuser,statusid_id='0')
    return render(request,'request.html',{'result':users})

def makeRequest(request,requestedemail):
    if not request.user.is_authenticated:
        return redirect('/api/signin/')
    else:
        loggedinuser = request.user.email
        requestedemail = requestedemail
        statusid = '0'
        
        Requests.objects.create(requested=loggedinuser , requesting=requestedemail , statusid_id=statusid)
        
        return HttpResponse('<script>window.close()</script>')



