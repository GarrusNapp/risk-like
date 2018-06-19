from django.contrib import admin
from .models import Game, CustomUser

# Register your models here.

admin.site.register(Game)
admin.site.register(CustomUser)