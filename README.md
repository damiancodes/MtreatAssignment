# Healthcare Platform

A full-stack healthcare platform built with Django REST Framework and React.

## Backend Setup

1. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up PostgreSQL database and update settings.py with your database credentials

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

## Frontend Setup (Coming Soon)

## API Endpoints

### Authentication
- POST /api/token/ - Get JWT token
- POST /api/token/refresh/ - Refresh JWT token

### Patients
- POST /api/patients/ - Register new patient
- GET /api/patients/ - List patients (authenticated)

### Services
- GET /api/services/ - List healthcare services

## Features
- JWT Authentication
- Patient Registration
- Healthcare Services Listing
- PostgreSQL Database
- RESTful API Design 