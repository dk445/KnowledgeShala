from django.shortcuts import render,redirect
from django.utils import timezone
from posts.models import UserPost


# Create your views here.

def makepost(request):
    curent_user = request.user
    if curent_user.is_authenticated:
        return redirect('/api/signin/')
    else:
        desc = request.POST['desc']     
        owner = curent_user.email
        created = timezone.localtime()
        UserPost.objects.create(owner=owner , description = desc , createdon = created)    
        print('posted')
        return redirect('/feed')

def displaypost(request):
    curent_user = request.user
    check = request.user.is_authenticated
    #if check == False:
    if not request.user.is_authenticated
        return redirect('/api/signin/')
    else:
        posts = UserPost()
        posts = UserPost.objects.all().order_by('createdon').reverse()
        return render(request,'feed.html',{'posts':posts})