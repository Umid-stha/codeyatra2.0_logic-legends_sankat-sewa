from .serializers import IncidentSerializer, IncidentCreateSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
def get_incidents(request):
    pass