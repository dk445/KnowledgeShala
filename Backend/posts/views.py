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
from operator import attrgetter




# Create your views here.

class Posts(APIView):

    def deletePost(request):
        data = json.loads(request.body.decode('utf-8'))
        pk = data['pk']        
        UserPost.objects.filter(pk=pk).delete()
        return HttpResponse('delete successfullly')
        

    def makepost(request):
        data = json.loads(request.body.decode('utf-8'))
        #print(data)
        desc = data['desc']
        uniId = data['uniId']
        print(desc , uniId)
    #try:
        owner = UserData.objects.get(uniId=uniId)
        created = timezone.localtime()
        Post = UserPost(owner=owner , description = desc , createdon = created)
        #UserPost.objects.create(owner=owner , description = desc , createdon = created)
        Post.save();    
    #except:
        #return HttpResponse('failed')
        print('posted')
        return HttpResponse('success')

    def displaypost(request):
        print(request.body.decode('utf-8'))
        uniId =  request.body.decode('utf-8')   

        loggedinuser = UserData.objects.get(uniId=uniId)

        mates = Relation.objects.filter(user_id = loggedinuser.email)
        filteredpost = []
        postObjects = []
        posts = UserPost.objects.filter(owner_id = loggedinuser.email)
        ownerdept= UserData.objects.get(email=loggedinuser.email).deptid

        for post in posts:                
            postObjects.append(post)
            #filteredpost.append(post.getView())        

        for relation in mates:
            if(relation.mate.deptid == ownerdept):
                posts = UserPost.objects.filter(owner_id = relation.mate)
            for post in posts:
                postObjects.append(post)
                
        sorted(postObjects, key=attrgetter('createdon'))        
        postObjects.reverse()
        for post in postObjects:
            filteredpost.append(post.getView())
        print(filteredpost)
        return HttpResponse(jsonpickle.encode(filteredpost))      

        
        
        


    




    