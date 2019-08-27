from django.shortcuts import render,redirect
from signup.models import CollegeData

# Create your views here.
def addcollege(request):
    if request.method=='POST':
        clgname = request.POST['collegename']
        clgid = request.POST['collegeid']
        city = request.POST['city']
        email = request.POST['email']
        password = request.POST['pwd']

        if password=='@123abc':
            CollegeData.objects.create(clgName = clgname , clgid = clgid , city = city , email=email)
            print('clg added')
            return render(request,'college.html',{'message':'Added successfully'})
        else:
            print('wrong pwd')
            return render(request,'college.html',{'message':'wrong password'})
    else:
        return render(request,'college.html')