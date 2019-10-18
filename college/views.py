from django.shortcuts import render,redirect
from signup.models import CollegeData
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password, check_password
from signup.models import UserData,CollegeData,DepartmentData,RoleData

# Create your views here.

def collegeFeed(request):
    college = CollegeData.objects.get(email=email)
    print(college.email)
    requests = UserData.objects.filter(isVerified = 'No') & UserData.objects.filter(clgid_id=college.clgid)
        #for req in requests:
        #   print(req.name)
        
def addcollege(request):
    if request.user.is_authenticated:
        return redirect('/feed/')
    else:
        if request.method=='POST':
            clgname = request.POST['collegename']
            clgid = request.POST['collegeid']
            city = request.POST['city']
            email = request.POST['email']
            password = request.POST['pwd']

            if password=='@123abc':
                password = BaseUserManager().make_random_password()
                print(password)
                clgpassword = make_password(password)
                CollegeData.objects.create(clgName = clgname , clgid = clgid , city = city , email=email,password=clgpassword)
                print('clg added')

                send_mail(
                    'College aded successfully',
                    'College login credentials are as follow\nusername: '+email+'\npassword: '+password+'\nLogin to your account to **link**',
                    'kartik.dambre@gmail.com',
                    [email],
                    fail_silently=False,
                )
                print('mail sent')
                return render(request,'college.html',{'message':'Added successfully'})
            else:               
                print('wrong pwd')
                return render(request,'college.html',{'message':'wrong password'})
        else:
            return render(request,'college.html')