from django.contrib import admin
from .models import ArticleComment, Article

# Register your models here.


class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'blogger', 'categories',
                    'featured', 'created_at', )
    list_display_links = ('id', 'title', )
    list_filter = ('blogger', 'title', )
    list_editable = ('featured', )
    search_fields = ('id', 'blogger', 'title', 'categories',)
    list_per_page = 25
    # prepopulated_fields = {'slug': ('title', ), }


admin.site.register(Article, ArticleAdmin)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'text')
    list_display_links = ('id', 'user',)
    list_filter = ('user',)
    list_editable = ('text',)
    search_fields = ('id', 'user', 'text',)
    list_per_page = 25


admin.site.register(ArticleComment, CommentAdmin)
