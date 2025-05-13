from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Patient, Appointment
from services.models import Service
from services.serializers import ServiceSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class AppointmentSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(),
        source='service',
        write_only=True
    )

    class Meta:
        model = Appointment
        fields = ('id', 'service', 'service_id', 'appointment_date', 'status', 'notes', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    password = serializers.CharField(write_only=True)
    appointments = AppointmentSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = ('id', 'user', 'full_name', 'email', 'password', 'phone', 'address', 'appointments', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        password = validated_data.pop('password')
        email = validated_data['email']
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'This email is already registered.'})
        user = User.objects.create_user(
            email=email,
            password=password
        )
        patient = Patient.objects.create(user=user, **validated_data)
        return patient 