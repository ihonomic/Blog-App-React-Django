from articles.models import Article
from users.models import CustomUser
import random
from faker import Faker
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')
django.setup()


# Import models


# Fake pop script


fake = Faker('en_US')

# Define a list categegory
country = ['Nigeria', 'Ghana', "Malaysia", 'USA',
           'Canada', 'Cameroon', 'China', "South Africa"]


# Function that randomly picks a category
def add_user():
    C = CustomUser.objects.get_or_create(
        email=fake.email(),
        first_name=fake.name(),
        last_name=fake.name(),
        phone=fake.name(),
        city=fake.name(),
        country=random.choice(country)[0],
        bio=fake.text()

    )
    C.save()
    return C


def populate(N=5):
    for entry in range(N):
        # get the user
        blogger = add_user()
        # create fake data for the current user
        #   1.
        article = Article.objects.get_or_create(
            blogger=blogger,
            title=fake.title(),
            abstract=fake.text(),
        )


if __name__ == "__main__":
    print("Populating database, Please stay tuned...")
    populate(20)
    print("Congratulations! Database population complete!")
