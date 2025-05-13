# Healthcare Platform

A modern, full-stack healthcare platform built with Django REST Framework (DRF), PostgreSQL, and a React (TypeScript, Material-UI) frontend.

---

## Features
- Custom user model with extended fields
- Secure authentication and registration
- Public and protected API endpoints
- Responsive, modern UI with Material-UI
- Dark mode support
- Animated, interactive landing page
- Comprehensive documentation

---

## Screenshots

### Landing Page
![Landing Page](images/landing.png)

### Services Page
![Services Page](images/services.png)

### Patient Registration
![Patient Registration](images/patientregister.png)

### Login
![Login](images/login.png)

### Register
![Register](images/register.png)

---

## (Optional) Backend/API Endpoints
If you wish to showcase your backend endpoints (e.g., Django admin, API docs, or a sample endpoint response), add a screenshot to the `images/` folder (e.g., `api-docs.png`) and reference it here:

```markdown
![API Docs](images/api-docs.png)
```

---

## Getting Started

### Backend Setup
1. Clone the repository and navigate to the backend directory.
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up PostgreSQL and update your `.env` or `settings.py` as needed.
5. Run migrations and create a superuser:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```
6. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `healthcare-frontend-vite` directory:
   ```bash
   cd healthcare-frontend-vite
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend dev server:
   ```bash
   npm run dev
   ```

---

## API Documentation
- The OpenAPI schema is available at `/openapi-schema.yml`.
- You can view interactive API docs at `/api/docs/` when the backend is running.

---

## Folder Structure
```
/healthcare-frontend-vite
  /src
    /components
    /pages
    /services
    /hooks
    /types
  /images
/backend (Django project)
```

---

## Contribution & License
- Contributions are welcome!
- See LICENSE for details.

---


