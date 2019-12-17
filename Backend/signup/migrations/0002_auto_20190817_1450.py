# Generated by Django 2.2.2 on 2019-08-17 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('signup', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='collegedata',
            name='city',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='collegedata',
            name='email',
            field=models.EmailField(max_length=254, null=True, unique=True),
        ),
    ]
