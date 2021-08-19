from django.template.defaultfilters import slugify
from django.db import models
from tinymce.models import HTMLField
from django.contrib.auth import get_user_model
User = get_user_model()


class Article(models.Model):
    class CategoryType(models.TextChoices):
        WORLD = 'World'
        NIGERIA = 'Nigeria'
        TECHNOLOGY = 'Technology'
        DESIGN = 'Design'
        CULTURE = 'Culture'
        BUSINESS = 'Business'
        POLITICS = 'Politics'
        OPINION = 'Opinion'
        SCIENCE = 'Science'
        HEALTH = 'Health'
        STYLE = 'Style'
        TRAVEL = 'Travel'

    blogger = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, null=True, blank=True, related_name="user_article")
    title = models.CharField(max_length=255)
    abstract = models.CharField(max_length=60, null=True)
    categories = models.CharField(max_length=255, choices=CategoryType.choices)
    slug = models.SlugField(unique=True, editable=False)
    content = HTMLField()
    photo_main = models.ImageField(upload_to='photos/%Y/%m/%d')
    photo_1 = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    photo_2 = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True)
    likes = models.ManyToManyField(User, blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super(Article, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Articles'
        ordering = ('created_at',)

    def __str__(self):
        return f"{self.blogger} - {self.title}"


class ArticleComment(models.Model):
    article = models.ForeignKey(
        Article, on_delete=models.CASCADE, related_name='article')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_comment')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
