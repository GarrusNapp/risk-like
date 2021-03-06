from rest_framework import generics
from django.urls import path

from . import views

urlpatterns = [
    path('user/players', views.ShowPlayers.as_view()),
    path('user/register', views.Register.as_view()),
    path('user/login', views.Login.as_view()),
    path('user/logout', views.Logout.as_view()),
    path('user/me', views.Me.as_view()),
    path('games', views.cGame.as_view()),
    path('game/<int:game_id>', views.ShowGameInfo.as_view()),
    path('game/<int:game_id>/join', views.Join.as_view()),
    path('game/<int:game_id>/leave', views.Leave.as_view()),
]

# url(r'register/', views.register),
# url(r'login/$', views.log_user),
# url(r'logout/$', views.logout_user),
# url(r'me/$', views.me),
# url(r'(?P<user_id>[0-9]+)$', views.user_id)