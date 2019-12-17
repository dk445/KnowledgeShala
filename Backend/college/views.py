from django.shortcuts import render,redirect,HttpResponse
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password, check_password
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from django.core import serializers

# Create your views here.

def acceptrequest(request,id,email):    
    UserData.object.get(email=email).update(isVerified='Yes')
    send_mail(
        'Your request is granted by college authority',
        'You can now login with your id and password and experience the knowledge ride.'
        'kartik.dambre@gmail.com',
        [email],
        fail_silently=False,
    )
    print('mail sent')
    return redirect('college/'+id+'/requests')


def rejectrequest(request,id,email):
    UserData.object.get(email=email).delete()
    send_mail(
        'Your request is deinied by college authority',
        'Contact college authority and try again.'
        'kartik.dambre@gmail.com',
        [email],
        fail_silently=False,
    )
    print('mail sent')


def requeststocollege(request,id):
    #college = CollegeData.objects.get(clgid=id)
    #print(college.email)
    requests = UserData.objects.filter(clgid_id=id , isVerified='No')
    result = serializers.serialize('json',requests)
    #print(result)
    return HttpResponse(result)



def collegeFeed(request,id):
    #college = CollegeData.objects.get(clgid=id)
    #print(college.email)

    #requests = UserData.objects.filter(isVerified = 'No') & UserData.objects.filter(clgid_id=college.clgid)
    collegeusers = UserData.objects.filter(clgid_id=id)
    result = serializers.serialize('json',collegeusers)
   # for req in collegeusers:
    #    if(req.isVerified=='No'):
     #       print(req.name)
    

    #request can be separate where isVerified==NO
    return HttpResponse(result)


def addcollege(request):
    if request.user.is_authenticated:
        return redirect('/feed')
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
                #return render(request,'college.html',{'message':'Added successfully'})
            else:               
                print('wrong pwd')
                #return render(request,'college.html',{'message':'wrong password'})
        else:
            return render(request,'college.html')