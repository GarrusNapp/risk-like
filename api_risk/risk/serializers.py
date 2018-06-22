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
    creator = UserSerializer(read_only=True)
    players = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ("id", "name", "creator", "players_count", "players", "started", "finished", "draw", "surrendered", "board")

