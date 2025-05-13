from django.urls import path
from .views import TestPublicView

urlpatterns = [
    path('', TestPublicView.as_view(), name='test-public'),
] 