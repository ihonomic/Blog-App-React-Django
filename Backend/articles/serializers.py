from rest_framework import serializers
from .models import Article, ArticleComment

from bloggers.serializers import BloggerSerializer, User


class CommentSerializer(serializers.ModelSerializer):
    user = BloggerSerializer(read_only=True)

    class Meta:
        model = ArticleComment
        fields = "__all__"


class ArticleSerializer(serializers.ModelSerializer):
    blogger = BloggerSerializer(read_only=True)
    # comments = CommentSerializer()
    # likes = BloggerSerializer(read_only=True)

    class Meta:
        model = Article
        fields = "__all__"
