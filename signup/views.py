from django.shortcuts import render,redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import auth,User
from django.utils import timezone

# Create your views here.

def signupPage(request):
    if request.method=='POST':
        fullname = request.POST['name']
       # lastname = request.POST.get('lastname')
        email = request.POST['email']   
        mobile = request.POST['mobile']
        clgId = request.POST['clgId']
        roleId = request.POST['role']
        deptId= request.POST['deptId']
        clgId = request.POST['clgId']

        password = make_password(request.POST['pass'])
        college = CollegeData.objects.get(clgid=clgId)
        department = DepartmentData.objects.get(deptid=deptId)
        role = RoleData.objects.get(roleid = roleId)
        user = UserData.objects.create(name=fullname, email=email,password=password,mobile=mobile,clgid=college,deptid=department,roleid=role)
       # try:
          

       # except:
        #  return render(request,'index.html',{'message':'Error while signup. Try again'})'''
        print('user created')
        return render(request,'signin.html',{'message' : 'Registered successfully.'})
    else:
        print('called')
        return render(request,'index.html')

def get(self, request, format=None):
    pass
def post(self,request):
    pass
    

        