from django.shortcuts import render,redirect,HttpResponse
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password, check_password
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from django.core import serializers
from django.core.mail import send_mail
import json
import jsonpickle

# Create your views here.

def CollegeLogout(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    try:
        clg = CollegeData.objects.get(uniId=uniId)
        clg.uniId = None
        clg.save()
        return HttpResponse(True)
    except:
        return HttpResponse(False)



def ReqCount(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']

    clg = CollegeData.objects.get(uniId=uniId)
    req = False
    users = UserData.objects.filter(clgid=clg.clgid).filter(isVerified="No")
    if(len(users)>0):
        print('true')
        req = True
    return HttpResponse(req)


def CollegeDetails(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    data=[]

    clg=CollegeData.objects.get(uniId=uniId)
    data.append(clg.get_clg_view())
    
    return HttpResponse(jsonpickle.encode(data))
    


def CollegeSignup(request):
    data = json.loads(request.body)
    clgName = data['name']
    email = data['email']   
    mobile = data['mobile']
    clgId = data['clgId']
    city = data['city']        
    password = make_password(data['password'])
    print(data)
    try:
        college = CollegeData.objects.create(clgid=clgId , clgName=clgName , mobile=mobile , city=city, email=email , password=password)
        #sending mail to user 
        send_mail(
            'Registered successfully',
            'Now you can login and access your account.',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
            )
        print('mail sent')
        print('user created')
        return HttpResponse('True')
        #return redirect('api/signin',{'message' : 'Registered successfully.'})
    except:
        return HttpResponse('False')


def acceptrequest(request):    
    data = json.loads(request.body.decode('utf-8'))
    email = data['reqUser']    
    try:
        user = UserData.objects.get(email=email)
        user.isVerified='Yes'
        user.save()        
        send_mail(
            'Your request is granted by college authority',
            'You can now login with your id and password and experience the knowledge ride.',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
        )
        print('mail sent')
        return HttpResponse(True)
    except:
        return HttpResponse(False)



def rejectrequest(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['reqUser']
    try:
        UserData.objects.get(email=email).delete()
        send_mail(
            'Your request is deinied by college authority',
            'Contact college authority and try again by signing up',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
        )
        print('mail sent')
        return HttpResponse(True)
    except:
        return HttpResponse(False)



def remove(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['reqUser']
    try:
        user = UserData.objects.get(email=email)
        user.isVerified='No'
        user.save()
        send_mail(
            'Your account has been deactivated by college authority',
            'Contact college authority and try again by signing up',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
        )
        print('mail sent')
        return HttpResponse(True)
    except:
        return HttpResponse(False)



def requeststocollege(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    clg=CollegeData.objects.get(uniId=uniId)
    req = []
    users = UserData.objects.filter(clgid=clg.clgid).filter(isVerified="No")
    for user in users:
        req.append(user.get_user_view())
    print(req)
    return HttpResponse(jsonpickle.encode(req))



def List(request):
    data = json.loads(request.body.decode('utf-8'))
    uniId = data['uniId']
    result = []

    clg =  CollegeData.objects.get(uniId=uniId)
    id = clg.clgid
    users = UserData.objects.filter(clgid=id).filter(isVerified="Yes")
    for user in users:
        result.append(user.get_user_view())
    return HttpResponse(jsonpickle.encode(result))    





