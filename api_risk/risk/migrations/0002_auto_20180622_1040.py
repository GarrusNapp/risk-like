# Generated by Django 2.0.6 on 2018-06-22 08:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('risk', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='username',
            field=models.CharField(default='HYPNO', max_length=50),
        ),
        migrations.AlterField(
            model_name='game',
            name='creator',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='games', related_query_name='games', to=settings.AUTH_USER_MODEL),
        ),
    ]