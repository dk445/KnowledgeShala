from django.db import models
from signup.models import UserData

# Create your models here.

class UserPost(models.Model):
    postid = models.AutoField(primary_key=True)
    owner = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="post_owner")
    description = models.TextField(blank=True)
    createdon = models.DateTimeField()

    def __str__(self):
        return self.owner_id

    def getView(self):
        return UserPostView(self.postid,self.owner.name,self.description,self.createdon.day,self.createdon.month,self.createdon.year,self.createdon.hour,self.createdon.minute)

class UserPostView():
    def __init__(self, postid, owner, description,day,month,year,hour,minute):
        self.postid = postid
        self.owner = owner
        self.description = description
        self.createDate = str(day)+'/'+str(month)+'/'+str(year)
        self.createTime = str(hour)+':'+str(minute)
