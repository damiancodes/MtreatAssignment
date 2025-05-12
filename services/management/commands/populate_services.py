from django.core.management.base import BaseCommand
from services.models import Service

class Command(BaseCommand):
    help = 'Populates the services table with initial data'

    def handle(self, *args, **kwargs):
        services = [
            {
                'name': 'General Checkup',
                'description': 'Comprehensive health examination including vital signs, physical examination, and basic health screening.'
            },
            {
                'name': 'Specialist Consultation',
                'description': 'One-on-one consultation with specialized healthcare professionals for specific medical conditions.'
            },
            {
                'name': 'Laboratory Services',
                'description': 'Comprehensive diagnostic testing including blood work, urine analysis, and other laboratory procedures.'
            },
            {
                'name': 'Radiology Services',
                'description': 'Advanced imaging services including X-rays, CT scans, and MRI scans.'
            },
            {
                'name': 'Pharmacy Services',
                'description': 'Full-service pharmacy providing prescription medications and over-the-counter products.'
            }
        ]

        for service_data in services:
            Service.objects.get_or_create(
                name=service_data['name'],
                defaults={'description': service_data['description']}
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated services')) 