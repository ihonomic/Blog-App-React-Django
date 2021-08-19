from django.core.management.base import BaseCommand
from users.models import CustomUser
from articles.models import Article
from faker import Faker
import faker.providers

# Custom Provider
country = ['Nigeria', 'Ghana', "Malaysia", 'USA',
           'Canada', 'Cameroon', 'China', "South Africa"]

category = [
    'World',
    'Nigeria',
    'Technology',
    'Design',
    'Culture',
    'Business',
    'Politics',
    'Opinion',
    'Science',
    'Health',
    'Style',
    'Travel'
]


class Provider(faker.providers.BaseProvider):
    def user_country(self):
        return self.random_element(country)

    def blog_category(self):
        return self.random_element(category)


class Command(BaseCommand):
    help = " Command Information "

    def handle(self, *args, **kwargs):
        print("Hi, Ihon your database is set to populate! ")
        fake = Faker('en_US')
        fake.add_provider(Provider)

        # print(fake.phone_number())

        for _ in range(8):
            country = fake.unique.country()

            CustomUser.objects.get_or_create(
                email=fake.email(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                phone=fake.phone_number(),
                city=fake.city(),
                country=country,
                bio=fake.text()

            )
