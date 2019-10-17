from django.shortcuts import render,redirect
from signup.models import CollegeData
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager

# Create your views here.
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
                CollegeData.objects.create(clgName = clgname , clgid = clgid , city = city , email=email)
                print('clg added')
                send_mail(
                    'College aded successfully',
                    'College login credentials are as follow-- username:kartik445 password:@123abc',
                    'kartik.dambre@gmail.com',
                    ['kartikdambre.160410116022@gmail.com'],
                    fail_silently=False,
                )
                print('mail sent')
                return render(request,'college.html',{'message':'Added successfully'})
            else:
                password = BaseUserManager().make_random_password()
                print(password)
                print('wrong pwd')
                return render(request,'college.html',{'message':'wrong password'})
        else:
            return render(request,'college.html')