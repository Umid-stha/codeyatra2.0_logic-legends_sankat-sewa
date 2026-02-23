from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Incident(models.Model):
    reported_by = models.ForeignKey(User, related_name='incidents', on_delete=models.CASCADE)
    incident_type = models.CharField(max_length=255)
    #implement a location for geo location
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    incident_severity = models.IntegerField(default=0)
    accepted_by = models.ManyToManyField(User, blank=True)
    max_volunteer_count = models.IntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


#Image model with incident relation for multi image support
class IncidentImages(models.Model):
    incident = models.ForeignKey(Incident, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    
