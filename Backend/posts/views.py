from django.shortcuts import render,redirect,HttpResponse
from django.utils import timezone
from posts.models import UserPost
from signup.models import UserData
from rest_framework.views import APIView
from rest_framework.response import Response
from requests.models import Relation
from django.core import serializers
from django.http import JsonResponse
from .serializers import UserPostSerializer
import json
import jsonpickle




# Create your views here.

class Posts(APIView):

    def deletePost(request):
        data = json.loads(request.body.decode('utf-8'))
        pk = data['pk']        
        UserPost.objects.filter(pk=pk).delete()
        return HttpResponse('delete successfullly')
        

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
        data = json.loads(request.body.decode('utf-8'))
        #loggedinuser =  data['email']     //commenting for development purpose
        #print(loggedinuser)
        loggedinuser = 'kartikdambre.160410116022@gmail.com'  #this line should be remove
        mates = Relation.objects.filter(user_id = loggedinuser)
        filteredpost = []
        postids = []
        ownerdept= UserData.objects.get(email=loggedinuser).deptid
        for relation in mates:
            if(relation.mate.deptid == ownerdept):
                posts = (UserPost.objects.filter(owner_id = relation.mate).order_by('createdon').reverse() | UserPost.objects.filter(owner_id = loggedinuser).order_by('createdon').reverse())
                if(len(posts)!=0):
                    for post in posts:
                        if post.postid not in postids:
                            postids.append(post.postid)
                            filteredpost.append(post.getView()) 
                else:
                    return HttpResponse('No posts')               
        print(filteredpost)
        return HttpResponse(jsonpickle.encode(filteredpost))        
        
        
        


    




    