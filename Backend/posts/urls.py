from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('feed/',views.Posts.displaypost),
    path('feed/post/',views.Posts.makepost),
    path('feed/delete/',views.Posts.deletePost)
]
                                                                        