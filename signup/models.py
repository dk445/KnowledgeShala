from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class CollegeData(models.Model):
    clgid = models.CharField(max_length=3,primary_key=True)
    clgName = models.CharField(max_length = 100)
    city = models.CharField(max_length=20, null=True)
    email = models.EmailField(unique = True,null=True)

class DepartmentData(models.Model):
    deptid = models.CharField(max_length = 10, primary_key=True)
    deptname = models.CharField(max_length = 100)


class RoleData(models.Model):
    roleid = models.CharField(max_length = 1, primary_key=True)
    rolename = models.CharField(max_length = 52)

class UserData(AbstractUser):
    email = models.EmailField(primary_key=True,unique = True)
    name = models.CharField(max_length = 24)
    mobile = models.CharField(max_length = 10)
    isVerified = models.CharField(max_length=3 , default='No')
    clgid = models.ForeignKey(CollegeData , on_delete=models.CASCADE)
    deptid = models.ForeignKey(DepartmentData , on_delete=models.CASCADE)
    roleid = models.ForeignKey(RoleData , on_delete=models.CASCADE)   
     
    



   # USERNAME_FIELD = 'email'

   # REQUIRED_FIELDS = ['password','name','mobile','isVerified', 'clgid' , 'deptid' , 'roleid']


