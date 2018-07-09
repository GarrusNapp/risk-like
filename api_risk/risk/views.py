from .models import CustomUser, Player, Game
from .serializers import UserSerializer, FullUserData, GameSerializer
from django.contrib.auth import login, authenticate, logout
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .board import INITIAL_BOARD

class Me(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({}, status=status.HTTP_403_FORBIDDEN)

        username = request.user.get_username()
        entry = CustomUser.objects.filter(username=username).values()[0]
        serializer = FullUserData(entry)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Register(APIView):
    def post(self, request):
        if request.data:
            body = request.data
            print(body)
            username = body['username']
            password = body['password']

            if CustomUser.objects.filter(username=username).exists():
                return Response({'error': 'This username is already taken'}, status=status.HTTP_400_BAD_REQUEST)

            user = CustomUser.objects.create_user(username, '', password)
            user.save()
        else:
            return Response({'error': 'No payload provided'}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.filter(username=username).values()[0]
        serializer = UserSerializer(user)
        return Response(serializer.data)

class Login(APIView):
    def post(self, request):
        body = request.data
        username = body['username']
        password = body['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            user = CustomUser.objects.filter(username=username).values()[0]
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)


class Logout(APIView):
    def post(self, request):
        print(request.user.is_authenticated)
        logout(request)
        return Response({}, status=status.HTTP_200_OK)


class ShowPlayers(APIView):
    def get(self, request):
        print(request.user.is_authenticated)
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class cGame(APIView):
    def post(self, request):
        game = Game(
            name=request.data["name"],
            creator=request.user,
            board=json.dumps(INITIAL_BOARD),
            players_count=1,

        )
        game.save()
        player = Player(
            game=game,
            owner=True,
            first=False,
            user=request.user.id,
            username=request.user.get_username()
        )
        player.save()

        r = Game.objects.get(pk=game.pk)
        print(r)
        serializer = GameSerializer(r)

        return Response(serializer.data)

    def get(self, request):
        r = Game.objects.filter(finished=False)
        serializer = GameSerializer(r, many=True)

        return Response(serializer.data)


class ShowGameInfo(APIView):
    def get(self, request, game_id):
        r = Game.objects.get(pk=game_id)
        serializer = GameSerializer(r)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Join(APIView):
    def post(self, request, game_id):
        game = Game.objects.get(pk=game_id)
        if game.players_count == 2:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        game.players_count = 2
        game.save()
        player = Player(
            game=game,
            owner=False,
            first=True,
            user=request.user.id,
            username=request.user.get_username()
        )
        player.save()

        return Response({}, status=status.HTTP_200_OK)


class Leave(APIView):
    def post(self, request, game_id):
        games = Game.objects.get(pk=game_id).players.all().values()
        game = Game.objects.get(pk=game_id)
        game.players_count = game.players_count - 1
        game.save()
        player_leaving = ""
        for player in games:
            if player["user"] == request.user.id:
                player_leaving = player["id"]
        player = Player.objects.get(pk=player_leaving)
        print(player)
        player.delete()
        return Response({}, status=status.HTTP_200_OK)