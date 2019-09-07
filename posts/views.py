from django.shortcuts import render,redirect
from django.utils import timezone
from posts.models import UserPost
from signup.models import UserData
from requests.models import Relation


# Create your views here.

def makepost(request):
   # if not curent_user.is_authenticated:
    #    return redirect('/api/signin/')
   # else:

    desc = request.POST['desc']     
    owner = UserData.objects.get(email=request.user.email)
    created = timezone.localtime()
    UserPost.objects.create(owner=owner , description = desc , createdon = created)    
    print('posted')
    return redirect('/feed')

def displaypost(request):
 #   '''curent_user = request.user
  #  if request.user.is_authenticated:
   #     return redirect('/api/signin/')
    #else:'''
    loggedinuser = request.user.email
    mates = Relation.objects.filter(user = loggedinuser)
    filteredpost = set()
    posts = UserPost()
    for mate in mates:
        posts = UserPost.objects.filter(owner = mate.email).order_by('createdon').reverse()
        filteredpost.add(posts)
    return render(request,'feed.html',{'posts':filteredpost})