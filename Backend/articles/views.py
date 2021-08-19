from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import generics
# from rest_framework import pagination
from rest_framework import mixins, views

from articles.models import Article
from .serializers import ArticleSerializer


# Create your views here.

class HomeFeaturedArticles(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ArticleSerializer

    def get(self, request, format=None):
        featured = Article.objects.filter(featured=True)

        featuredOpinion = featured.filter(categories__icontains='opinion')[:1]
        serializedOpinion = self.serializer_class(featuredOpinion, many=True)

        featuredWorld = featured.filter(categories__icontains='world')[:1]
        serializedWorld = self.serializer_class(featuredWorld, many=True)

        context = [serializedOpinion.data, serializedWorld.data]

        return Response(context)


class Articles(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ArticleSerializer

    def post(self, request, format=None):
        data = self.request.data
        category = data['category']
        print(category)
        queryset = Article.objects.order_by(
            '-created_at').filter(categories__icontains=category)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class DetailArticle(generics.RetrieveAPIView):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = ArticleSerializer
    queryset = Article.objects.select_related("blogger")
    lookup_field = 'slug'
