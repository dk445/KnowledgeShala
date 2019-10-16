from django.shortcuts import render,redirect
from signup.models import UserData
from django.contrib.postgres.operations import UnaccentExtension

# Create your views here.

def search(request):
    query = request.POST['search_query']
    if not query:
        return redirect('/api/signin/')

    if request.user:
        try:
            result = []
            result1 = UserData.objects.filter(name__unaccent__icontains = query).defer('name')
            result2 = UserData.objects.filter(name__unaccent__icontains = query).defer('email')
            result.append(result1)
            result.append(result2)
            print(result)
        except:
            return render(request,'search.html',{'message': 'Error in searching. Try again'})
        return render(request,'search.html',{'searchresult':result})
    else:
        return redirect('/api/signin/')
        
