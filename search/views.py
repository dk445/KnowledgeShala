from django.shortcuts import render,redirect,HttpResponse
from signup.models import UserData
from django.contrib.postgres.operations import UnaccentExtension
from django.core import serializers

# Create your views here.

def search(request):
    query = request.POST['search_query']
    if not query:
        return redirect('/api/signin/')

    if request.user:
        try:
            result = UserData.objects.filter(name__unaccent__icontains = query).defer('name','email')
            result_list = serializers.serialize('json',result)
            #print(result)
        except:
            return render(request,'search.html',{'message': 'Error in searching. Try again'})
        return HttpResponse(result_list)
    else:
        return redirect('/api/signin/')
        
