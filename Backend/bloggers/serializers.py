from django.contrib.auth.models import Group
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class BloggerSerializer(serializers.ModelSerializer):
    # groups = GroupSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email',
                  'user_photo', 'phone', 'city', 'country', 'bio', 'groups')
