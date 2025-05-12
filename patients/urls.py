from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, ServiceViewSet, AppointmentViewSet

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'appointments', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('', include(router.urls)),
]