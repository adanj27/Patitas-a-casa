from django.db import models

# Create your models here.
# pet models thats contains all the information about the pet    
class Pet(models.Model):
    
    name = models.CharField(max_length=100) # name of the pet
    kind = models.CharField(max_length=30) # dog or cat or other
    gender = models.CharField(max_length=6) # male or female
    size = models.CharField(max_length=6) # small or medium or big
    contact = models.CharField(max_length=126) # phone number or email
    description = models.TextField() # description of the pet
    img = models.ImageField(upload_to='pets') # picture of the pet
    found = models.BooleanField(default=False) # if the pet is found or not
    
    
    
    
    