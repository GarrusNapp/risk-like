from rest_framework import serializers
from .models import CustomUser, Game


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


class GameSerializer(serializers.ModelSerializer):
    creator = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Game
        fields = ("id", "creator", "players_count", "started", "finished", "draw", "surrendered")