from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'username',
        )
        model = CustomUser


class FullUserData(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'username',
            'won',
            'lost',
            'draws',
            'won_by_surrender',
            'surrendered'
        )
        model = CustomUser
