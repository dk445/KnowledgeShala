from django.shortcuts import render ,redirect,HttpResponse
from signup.models import UserData ,CollegeData , DepartmentData , RoleData
from  posts.models import UserPost
from requests.models import Relation , Requests
from django.core import serializers

# Create your views here.

def profile(request,requestedemail):
    if not request.user.is_authenticated:
        return redirect('/api/signin/')
    else:
        result=[]
        try:
            data = UserData.objects.get(email = requestedemail)
            data_serializer = serializers.serialize('json',data)   
            result.append(data_serializer)

            posts = UserPost.objects.filter(owner = requestedemail)
            posts_serializer = serializers.serialize('json',posts)  
            result.append(posts_serializer) 

            mateList =  Relation.objects.filter(user = requestedemail)
            mateList_serializer = serializers.serialize('json',mateList) 
            result.append(mateList_serializer)  
        #except:
         #   return HttpResponse("error") 

            if(request.user.email == requestedemail):
                request_status = None
            else:
                request_status = (Requests.objects.get(requesting = request.user.email , requested = requestedemail)).statusid

            
            #print(request_status)
            #print(mateList[0].mate.name)
            #print(data.name)
            #print(data.isVerified)
            #print(data.roleid.rolename)
            #print(data.deptid.deptname)
            #print(posts)

            return HttpResponse(result)