from django.db import models
from django.contrib.auth.models import AbstractUser,User

# Create your models here.


class CollegeData(models.Model):
    clgid = models.CharField(unique=True ,max_length=3,primary_key=True)
    clgName = models.CharField(max_length = 100)
    mobile = models.CharField(max_length = 10)
    city = models.CharField(max_length=20, null=True)
    email = models.EmailField(unique = True,null=True)
    password = models.CharField(max_length=128)

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

    def get_user_view(self):
        return UserDataView(self.name,self.email,self.clgid.clgName,self.deptid.deptname,self.roleid.rolename)

class UserDataView():
    def __init__(self,name,email,clgName,deptName,role):
        self.name = name
        self.email = email
        self.clgName = clgName
        self.deptName = deptName
        self.role = role

class ClgListView():
    def __init__(self,clgName,city,id):
        self.value = clgName
        self.label=clgName
        self.city = city
        self.clgId = id

class DeptListView():
    def __init__(self,deptId,deptName):
        self.deptId = deptId
        self.deptName = deptName

     
    



   # USERNAME_FIELD = 'email'

   # REQUIRED_FIELDS = ['password','name','mobile','isVerified', 'clgid' , 'deptid' , 'roleid']


