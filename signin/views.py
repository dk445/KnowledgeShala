from django.shortcuts import render,redirect,render_to_response
from rest_framework.views import APIView
from rest_framework.response import Response
from django.template import RequestContext
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from django.contrib.auth.hashers import make_password, check_password
from posts.models import UserPost
from django.contrib.auth import authenticate,login
from django.contrib.auth.models import auth,User
from django.http import HttpResponse
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
                
                return redirect('/college/<email>')
                #for req in requests:
                 #   print(req.name)
                
            else:
                return render(request,'collegepage.html')
def signinPage(request):
    if request.user.is_authenticated:
        return redirect('/feed/')
    else:
        if request.method == 'GET':
            return render(request,'signin.html')

        else:
            emailId = request.POST['email']
            password = request.POST['password']
        #  role = request.POST['role']

            print(emailId)
            print(password)
        # print(role)
            # encr_password = make_password(password)
            try: 
                user = UserData.objects.get(email=emailId)            
            except:
                return render(request,'signin.html',{'message':'No such user found.'})
                print('(Exception) not found')
        
            if check_password(password,user.password):
                auth.login(request,user)
                #posts = UserPost()
                #posts = UserPost.objects.all()
                return redirect('/feed')
            else:
                return render(request,'signin.html',{'message':'Wrong credentials'}) 
                print('wrong pwd')   
                

            
        
            # print(user)
            
        
            


