from django.shortcuts import render,redirect,HttpResponse
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password, check_password
from signup.models import UserData,CollegeData,DepartmentData,RoleData
from django.core import serializers
from django.core.mail import send_mail
import json
import jsonpickle

# Create your views here.

def ReqCount(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['email']
    clg=CollegeData.objects.get(email=loggedinuser)
    req = False
    users = UserData.objects.filter(clgid=clg.clgid).filter(isVerified="No")
    if(len(users)>0):
        print('true')
        req = True
    return HttpResponse(req)


def CollegeDetails(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['email']
    data=[]
    clg=CollegeData.objects.get(email=loggedinuser)
    data.append(clg.get_clg_view())
    
    return HttpResponse(jsonpickle.encode(data))
    


def CollegeSignup(request):
    data = json.loads(request.body)
    clgName = data['name']
    email = data['email']   
    mobile = data['mobile']
    clgId = data['clgId']
    city = data['city']        
    password = make_password(data['password'])
    print(data)
    try:
        college = CollegeData.objects.create(clgid=clgId , clgName=clgName , mobile=mobile , city=city, email=email , password=password)
        #sending mail to user 
        send_mail(
            'Registered successfully',
            'Now you can login and access your account.',
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


def acceptrequest(request):    
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['loggedUser']
    email = data['reqUser']
    
    try:
        user = UserData.objects.get(email=email)
        user.isVerified='Yes'
        user.save()
        
        send_mail(
            'Your request is granted by college authority',
            'You can now login with your id and password and experience the knowledge ride.',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
        )
        print('mail sent')
        return HttpResponse(True)
    except:
        return HttpResponse(False)


def rejectrequest(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['loggedUser']
    email = data['reqUser']
    try:
        UserData.objects.get(email=email).delete()
        send_mail(
            'Your request is deinied by college authority',
            'Contact college authority and try again by signing up',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
        )
        print('mail sent')
        return HttpResponse(True)
    except:
        return HttpResponse(False)


def remove(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['loggedUser']
    email = data['reqUser']
    try:
        user = UserData.objects.get(email=email)
        user.isVerified='No'
        user.save()
        send_mail(
            'Your account has been deactivated by college authority',
            'Contact college authority and try again by signing up',
            'kartik.dambre@gmail.com',
            [email],
            fail_silently=False,
        )
        print('mail sent')
        return HttpResponse(True)
    except:
        return HttpResponse(False)



def requeststocollege(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['email']
    clg=CollegeData.objects.get(email=loggedinuser)
    req = []
    users = UserData.objects.filter(clgid=clg.clgid).filter(isVerified="No")
    for user in users:
        req.append(user.get_user_view())
    print(req)
    return HttpResponse(jsonpickle.encode(req))


def List(request):
    data = json.loads(request.body.decode('utf-8'))
    loggedinuser = data['email']
    result = []

    clg =  CollegeData.objects.get(email=loggedinuser)
    id = clg.clgid
    users = UserData.objects.filter(clgid=id).filter(isVerified="Yes")
    for user in users:
        result.append(user.get_user_view())
    return HttpResponse(jsonpickle.encode(result))    





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


