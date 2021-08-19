from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

#   static imports
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api-auth/', include('rest_framework.urls')),
    path('tinymce/', include('tinymce.urls')),


    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/bloggers/', include('bloggers.urls')),
    path('api/articles/', include('articles.urls')),

]
#    Paths to Media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]


# Debug toolbar
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls))
    ] + urlpatterns
