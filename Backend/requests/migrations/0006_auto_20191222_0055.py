# Generated by Django 3.0 on 2019-12-21 19:25

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('requests', '0005_auto_20191222_0046'),
    ]

    operations = [
        migrations.RenameField(
            model_name='requests',
            old_name='requestReciever',
            new_name='requestReceiver',
        ),
        migrations.AlterUniqueTogether(
            name='requests',
            unique_together={('requestMaker', 'requestReceiver')},
        ),
    ]