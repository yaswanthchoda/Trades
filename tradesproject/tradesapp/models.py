from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager ## A new class is imported. ##
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.utils import timezone

# Create your models here.
class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
	GENDER_CHOICES = (
	    ('M', 'Male'),
	    ('F', 'Female'),
	)

	username = None
	email = models.EmailField(_('email address'), unique=True)
	middle_name = models.CharField('middle name', max_length=50, blank=True, null=True)
	gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
	mobile = models.CharField(max_length=10)
	zipcode = models.CharField(max_length=6, default="Not Specified")
	address = models.CharField(max_length=50, blank=True, null=True)
	is_trader = models.BooleanField('is_trader', default = False)
	  
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	objects = UserManager()

class Trader(models.Model):
	t_user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	shopname = models.CharField(max_length=200)
	shoplicence = models.CharField(max_length=200)
	description = models.TextField(blank=True)
	# picture = models.ImageField(upload_to='static/uploads/', default='static/images/image_not_available.png')

	# def __str__(self):
	# 	if self.t_user:
	# 		return self.t_user.username
	# 	else:
	# 		self.t_user

class Consumer(models.Model):
	c_user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	# picture = models.ImageField(upload_to='static/uploads/', default='static/images/image_not_available.png')

	# def __str__(self):
	# 	return self.user.username

class TraderStockInfo(models.Model):
	trader_id = models.ForeignKey(Trader, on_delete=models.CASCADE)
	created_date = models.DateTimeField(default=timezone.now, blank=True)
	item_name = models.CharField(max_length=50)
	item_packs = models.IntegerField()
	items_per_pack = models.IntegerField()
	item_cost = models.FloatField()
	notes = models.TextField(blank=True)

class ConsumerPurchaseInfo(models.Model):
	purchase_date = models.DateTimeField(default=timezone.now, blank=True)
	ptrader_id = models.ForeignKey(Trader, on_delete=models.CASCADE)
	pconsumer_id = models.ForeignKey(Consumer, on_delete=models.CASCADE)
	pitem_id = models.AutoField(primary_key=True)
	pitem_name = models.CharField(max_length=50)
	pitem_count = models.IntegerField()
	pitem_cost = models.FloatField()
	pnotes = models.TextField(blank=True)

class Director(models.Model):
	name = models.CharField(max_length=50)

class Movie(models.Model):
	name= models.CharField(max_length=50)
	director = models.ForeignKey(Director, on_delete=models.CASCADE)

class Parent(models.Model):
	name = models.CharField(max_length=50)

class child(models.Model):
	name= models.CharField(max_length=50)
	gaurdian = models.ForeignKey(Parent, on_delete=models.CASCADE)

class Blogger(models.Model):
	name = models.CharField(max_length=50)# harsha, sunilg

class Article(models.Model):
	name = models.CharField(max_length=50, unique=True) # AC, WI, WC19, T20WC
	blogger = models.ForeignKey(Blogger, on_delete=models.CASCADE)





# from tradesapp.models import Article, Blogger
# b = Blogger.objects.create(name="Harsha Bhogle")
# b = Blogger.objects.create(name="Sunil Gavaskar")
# b1 = Blogger.objects.create(name="Sourav Ganguly")
# a = Article.objects.create(name="Asia Cup", blogger=b1)
# a1 = Article.objects.create(name="Asia Cup", blogger=b1)
