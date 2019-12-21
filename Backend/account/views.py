from django.shortcuts import render ,redirect,HttpResponse
from signup.models import UserData ,CollegeData , DepartmentData , RoleData
from  posts.models import UserPost
from requests.models import Relation , Requests , MatesView
from django.core import serializers
import json
import jsonpickle


# Create your views here.

def profile(request):
    data = json.loads(request.body.decode('utf-8'))
    email =  data['email']
    print(email)

    data=[]
    userPosts=[]
    userMates=[]
    userRequests=[]

    

    user = UserData.objects.get(email=email)
    data.append(user.get_user_view())

    posts = UserPost.objects.filter(owner = email).order_by('createdon').reverse()
    if len(posts) > 0:
        for post in posts:
            userPosts.append(post.getView())
    
    mates = Relation.objects.filter(user = email)
    if len(mates) > 0:
        for mate in mates:
            userMates.append(mate.getView())

    requests = Requests.objects.filter(requestMaker = email).filter(statusid = '0')
    if len(requests)>0:
        for request in  requests:
            userRequests.append(request.requestReceiver)

    print(userRequests)
    result = {
        'userdata':data,
        'userposts':userPosts,
        'userMates' : userMates,
        'userRequests' : userRequests
    }
    
    
    return HttpResponse(jsonpickle.encode(result))