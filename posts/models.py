from django.db import models

# Create your models here.

class UserPost(models.Model):
    postid = models.AutoField(primary_key=True)
    owner = models.EmailField()
    description = models.TextField(blank=True)
    createdon = models.DateTimeField()
    
