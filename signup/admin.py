from django.contrib import admin
from .models import UserData,CollegeData,DepartmentData,RoleData
# Register your models here.

 admin.site.register(UserData)
 admin.site.register(CollegeData)
 admin.site.register(DepartmentData)
 admin.site.register(RoleData)