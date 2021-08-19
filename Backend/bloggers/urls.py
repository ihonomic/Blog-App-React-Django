from django.contrib import admin
from django.urls import path

from . import views


urlpatterns = [
    path('csrf', views.GetCSRFToken.as_view()),
    path('signup', views.SignUpView.as_view()),
    path('login', views.LoginView.as_view()),
    path('checkAuth', views.CheckAuthenticatedView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('delete_blogger', views.DeleteAccountView.as_view()),
    path('update_blogger', views.UpdateAccount.as_view()),


]
