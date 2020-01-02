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
    uniId = data['uniId']
    print(email)

    data=[]
    userPosts=[]
    userMates=False
    userRequests= False
    comingReq = False
    verified = False
    

    user = UserData.objects.get(email=email)
    try:
        loggedinUser = UserData.objects.get(uniId=uniId)
    except:
        loggedinUser = CollegeData.objects.get(uniId=uniId)

    if(user.isVerified == "Yes"):
        verified=True
    data.append(user.get_user_view())

    posts = UserPost.objects.filter(owner = email).order_by('createdon').reverse()
    if len(posts) > 0:
        for post in posts:
            userPosts.append(post.getView())
    if(email != loggedinUser.email):
        mates = Relation.objects.filter(user = email).filter(mate=loggedinUser.email)
        requests = Requests.objects.filter(requestReceiver = email).filter(requestMaker=loggedinUser.email).filter(statusid = '0')
        Req = Requests.objects.filter(requestReceiver = loggedinUser.email).filter(requestMaker=email).filter(statusid = '0')
        if len(requests)>0:
            userRequests = True
        if len(mates) > 0:
            userMates = True
        if len(Req) > 0:
            comingReq = True

    
    result = {
        'userdata':data,
        'userposts':userPosts,
        'userMates' : userMates,
        'userRequests' : userRequests,
        'comingReq': comingReq,
        'verified' : verified
    }
    
    print(result)
    return HttpResponse(jsonpickle.encode(result))