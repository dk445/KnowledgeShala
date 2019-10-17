from django.shortcuts import render ,redirect
from signup.models import UserData ,CollegeData , DepartmentData , RoleData
from  posts.models import UserPost
from requests.models import Relation , Requests

# Create your views here.

def profile(request,requestedemail):
    if not request.user.is_authenticated:
        return redirect('/api/signin/')
    else:
        data = UserData.objects.get(email = requestedemail)     
        posts = UserPost.objects.filter(owner = requestedemail) 
        mateList =  Relation.objects.filter(user = requestedemail)
        if(request.user.email == requestedemail):
            request_status = None
        else:
            request_status = (Requests.objects.get(requesting = request.user.email , requested = requestedemail)).statusid

        
        print(request_status)
        print(mateList[0].mate.name)
        print(data.name)
        print(data.isVerified)
        print(data.roleid.rolename)
        print(data.deptid.deptname)
        print(posts)

        return render(request,'account.html',{'accountinfo':data ,'userpost':posts,'matelist':mateList,'relation':request_status})