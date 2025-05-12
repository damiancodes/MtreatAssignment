from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Service
from .serializers import ServiceSerializer

# Create your views here.

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to view services
