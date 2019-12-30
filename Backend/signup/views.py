from django.shortcuts import render,redirect,HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from signup.models import UserData,CollegeData,DepartmentData,RoleData,ClgListView,DeptListView
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import auth,User
from django.utils import timezone
from django.core.mail import send_mail
import json
import jsonpickle

# Create your views here.        

def signupPage(request):
    data = json.loads(request.body)
    print(data)
    fullname = data['name']
    email = data['email']   
    mobile = data['mobile']
    clgName = data['clgName']
    roleId = data['role']
    deptId= data['deptId']        
    password = make_password(data['password'])
    print(clgName)
    #try:
    college = CollegeData.objects.get(clgName=clgName)
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
    #except:
     #   return HttpResponse('False')

    
def getClgList(request):
    Clgs = CollegeData.objects.all()
    ClgList = []
    for clg in Clgs:
        ClgList.append(ClgListView(clg.clgName,clg.city,clg.clgid))
    print(ClgList)    
    return HttpResponse(jsonpickle.encode(ClgList))


def getDeptList(request):
    Depts = DepartmentData.objects.all()
    DeptList = []

    for dept in Depts:
        DeptList.append(DeptListView(dept.deptid,dept.deptname))
    print(DeptList)
    return HttpResponse(jsonpickle.encode(DeptList))


    

        