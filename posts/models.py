from django.db import models
from signup.models import UserData

# Create your models here.

class UserPost(models.Model):
    postid = models.AutoField(primary_key=True)
    owner = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="post_owner")
    description = models.TextField(blank=True)
    createdon = models.DateTimeField()


    
