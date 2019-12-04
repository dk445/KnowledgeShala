from django.shortcuts import render,redirect,HttpResponse
from django.utils import timezone
from posts.models import UserPost
from signup.models import UserData
from requests.models import Relation
from django.core import serializers
from django.http import JsonResponse



# Create your views here.

def makepost(request):
    if not request.user.is_authenticated:
        return redirect('/api/signin/')
    else:
        desc = request.POST['desc']     
        owner = UserData.objects.get(email=request.user.email)
        created = timezone.localtime()
        UserPost.objects.create(owner=owner , description = desc , createdon = created)    
        print('posted')
        return redirect('/feed')

def displaypost(request):
    
    if not request.user.is_authenticated:
        return redirect('/api/signin/')
    else:
        loggedinuser = request.user.email
        mates = Relation.objects.filter(user_id = loggedinuser)
        filteredpost = []
        # posts = UserPost()
        #posts = .order_by('createdon').reverse()
        #filteredpost.append(posts)
        ownerdept= UserData.objects.get(email=loggedinuser).deptid
        for relation in mates:
            posts = (UserPost.objects.filter(owner_id = relation.mate)|UserPost.objects.filter(owner_id = loggedinuser)).order_by('createdon').reverse() 
            serialize_posts = serializers.serialize('json',posts)
            if(relation.mate.deptid == ownerdept):   #post of mates with same deptid
                filteredpost.append(serialize_posts)
        
        
        return HttpResponse(serialize_posts)
       # print(filteredpost)
      #  return render(request,'feed.html',{'mateposts':filteredpost})