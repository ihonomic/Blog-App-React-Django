from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from datetime import datetime


class CustomDateTimeField(models.DateTimeField):
    def value_to_string(self, obj):
        val = self.value_from_object(obj)
        if val:
            val.replace(microsecond=0)
            return val.isoformat()
        return ''


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email Field is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        # extra_fields.setdefault('name', 'admin')

        if extra_fields.get("is_staff") is not True:
            raise ValueError(" Superuser must have is_staff = True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(" Superuser must have is_superuser = True")

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50,  null=True, blank=True)
    phone = models.CharField(max_length=90,  null=True, blank=True)
    city = models.CharField(max_length=50,  null=True, blank=True)
    country = models.CharField(max_length=50,  null=True, blank=True)
    bio = models.CharField(max_length=225,  null=True, blank=True)

    user_photo = models.ImageField(
        upload_to='photos/%Y/%m/%d', default='profile_pic.png')

    created_at = CustomDateTimeField(auto_now_add=True)
    updated_at = CustomDateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    objects = CustomUserManager()
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return f"{self.last_name} {self.first_name}"

    def get_short_name(self):
        return f"{self.first_name}"

    def __str__(self):
        return f"{self.email} - - {self.created_at}"
# .strftime('%Y: %m: %d')
