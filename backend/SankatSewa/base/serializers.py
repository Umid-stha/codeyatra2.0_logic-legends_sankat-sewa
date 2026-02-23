from rest_framework import serializers
from .models import Incident, IncidentImages
from django.contrib.auth import get_user_model

User = get_user_model()

class IncidentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncidentImages
        fields = ['id', 'image']

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class IncidentSerializer(serializers.ModelSerializer):
    reported_by = SimpleUserSerializer(read_only=True)
    accepted_by = SimpleUserSerializer(many=True, read_only=True)
    images = IncidentImageSerializer(many=True, read_only=True)

    class Meta:
        model = Incident
        fields = [
            'id',
            'reported_by',
            'incident_type',
            'latitude',
            'longitude',
            'incident_severity',
            'accepted_by',
            'max_volunteer_count',
            'images',
            'created_at',
            'updated_at',
        ]

class IncidentCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Incident
        fields = [
            'incident_type',
            'latitude',
            'longitude',
            'incident_severity',
            'max_volunteer_count',
            'images'
        ]

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        user = self.context['request'].user

        incident = Incident.objects.create(
            reported_by=user,
            **validated_data
        )

        for image in images_data:
            IncidentImages.objects.create(
                incident=incident,
                image=image
            )

        return incident