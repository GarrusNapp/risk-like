from .models import CustomUser
from .serializers import UserSerializer, FullUserData
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class Me(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({}, status=status.HTTP_403_FORBIDDEN)
        if request.method == 'GET':
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