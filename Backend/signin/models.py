from django.db import models
from signup.models import UserData

class UserOtp(models.Model):
    user = models.ForeignKey(UserData,on_delete= models.CASCADE,related_name="otp_for_user")
    otp = models.TextField(max_length=8)