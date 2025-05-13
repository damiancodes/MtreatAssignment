# Healthcare Platform

A full-stack healthcare platform built with Django REST Framework (DRF), PostgreSQL, and React (TypeScript, Material-UI).

---

## Backend Setup

1. **Clone the repository and enter the project directory:**
   ```bash
   git clone <your-repo-url>
   cd Mtreatinteriewreact
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database:**
   - Create a database named `healthcare_db`.
   - Default credentials (see `settings.py`):
     - **Host:** localhost
     - **Port:** 5432
     - **Database:** healthcare_db
     - **Username:** postgres
     - **Password:** mtreat123

   You can use [DBeaver](https://dbeaver.io/) or [pgAdmin](https://www.pgadmin.org/) to connect:
   - **DBeaver:**
     - New Connection → PostgreSQL
     - Host: `localhost`, Port: `5432`, Database: `healthcare_db`, User: `postgres`, Password: `mtreat123`
   - **pgAdmin:**
     - Add New Server → Connection → Same details as above

5. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser:**
   ```bash
   python manage.py createsuperuser --email damian@gmail.com
   # Password: pascal123
   ```

7. **Add mock data for healthcare services:**
   ```bash
   python manage.py shell -c "from services.models import Service; Service.objects.bulk_create([Service(name='General Consultation', description='Consult with a general physician.'), Service(name='Pediatrics', description='Child health and wellness services.'), Service(name='Dental Care', description='Comprehensive dental checkups and treatments.')])"
   ```

8. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

---

## API Endpoints

### Authentication
- `POST /api/token/` — Obtain JWT token
- `POST /api/token/refresh/` — Refresh JWT token
- `POST /auth/jwt/create/` — Obtain JWT token (Djoser)
- `POST /auth/jwt/refresh/` — Refresh JWT token (Djoser)

### Patients
- `POST /api/patients/` — Register new patient
- `GET /api/patients/` — List patients (**requires authentication**)

### Services
- `GET /api/services/` — List healthcare services (**public, no authentication required**)

### User
- `GET /auth/users/me/` — Get current user profile (**requires authentication**)

---

## API Documentation

- **OpenAPI/Swagger schema:**
  - You can generate the OpenAPI schema with:
    ```bash
    python manage.py generateschema --file openapi-schema.yml
    ```
  - The generated `openapi-schema.yml` can be viewed with Swagger UI, ReDoc, or any OpenAPI tool.

---

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd healthcare-frontend-vite
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the frontend dev server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. **Frontend will be available at** `http://localhost:5173/` (or as shown in the terminal).

---

## Features
- JWT Authentication (DRF SimpleJWT & Djoser)
- Patient Registration
- Healthcare Services Listing
- PostgreSQL Database
- RESTful API Design
- Admin panel at `/admin/` (login with superuser)
- API documentation via OpenAPI/Swagger

---

## Useful Management Commands
- `python manage.py migrate` — Apply migrations
- `python manage.py createsuperuser` — Create admin user
- `python manage.py shell` — Open Django shell
- `python manage.py runserver` — Start dev server

---

## Submission
- Push your code to GitHub and share the repository link.
- Include this README and ensure all instructions work from a clean setup.
- For any issues, contact: pascal@m-treat.com

---

**Good luck!** 