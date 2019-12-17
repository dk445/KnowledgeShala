from django.shortcuts import render,redirect,HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import auth,User
from django.utils import timezone
from django.core.mail import send_mail
import json


# Create your views here.

def signupPage(request):
    data = json.loads(request.body)
    fullname = data['name']
    email = data['email']   
    mobile = data['mobile']
    clgId = data['clgId']
    roleId = data['role']
    deptId= data['deptId']        
    password = make_password(data['password'])
    try:
        college = CollegeData.objects.get(clgid=clgId)
        department = DepartmentData.objects.get(deptid=deptId)
        role = RoleData.objects.get(roleid = roleId)
        user = UserData.objects.create(name=fullname, email=email,password=password,mobile=mobile,clgid=college,deptid=department,roleid=role)
        
        #sending mail to user 
        send_mail(
            'Registered successfully',
            'Once your college verified your account you can access your account.',
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
    

    

        