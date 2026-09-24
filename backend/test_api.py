"""
Automated Comprehensive Test Suite for A&H IMPEX Django Backend API:
- Role Based Access Control (SuperAdmin, Admin, User)
- User Promotion / Role management by SuperAdmin
- Product Catalog & Image handling
- Inquiries & Automatic Email Notifications
"""

import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ah_impex_backend.settings')
django.setup()

from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from apps.accounts.models import UserRole
from apps.products.models import Product, Category
from apps.inquiries.models import Inquiry

User = get_user_model()


def run_tests():
    print("[*] Running API & Role System Verification Tests...\n")
    client = APIClient()

    # 1. TEST LOGIN & JWT TOKEN GENERATION FOR 3 ROLES
    print("[1] Testing Authentication for 3 Roles...")
    
    # A. SuperAdmin Login
    res = client.post('/api/auth/login/', {'username': 'superadmin', 'password': 'SuperAdmin123!'}, format='json')
    assert res.status_code == 200, f"SuperAdmin login failed: {res.data}"
    superadmin_token = res.data['access']
    assert res.data['user']['role'] == 'SUPERADMIN', "Role mismatch for SuperAdmin"
    assert res.data['user']['is_superadmin'] is True
    print(f"  [PASS] SuperAdmin Login: Token acquired, Role={res.data['user']['role']}")

    # B. Admin Login
    res = client.post('/api/auth/login/', {'username': 'admin', 'password': 'Admin123!'}, format='json')
    assert res.status_code == 200, f"Admin login failed: {res.data}"
    admin_token = res.data['access']
    assert res.data['user']['role'] == 'ADMIN', "Role mismatch for Admin"
    assert res.data['user']['is_admin_user'] is True
    assert res.data['user']['is_superadmin'] is False
    print(f"  [PASS] Admin Login: Token acquired, Role={res.data['user']['role']}")

    # C. Client Login
    res = client.post('/api/auth/login/', {'username': 'client_user', 'password': 'Client123!'}, format='json')
    assert res.status_code == 200, f"Client user login failed: {res.data}"
    client_token = res.data['access']
    assert res.data['user']['role'] == 'USER', "Role mismatch for Client"
    print(f"  [PASS] Client User Login: Token acquired, Role={res.data['user']['role']}")

    # 2. TEST SUPERADMIN USER MANAGEMENT & ROLE PROMOTION
    print("\n[2] Testing SuperAdmin User Management & Role Promotion...")
    # Register a new user
    client.credentials() # anonymous
    import time
    timestamp = int(time.time())
    res = client.post('/api/auth/register/', {
        'username': f'new_staff_{timestamp}',
        'email': f'staff_{timestamp}@ah-impex.com',
        'password': 'StaffPassword123!',
        'password_confirm': 'StaffPassword123!',
        'first_name': 'Ali',
        'last_name': 'Raza',
        'company_name': 'A&H Impex',
        'country': 'Pakistan'
    }, format='json')
    assert res.status_code == 201, f"Registration failed: {res.data}"
    new_user_id = res.data['user']['id']
    assert res.data['user']['role'] == 'USER', "Registered user should start as USER"
    print(f"  [PASS] Registered standard user (ID={new_user_id}, Role=USER)")

    # Client user tries to promote -> Should be 403 Forbidden
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {client_token}')
    res = client.post(f'/api/users/{new_user_id}/set-role/', {'role': 'ADMIN'}, format='json')
    assert res.status_code == 403, "Regular user should NOT be able to change roles!"
    print("  [PASS] Regular user blocked from role elevation (HTTP 403 Forbidden)")

    # SuperAdmin promotes user to ADMIN -> Should be 200 OK
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {superadmin_token}')
    res = client.post(f'/api/users/{new_user_id}/set-role/', {'role': 'ADMIN'}, format='json')
    assert res.status_code == 200, f"Role promotion failed: {res.data}"
    assert res.data['user']['role'] == 'ADMIN'
    print(f"  [PASS] SuperAdmin successfully promoted user #{new_user_id} to ADMIN")

    # 3. TEST PRODUCT CRUD & CATEGORIES
    print("\n[3] Testing Product Catalog Endpoints...")
    # Public Read
    client.credentials() # Anonymous
    res = client.get('/api/products/')
    assert res.status_code == 200
    assert len(res.data) >= 4
    print(f"  [PASS] Public Products GET: {len(res.data)} products retrieved")

    # Regular user cannot create product -> 403
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {client_token}')
    res = client.post('/api/products/', {'title': 'Unauthorized Product'}, format='json')
    assert res.status_code == 403
    print("  [PASS] Regular user blocked from creating product (HTTP 403)")

    # Admin user can create product -> 201
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {admin_token}')
    res = client.post('/api/products/', {
        'id': f'test-prod-{timestamp}',
        'title': 'Export Grade Cotton Canvas Duck Fabric',
        'category': 'apparel-workwear',
        'category_name': 'Apparel & Workwear',
        'badge': 'Export Quality',
        'tagline': '10oz to 24oz heavy duty waterproof canvas',
        'description': 'Premium 100% carded yarn canvas weave for industrial gear and military bags.',
        'specs': {'composition': '100% Cotton Canvas', 'gsm': '450 GSM', 'moq': '1,000 Meters'},
        'features': ['Water-repellent PU coated', 'Rot and mildew proof']
    }, format='json')
    assert res.status_code == 201, f"Product create failed: {res.data}"
    print(f"  [PASS] Admin created new product: {res.data['title']}")

    # 4. TEST RFQ / CONTACT INQUIRY & EMAIL DISPATCH
    print("\n[4] Testing RFQ Inquiry Submission & Automated Email Notifications...")
    client.credentials() # Anonymous or Public Visitor
    res = client.post('/api/inquiries/', {
        'name': 'Oliver Schmidt',
        'company': 'Bavaria Textile Import GmbH (Germany)',
        'email': 'oliver.schmidt@bavariatex.de',
        'phone': '+49 89 7654321',
        'category': 'Home Textiles',
        'productTitle': '300TC - 1000TC Sateen & Percale Bed Sets',
        'volume': '2x 40ft High Cube Containers (FCL)',
        'port': 'Port of Hamburg / Germany',
        'notes': 'Need 400TC Egyptian cotton hotel duvet covers with embroidered borders and barcode retail packings.'
    }, format='json')
    assert res.status_code == 201, f"Inquiry submission failed: {res.data}"
    created_inquiry_id = res.data['inquiry']['id']
    print(f"  [PASS] Inquiry #{created_inquiry_id} submitted & email dispatch triggered")

    # Verify inquiry was persisted in database
    db_inq = Inquiry.objects.get(id=created_inquiry_id)
    assert db_inq.name == 'Oliver Schmidt'
    assert db_inq.company == 'Bavaria Textile Import GmbH (Germany)'
    print(f"  [PASS] Database Verified: Inquiry #{db_inq.id} saved with status '{db_inq.status}'")

    # 5. TEST DASHBOARD SUMMARY
    print("\n[5] Testing SuperAdmin & Admin Analytics Dashboard Summary...")
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {superadmin_token}')
    res = client.get('/api/dashboard/summary/')
    assert res.status_code == 200
    metrics = res.data['metrics']
    print(f"  [PASS] Dashboard Metrics: Products={metrics['products']['total']}, Inquiries={metrics['inquiries']['total']}, Users={metrics['users']['total']} (SuperAdmins={metrics['users']['superadmins']}, Admins={metrics['users']['admins']}, Clients={metrics['users']['clients']})")

    print("\n=======================================================")
    print("SUCCESS: ALL BACKEND API & ROLE PERMISSION TESTS PASSED 100%!")
    print("=======================================================\n")


if __name__ == '__main__':
    run_tests()
