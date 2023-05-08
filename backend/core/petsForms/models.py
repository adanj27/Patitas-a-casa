from django.db import models

# Create your models here.
class Pet (models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    date = models.DateTimeField(max_length=50, blank=False, null=False)
    img = models.ImageField(upload_to='images',null=True)
    contact = models.CharField(max_length=50, blank= False, null = False)
    place = models.CharField(max_length=50, blank=False, null = False)
    size = models.CharField(max_length=50, blank=True, null= True)
    description = models.CharField(max_length=250, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.name
