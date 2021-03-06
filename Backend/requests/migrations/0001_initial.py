# Generated by Django 2.2.2 on 2019-08-18 13:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RequestStatus',
            fields=[
                ('statusid', models.CharField(max_length=2, primary_key=True, serialize=False)),
                ('status', models.CharField(max_length=12)),
            ],
        ),
        migrations.CreateModel(
            name='Requests',
            fields=[
                ('requestid', models.AutoField(primary_key=True, serialize=False)),
                ('requested', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requested_user', to=settings.AUTH_USER_MODEL)),
                ('requesting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requesting_user', to=settings.AUTH_USER_MODEL)),
                ('statusid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='requests.RequestStatus')),
            ],
        ),
    ]
