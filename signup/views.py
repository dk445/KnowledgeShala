from django.shortcuts import render,redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import auth,User
from django.utils import timezone
from django.core.mail import send_mail


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
        
        #sending mail to user 
        send_mail(
            'Registered successfully',
            'Once your college verified your account you can access your account.',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
            )
        print('mail sent')

        #sending request to college
        

        print('user created')
        return redirect('api/signin',{'message' : 'Registered successfully.'})
    else:
        print('called')
        return render(request,'index.html')


    

        