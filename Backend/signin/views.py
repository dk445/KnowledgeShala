from django.shortcuts import render,redirect,HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.template import RequestContext
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from django.contrib.auth.hashers import make_password, check_password
from posts.models import UserPost
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import auth,User
from django.http import HttpResponse
from django.core.mail import send_mail
import json , random , jsonpickle
# Create your views here.


def collegesignin(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['email']  
    password = data['password']
    print(email)
    print(password)
    try: 
        clg = CollegeData.objects.get(email=email)
        if check_password(password,clg.password) :
            
            if clg.isVerified == "No":
                print('not verified')
                #return HttpResponse('not verified')  //commenting for development purpose
                return HttpResponse('login success')  #this line should be remove
            
            print('login success')            
            return HttpResponse('login success')

        else:
            #return render(request,'signin.html',{'message':'Wrong credentials'}) 
            print('wrong pwd')   
            return HttpResponse('login failed')            
    except:
        #return render(request,'signin.html',{'message':'No such user found.'})
        print('(Exception) not found')
        return HttpResponse('login failed')


def otpRequest(request):
    data = json.loads(request.body.decode('utf-8'))
    email = data['email']
    otp = random.randint(10101010 , 98989898)
    otp = str(otp)

    send_mail(
            'Reset password request',
            'Your OTP for resetting the password is '+otp+'.Do not share it with others.',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
            )
    return HttpResponse(otp)

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
    

    #email = 'kartikdambre.160410116022@gmail.com'

    print(email)
    print(password)
    try: 
        user = UserData.objects.get(email=email)
        if check_password(password,user.password) :
            
            if user.isVerified == "No":
                auth.login(request,user)
                print('not verified')
                #return HttpResponse('not verified')  //commenting for development purpose
                return HttpResponse('login success')  #this line should be remove
            
            print('login success')
            
            return HttpResponse('login success')

        else:
            #return render(request,'signin.html',{'message':'Wrong credentials'}) 
            print('wrong pwd')   
            return HttpResponse('login failed')            
    except:
        #return render(request,'signin.html',{'message':'No such user found.'})
        print('(Exception) not found')
        return HttpResponse('login failed')
        
        
            
                

            
        
            # print(user)
            
        
            


