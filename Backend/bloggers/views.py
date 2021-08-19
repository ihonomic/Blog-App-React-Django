from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth.models import Group
from django.contrib import auth
from .serializers import BloggerSerializer
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
User = get_user_model()


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    """ View to get CSRF since react forms are loaded dynamically """
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({"success": "CSRF cookie set"})


@method_decorator(csrf_protect, name='dispatch')
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        first_name = data["first_name"]
        last_name = data["last_name"]
        email = data["email"]
        password = data["password"]
        password2 = data["password2"]
        group = data["group"]   # Writer OR Reader

        try:
            if password == password2:
                if User.objects.filter(email=email).exists():
                    return Response({"error": "User email already exist"})

                else:
                    if len(password) < 6:
                        return Response({"error": "Password must be more than 6 characters"})
                    else:
                        user = User.objects.create_user(
                            email=email, password=password, first_name=first_name, last_name=last_name)

                        group = Group.objects.get(name=group)
                        user.groups.add(group)

                        return Response({"success": "Account created successfully"})
            else:
                return Response({"error": "Passwords do not match"})
        except:
            return Response({"error": "Something went wrong, Try again"})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        email = data['email']
        password = data['password']

        try:
            user = auth.authenticate(email=email, password=password)

            if user is not None:
                auth.login(request, user)

                user = User.objects.get(email=email)
                serializer = BloggerSerializer(user)

                return Response({"success": "Login Success", "user": serializer.data})

            else:
                return Response({"error": "Email or Password is incorrect"})
        except:
            return Response({"error": "Something went wrong, Try again"})


class CheckAuthenticatedView(APIView):
    """ Check if the current user is authenticated usaully on pages refresh"""
    # permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):

        try:
            user = self.request.user
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                user = User.objects.get(email=user.email)
                serializer = BloggerSerializer(user)
                return Response({"isAuthenticated": "success", "user": serializer.data})
            else:
                return Response({"isAuthenticated": "error"})
        except:
            return Response({"error": "Unable to check Authentication status"})


class LogoutView(APIView):
    def get(self, request, format=None):
        try:
            auth.logout(request)
            return Response({"success": "Logout successfully, Come back Soon"})
        except:
            return Response({"error": "Something went wrong, Try again"})


class DeleteAccountView(APIView):

    def delete(self, request, format=None):
        # user = self.request.user
        try:
            User.objects.filter(id=self.request.user.id).delete()
            return Response({"success": "Your account has been deleted"})
        except:
            return Response({"error": "Account Deletion failed. Try again"})


class UpdateAccount(APIView):
    def put(self, request, format=None):

        data = self.request.data

        first_name = data["first_name"]
        last_name = data["last_name"]
        phone = data["phone"]
        city = data["city"]
        country = data["country"]
        bio = data["bio"]

        try:
            user = self.request.user.id
            User.objects.filter(id=user).update(first_name=first_name, last_name=last_name, phone=phone,
                                                city=city, country=country, bio=bio)

            user = User.objects.get(id=user)

            serializer = BloggerSerializer(user)
            return Response({"blogger": serializer.data})

        except:
            return Response({"error": "Something went wrong. Try again"})
