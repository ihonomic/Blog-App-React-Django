from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeFeaturedArticles.as_view()),
    path('category', views.Articles.as_view()),
    path('detail/<slug:slug>', views.DetailArticle.as_view()),
]
