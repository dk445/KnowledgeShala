from django.shortcuts import render,redirect,HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.template import RequestContext
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from signin.models import UserOtp
from django.contrib.auth.hashers import make_password, check_password
from posts.models import UserPost
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import auth,User
from django.http import HttpResponse
from django.core.mail import send_mail
import json , random , jsonpickle
from django.utils.crypto import get_random_string
# Create your views here.


def collegesignin(request):
    data = json.loads(request.body.decode('utf-8'))
    print(data)
    email = data['email']  
    password = data['password']
    res = False
    uniId = get_random_string(length=32)
    print(uniId)
    print(email)
    print(password)

    try:
        clg = CollegeData.objects.get(email=email)
        if check_password(password,clg.password) :
            print('login success')       
            clg.uniId = uniId
            clg.save()
            res=True
            return HttpResponse(uniId)
        else:
            return HttpResponse(res)            
    except:
        return HttpResponse(res)


def otpRequest(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['email']
    otp = random.randint(10101010 , 98989898)
    otp = str(otp)
    try:
        user = UserData.objects.get(email=email)
        UserOtp.objects.filter(user=user).delete()
        OTP = UserOtp(user = user,otp=otp)
        OTP.save()
        send_mail(
            'Reset password request',
            'Your OTP for resetting the password is '+otp+'.Do not share it with others.',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
            )
        return HttpResponse(True)
    except:
        return HttpResponse(False)


def VerifyOtp(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['email']
    otp = data['otp']
    user = UserOtp.objects.get(user=UserData.objects.get(email=email))
    if(otp==user.otp):
        user.delete()
        return HttpResponse(True)
    else:
        return HttpResponse(False)


def PwdReset(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['email']


    password = data['password']
    password = make_password(password)

    user = UserData.objects.get(email=email)
    user.password = password
    user.save()

    return HttpResponse('Reset Successfully')
    

                
def signinPage(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['email']  
    password = data['password']
    
    print(email)
    print(password)
    
    try: 
        user = UserData.objects.get(email=email)
        if check_password(password,user.password) :
            
            if user.isVerified == "No":
                auth.login(request,user)
                print('not verified')
                return HttpResponse('not verified')  #commenting for development purpose
                # return HttpResponse(uniId)  #this line should be remove
            
            print('login success')
            uniId = get_random_string(length=32)
            user.uniId = uniId
            user.save()
            print(uniId)
            return HttpResponse(uniId)

        else:
            #return render(request,'signin.html',{'message':'Wrong credentials'}) 
            print('wrong pwd')   
            return HttpResponse('login failed')            
    except:
        #return render(request,'signin.html',{'message':'No such user found.'})
        print('(Exception) not found')
        return HttpResponse('login failed')
        
        
            
                

            
        
            # print(user)
            
        
            


