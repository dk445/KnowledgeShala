from django.shortcuts import render ,redirect,HttpResponse
from signup.models import UserData ,CollegeData , DepartmentData , RoleData
from  posts.models import UserPost
from requests.models import Relation , Requests
from django.core import serializers
import json
import jsonpickle


# Create your views here.

def profile(request):
    data = json.loads(request.body.decode('utf-8'))
    email =  data['email']
    #print(email)

    data=[]
    userPosts=[]

    

    user = UserData.objects.get(email = email)
    data.append(user.get_user_view())

    posts = UserPost.objects.filter(owner = email).order_by('createdon').reverse()
    if len(posts) > 0:
        for post in posts:
            userPosts.append(post.getView())
        #result.append(userPosts)
        #data = jsonpickle.encode(result)
        #userPosts= jsonpickle.encode(userPosts)
    result = {
        'userdata':data,
        'userposts':userPosts
    }
    
    
    return HttpResponse(jsonpickle.encode(result))