from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    won = models.IntegerField(default=0)
    lost = models.IntegerField(default=0)
    won_by_surrender = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)
    surrendered = models.IntegerField(default=0)

    def __str__(self):
        return self.username


class Game(models.Model):
    name = models.CharField(max_length=50)
    creator = models.ForeignKey('CustomUser', blank=True, related_name='games', on_delete=models.CASCADE, related_query_name='games')
    players_count = models.IntegerField(default=0)
    board = models.CharField(max_length=5000)
    started = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
    surrendered = models.BooleanField(default=False)
    draw = models.BooleanField(default=False)

    def __str__(self):
        return "Game #" + str(self.id)


class Player(models.Model):
    game = models.ForeignKey(Game, blank=True, related_name='players', on_delete=models.CASCADE)
    won = models.BooleanField(default=False)
    owner = models.BooleanField(default=False)
    first = models.BooleanField(default=False)
    user = models.IntegerField(default=0)
    username = models.CharField(max_length=50, default="HYPNO")

    def __str__(self):
        return self.username

# class Board(models.Model):
#     game = models.ForeignKey('Game', related_name='board', on_delete=models.CASCADE)
#