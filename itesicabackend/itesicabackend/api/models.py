from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    COLORS = (
        ('', 'No color'),
        ('white', 'White'),
        ('red', 'Red'),
        ('blue', 'Blue'),
        ('green', 'Green'),
        ('yellow', 'Yellow'),
        ('orange', 'Orange'),
        ('purple', 'Purple'),
        ('pink', 'Pink'),
        ('grey', 'Grey'),
        ('black', 'Black'),
    )
    
    title = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=2500)
    marked = models.BooleanField(default=False)
    color = models.CharField(max_length=255, choices=COLORS, default='')
    parent = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')

    def __str__(self):
        return self.title
