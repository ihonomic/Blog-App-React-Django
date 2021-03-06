# Generated by Django 3.1.4 on 2021-05-02 07:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=60)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_comment', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('categories', models.CharField(choices=[('World', 'World'), ('Nigeria', 'Nigeria'), ('Technology', 'Technology'), ('Design', 'Design'), ('Culture', 'Culture'), ('Business', 'Business'), ('Politics', 'Politics'), ('Opinion', 'Opinion'), ('Science', 'Science'), ('Health', 'Health'), ('Style', 'Style'), ('Travel', 'Travel')], max_length=255)),
                ('slug', models.SlugField(unique=True)),
                ('content', models.TextField()),
                ('photo_main', models.ImageField(upload_to='photos/%Y/%m/%d')),
                ('photo_1', models.ImageField(blank=True, upload_to='photos/%Y/%m/%d')),
                ('photo_2', models.ImageField(blank=True, upload_to='photos/%Y/%m/%d')),
                ('featured', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('blogger', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='user_article', to=settings.AUTH_USER_MODEL)),
                ('comments', models.ManyToManyField(to='articles.Comment')),
                ('likes', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Articles',
                'ordering': ('created_at',),
            },
        ),
    ]
