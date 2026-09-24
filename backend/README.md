# 🏛️ A&H IMPEX - Django REST API Backend

Production-ready Django backend for **A&H IMPEX** (Global Textile Manufacturer & Exporter), featuring **PostgreSQL**, **3-tier Role-Based Access Control (SuperAdmin, Admin, User)**, **Dynamic Product Catalog with Image Handling**, and **Automated SMTP Email Dispatch** for incoming RFQ Inquiries.

---

## 🚀 Key Features

1. **3 User Roles & Permissions**:
   - 👑 **SuperAdmin**: Full control over system, admin dashboard, user role management (promote/demote users to Admin status, create new Admin accounts, delete users, and manage all site content).
   - 🛡️ **Admin**: Staff-level access to create/update/delete products, handle high-res image uploads, manage categories, review and update buyer RFQ inquiries, and update CMS copy.
   - 👤 **User (Client/Buyer)**: Can register, submit RFQ inquiries, receive automated email confirmations, and track their quotation history.

2. **PostgreSQL Database Support**:
   - Fully configured for PostgreSQL with `psycopg2-binary` & `dj-database-url`.
   - `.env` controls `DATABASE_URL` and standard DB parameters.
   - Includes automatic SQLite fallback for instant local development.

3. **Automated RFQ Email Dispatch**:
   - When a user submits an RFQ or contact form:
     - 📧 Sends rich HTML formatted email notification with full client specifications to the company commercial desk (`COMPANY_NOTIFICATION_EMAIL`).
     - 📨 Sends an automated branded acknowledgment receipt to the client's email.
   - All email credentials (`EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `EMAIL_PORT`, etc.) are securely stored in `.env`.

4. **Product Image & Media Management**:
   - Supports direct file uploads (JPG, PNG, WebP) to Django media storage.
   - Product gallery images model (`ProductImage`) and cover image (`featured_image`).
   - Pillow image processing and automatic URL serialization for React frontend.

---

## ⚙️ Quick Start Guide

### 1. Activate Virtual Environment
```bash
# Windows
backend\venv\Scripts\activate

# macOS / Linux
source backend/venv/bin/activate
```

### 2. Install Dependencies (If setting up fresh)
```bash
pip install -r backend/requirements.txt
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env` inside `backend/`:
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env` with your PostgreSQL database credentials and SMTP email settings.

### 4. Run Migrations & Seed Database
```bash
python backend/manage.py migrate
python backend/seed_data.py
```

### 5. Start Django Development Server
```bash
python backend/manage.py runserver 8000
```
API Root: `http://127.0.0.1:8000/api/`  
Django Admin: `http://127.0.0.1:8000/admin/`

---

## 🔑 Default Credentials (from `seed_data.py`)

| Role | Username | Email | Password | Privileges |
|---|---|---|---|---|
| **SuperAdmin** | `superadmin` | `superadmin@ah-impex.com` | `SuperAdmin123!` | Full Master Control & User Promotion |
| **Admin** | `admin` | `admin@ah-impex.com` | `Admin123!` | Catalog & RFQ Management |
| **Client User**| `client_user`| `client@nordichotels.se` | `Client123!` | Inquiry Submission & Tracking |

---

## 📡 Core API Endpoints

### 🔐 Authentication & Users
- `POST /api/auth/login/` — Returns JWT tokens + user role profile
- `POST /api/auth/register/` — Client user self-registration
- `GET /api/auth/me/` — Current logged-in user profile
- `POST /api/auth/token/refresh/` — Refresh expired JWT token
- `GET /api/users/` — *(SuperAdmin only)* List all users
- `POST /api/users/<id>/set-role/` — *(SuperAdmin only)* Promote/demote user to `ADMIN` or `SUPERADMIN`

### 📦 Products & Categories
- `GET /api/products/` — List active export products (with category & search filters)
- `POST /api/products/` — *(Admin/SuperAdmin)* Create product with specifications
- `GET /api/products/<id>/` — Product details
- `PATCH /api/products/<id>/` — *(Admin/SuperAdmin)* Update product & image
- `DELETE /api/products/<id>/` — *(Admin/SuperAdmin)* Delete product
- `POST /api/products/<id>/upload-image/` — *(Admin/SuperAdmin)* Upload gallery image
- `GET /api/categories/` — List product categories

### 📨 Inquiries & Email Notifications
- `POST /api/inquiries/` — *(Public)* Submit RFQ -> **Dispatches Email to Company & Client**
- `GET /api/inquiries/` — List inquiries (*Admin sees all; User sees own*)
- `PATCH /api/inquiries/<id>/` — *(Admin)* Update inquiry status (`Under Review`, `Quoted`, `Closed`)

### 🏢 CMS & Analytics
- `GET /api/company/` — Public company CMS content & contact info
- `PATCH /api/company/` — *(Admin)* Update hero copy & contact numbers
- `GET /api/dashboard/summary/` — *(Admin/SuperAdmin)* Analytics summary metrics
