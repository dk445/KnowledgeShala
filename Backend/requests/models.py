from django.db import models
from signup.models import UserData

# Create your models here.
 
class RequestStatus(models.Model):
    statusid = models.CharField(max_length=2,primary_key=True)
    status = models.CharField(max_length=12)

class Requests(models.Model):
    requestid = models.AutoField(primary_key=True)
    requestMaker = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="requesting_user")
    requestReceiver = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="requested_user")
    statusid = models.ForeignKey(RequestStatus,on_delete=models.CASCADE)
    class Meta:
        #unique_together = ('requestMaker' , 'requestReceiver' , 'statusid')
        pass

class RequestsView():
    def __init__(self,requestReceiver):
        self.user = requestReceiver

class Relation(models.Model):
    user = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="user")
    mate = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="mate")

    def getView(self):
        return MatesView(self.mate.name,self.mate.email,self.mate.clgid.clgName,self.mate.deptid.deptname)
    class Meta:
        unique_together = ('user' , 'mate')

class MatesView():
    def __init__(self,mateName,mateEmail,mateClg,mateDept):
        self.mateName = mateName
        self.mateEmail = mateEmail
        self.mateClg = mateClg
        self.mateDept = mateDept