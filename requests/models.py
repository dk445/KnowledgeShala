from django.db import models
from signup.models import UserData

# Create your models here.
 
class RequestStatus(models.Model):
    statusid = models.CharField(max_length=2,primary_key=True)
    status = models.CharField(max_length=12)

class Requests(models.Model):
    requestid = models.AutoField(primary_key=True)
    requesting = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="requesting_user")
    requested = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="requested_user")
    statusid = models.ForeignKey(RequestStatus,on_delete=models.CASCADE)
    class Meta:
        unique_together = ('requesting' , 'requested')