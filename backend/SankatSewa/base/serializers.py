from rest_framework import serializers
from .models import Incident

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ['id', 'incident_type', 'reporter_by', 'accepted_by', 'latitude', 'longitude', 'images', 'max_volunteer_count']
