from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


## Manejador del Modelo de Usuario para modificar el evento create
## si no hay email lanza un error, y tambien crea al usuario con contraseña
## pero no permite que se muestre ene el serializer
class CustomAccountManager(BaseUserManager):
    def create_user(self, email, name, password, **other_fields):
        if not email:
            raise ValueError(_('You must provide an email address'))
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, name,password=None):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            name = name
        )
        user.admin = user.is_superuser = user.is_staff = True
        user.save(using=self._db)
        return user

## Modelo Usuario, Creado apartir del modelo "AbstractBaseUser"
## El modelo define los campos del usuario y el manageador del modelo
class User(AbstractBaseUser, PermissionsMixin):
    email       = models.EmailField(_('email address'), unique=True)
    name   = models.CharField(max_length=30)
    age = models.CharField(max_length=30)
    phone  = models.DateTimeField(default=timezone.now)
    bio         = models.TextField(_('bio'), max_length=256, blank=True)
    image       = models.ImageField(null=True, blank=True, default='/pic.jpg')
    is_staff    = models.BooleanField(default=False)
    is_active   = models.BooleanField(default=True)
    
    objects     = CustomAccountManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def has_perm(self, perm, obj=None):
       return self.is_superuser

    def has_module_perms(self, app_label):
       return self.is_superuser