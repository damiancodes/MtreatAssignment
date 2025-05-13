from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to view services

class ServiceListView(ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

class TestPublicView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"message": "This is public!"})
