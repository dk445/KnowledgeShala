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
import json
# Create your views here.


def collegesignin(request):
    if request.user.is_authenticated:
        return redirect('/feed/')
    else:
        if request.method == 'GET':
            return render(request,'collegepage.html')

        else:
            email = request.POST['email']
            password = request.POST['password']
            college = CollegeData.objects.get(email=email)
            if(check_password(password,college.password)):
                print(college.clgid)
                return redirect('/college/'+college.clgid)
                #for req in requests:
                 #   print(req.name)
                
            else:
                return render(request,'collegepage.html')
                
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
            
        
            


