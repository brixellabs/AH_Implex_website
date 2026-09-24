"""
Seed database with initial Categories, Products, Company CMS Data, Sample Inquiries,
and 3 Role-Based Users (SuperAdmin, Admin, Client User).
"""

import os
import sys
import django

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ah_impex_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.accounts.models import UserRole
from apps.products.models import Category, Product, ProductImage
from apps.inquiries.models import Inquiry, InquiryStatus
from apps.content_cms.models import CompanyInfo

User = get_user_model()


def seed_all():
    print("[*] Starting A&H IMPEX Database Seeding...\n")

    # -------------------------------------------------------------
    # 1. CREATE 3 ROLES OF USERS
    # -------------------------------------------------------------
    print("[+] Creating Default Role-Based Users...")

    # A. SuperAdmin
    superadmin, created = User.objects.get_or_create(
        username='superadmin',
        defaults={
            'email': 'superadmin@ah-impex.com',
            'first_name': 'Chief',
            'last_name': 'Executive',
            'role': UserRole.SUPERADMIN,
            'is_staff': True,
            'is_superuser': True,
            'company_name': 'A&H IMPEX Head Office',
            'country': 'Pakistan',
            'designation': 'Managing Director / SuperAdmin',
        }
    )
    if created:
        superadmin.set_password('SuperAdmin123!')
        superadmin.save()
        print("  [OK] Created SuperAdmin: username='superadmin', password='SuperAdmin123!' (Role: SUPERADMIN)")
    else:
        print("  [INFO] SuperAdmin already exists.")

    # B. Admin
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@ah-impex.com',
            'first_name': 'Export',
            'last_name': 'Manager',
            'role': UserRole.ADMIN,
            'is_staff': True,
            'is_superuser': False,
            'company_name': 'A&H IMPEX Commercial Operations',
            'country': 'Pakistan',
            'designation': 'Senior Merchandiser & Admin',
        }
    )
    if created:
        admin_user.set_password('Admin123!')
        admin_user.save()
        print("  [OK] Created Admin: username='admin', password='Admin123!' (Role: ADMIN)")
    else:
        print("  [INFO] Admin already exists.")

    # C. Client / Regular User
    client_user, created = User.objects.get_or_create(
        username='client_user',
        defaults={
            'email': 'client@nordichotels.se',
            'first_name': 'Henrik',
            'last_name': 'Larsson',
            'role': UserRole.USER,
            'is_staff': False,
            'is_superuser': False,
            'company_name': 'Nordic Hospitality Group',
            'country': 'Sweden',
            'designation': 'Procurement Director',
        }
    )
    if created:
        client_user.set_password('Client123!')
        client_user.save()
        print("  [OK] Created Client User: username='client_user', password='Client123!' (Role: USER)")
    else:
        print("  [INFO] Client user already exists.")

    # -------------------------------------------------------------
    # 2. SEED CATEGORIES
    # -------------------------------------------------------------
    print("\n[+] Seeding Product Categories...")
    categories_data = [
        {
            'slug': 'home-textiles',
            'label': 'Home Textiles',
            'description': 'Luxury bed linen sets, fitted sheets, duvet covers, pillowcases, and decorative jacquard throws.',
            'icon': 'faBed',
            'order': 1
        },
        {
            'slug': 'apparel-workwear',
            'label': 'Apparel & Workwear',
            'description': 'Heavy-duty industrial twills, flame-retardant overalls, high-visibility jackets, and casual polo knits.',
            'icon': 'faShirt',
            'order': 2
        },
        {
            'slug': 'hospitality-dining',
            'label': 'Hospitality & Dining',
            'description': 'High-density combed cotton bath sheets, anti-chlorine pool towels, and damask hotel table linens.',
            'icon': 'faUtensils',
            'order': 3
        },
        {
            'slug': 'institutional-medical',
            'label': 'Institutional & Medical',
            'description': 'Autoclavable hospital scrubs, barrier drapes, patient gowns, and institutional utility fabrics.',
            'icon': 'faHospital',
            'order': 4
        }
    ]

    for cat_data in categories_data:
        cat, created = Category.objects.get_or_create(
            slug=cat_data['slug'],
            defaults=cat_data
        )
        if created:
            print(f"  [OK] Created Category: {cat.label}")
        else:
            print(f"  [INFO] Category {cat.label} already exists.")

    # -------------------------------------------------------------
    # 3. SEED PRODUCTS
    # -------------------------------------------------------------
    print("\n[+] Seeding Export Products...")
    products_data = [
        {
            'id': 'prod-01',
            'title': '300TC - 1000TC Sateen & Percale Bed Sets',
            'category_slug': 'home-textiles',
            'category_name': 'Home Textiles',
            'badge': 'Luxury Export',
            'tagline': 'High thread count hotel & retail bedding crafted from combed long-staple cotton.',
            'description': 'Our flagship luxury bedding collection features ultra-smooth sateen and crisp matte percale weaves. Mercerized for silky luster and enhanced tensile strength.',
            'image_url': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
            'specs': {
                'composition': '100% Combed Cotton / Cotton-Rich 60/40',
                'gsm': '120 - 180 GSM (Thread Count: 200 - 1000 TC)',
                'moq': '500 Sets / Colorway',
                'leadTime': '30 - 45 Days (FOB Karachi / CIF Global)',
                'packaging': 'Luxury Book-fold or Custom Retail Box'
            },
            'features': [
                'OEKO-TEX Standard 100 Class I Certified',
                'Vat dyed with high wash-fastness (ISO 105-C06)',
                'Preshrunk with Sanforization (< 2% residual shrinkage)'
            ],
            'is_featured': True,
            'order': 1
        },
        {
            'id': 'prod-02',
            'title': 'Heavy-Duty Industrial Workwear & FR Twill',
            'category_slug': 'apparel-workwear',
            'category_name': 'Apparel & Workwear',
            'badge': 'EN ISO 11612 Compliant',
            'tagline': 'Engineered high-durability fabrics for oil & gas, construction, and utilities.',
            'description': 'Precision woven 3/1 and 2/1 twill fabrics engineered for harsh industrial environments. Optional flame-retardant (Proban / Pyrovatex), anti-static (carbon grid), and oil-water repellent finishes.',
            'image_url': 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1200&q=80',
            'specs': {
                'composition': '100% Cotton / 65% Poly 35% Cotton / 99% Cotton 1% Antistatic',
                'gsm': '240 - 350 GSM Heavy Twill',
                'moq': '1,500 Meters / 800 Coveralls',
                'leadTime': '35 - 50 Days',
                'packaging': 'Heavy polythene roll wraps / Export cartons'
            },
            'features': [
                'Tear strength exceeds 25N (ISO 13937-2)',
                'Optional chemical splash and ARC flash protective finishes',
                'Reinforced bar-tacking and triple-needle stitch execution'
            ],
            'is_featured': True,
            'order': 2
        },
        {
            'id': 'prod-03',
            'title': '550 - 700 GSM Combed Ring-Spun Hotel Towels',
            'category_slug': 'hospitality-dining',
            'category_name': 'Hospitality & Dining',
            'badge': '5-Star Resort Grade',
            'tagline': 'Plush, ultra-absorbent terry towelling with reinforced double-stitched borders.',
            'description': 'Designed specifically for high-turnover industrial laundering in 5-star hotel chains and luxury spas. Woven from 100% 2-ply ring-spun combed loops for maximum fluffiness and absorption.',
            'image_url': 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=1200&q=80',
            'specs': {
                'composition': '100% Pakistani / Giza Long-Staple Cotton',
                'gsm': '500, 600, 650, 700 GSM Heavyweight Terry',
                'moq': '1,000 Pcs per Size / Custom Border',
                'leadTime': '30 - 40 Days',
                'packaging': 'Compressed export bale / Master cartons'
            },
            'features': [
                'Double-needle lockstitched hems to prevent unraveling',
                'Chlorine & peroxide resistant vat dyeing',
                'Exceptional water absorption speed (< 3 seconds)'
            ],
            'is_featured': True,
            'order': 3
        },
        {
            'id': 'prod-04',
            'title': 'Autoclavable Hospital Scrubs & Barrier Drapes',
            'category_slug': 'institutional-medical',
            'category_name': 'Institutional & Medical',
            'badge': 'Medical Grade',
            'tagline': 'Antimicrobial, bleach-safe fabrics for hospital systems and surgical centers.',
            'description': 'Medical grade poplin and twill fabrics treated with Silvadur antimicrobial finish. Highly resistant to repeated high-temperature industrial autoclave cycles and chlorine washing.',
            'image_url': 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=80',
            'specs': {
                'composition': '65% Poly 35% Cotton Poplin / 50-50 CVC',
                'gsm': '145 - 190 GSM Poplin / Micro-weave',
                'moq': '1,000 Sets',
                'leadTime': '30 Days',
                'packaging': 'Clean polybagged sets / Master hospital crates'
            },
            'features': [
                'Withstands 75°C+ high temperature wash cycles',
                'Fluid-repellent fluorocarbon barrier finish available',
                'Lint-free spun yarns for clean surgical environments'
            ],
            'is_featured': True,
            'order': 4
        }
    ]

    for p_data in products_data:
        cat_slug = p_data.pop('category_slug', None)
        category_obj = Category.objects.filter(slug=cat_slug).first() if cat_slug else None
        
        prod, created = Product.objects.get_or_create(
            id=p_data['id'],
            defaults={
                'title': p_data['title'],
                'category': category_obj,
                'category_name': p_data['category_name'],
                'badge': p_data['badge'],
                'tagline': p_data['tagline'],
                'description': p_data['description'],
                'image_url': p_data['image_url'],
                'specs': p_data['specs'],
                'features': p_data['features'],
                'is_featured': p_data.get('is_featured', False),
                'order': p_data.get('order', 0)
            }
        )
        if created:
            print(f"  [OK] Created Product: {prod.title}")
        else:
            print(f"  [INFO] Product {prod.title} already exists.")

    # -------------------------------------------------------------
    # 4. SEED COMPANY CMS INFO
    # -------------------------------------------------------------
    print("\n[+] Seeding Company CMS Settings...")
    company_info = CompanyInfo.load()
    company_info.name = 'A&H IMPEX'
    company_info.legal_name = 'A&H Impex Global Textile Exporters (Pvt.) Ltd.'
    company_info.tagline = 'Pakistan’s Premier Textile Manufacturer & Global Exporter'
    company_info.eyebrow = 'Institutional Bedding • Hospitality Linens • Workwear Textiles'
    company_info.hero_description = 'Vertically integrated spinning, weaving, eco-dyeing, and precision automated stitching mill delivering container-grade textile shipments to North America, Europe, Oceania, and the GCC.'
    company_info.contact = {
        'email': 'info@ah-impex.com',
        'phone': '+92 41 854 1234',
        'phoneRaw': '+92418541234',
        'whatsapp': '+92 300 8661234',
        'whatsappClean': '923008661234',
        'address': 'Mill Sector 4, Khurrianwala Industrial Zone, Faisalabad, Punjab, Pakistan',
        'addressNote': 'Direct Access to M-4 Motorway & Dry Port Clearance Terminals',
        'workingHours': 'Monday - Saturday: 08:30 - 18:30 (PKT / UTC+5)',
        'emergencyNotice': '24/7 Priority Emergency Port-Loading & Vessel Logistics Dispatch Desk Active'
    }
    company_info.socials = {
        'whatsapp': 'https://wa.me/923008661234',
        'linkedin': 'https://www.linkedin.com/company/ah-impex',
        'instagram': 'https://www.instagram.com/ahimpextextiles',
        'facebook': 'https://www.facebook.com/ahimpextextiles',
        'youtube': 'https://www.youtube.com/@ahimpextextiles'
    }
    company_info.stats = {
        'experienceYears': '28+',
        'exportCountries': '42+',
        'monthlyCapacity': '1.8M',
        'complianceRate': '99.8%',
        'spindles': '85,000+',
        'airJetLooms': '340+'
    }
    company_info.save()
    print("  [OK] Company CMS Content Initialized.")

    # -------------------------------------------------------------
    # 5. SEED INITIAL SAMPLE RFQ INQUIRY
    # -------------------------------------------------------------
    print("\n[+] Seeding Sample Commercial Inquiry...")
    inquiry, created = Inquiry.objects.get_or_create(
        id='inq-101',
        defaults={
            'user': client_user,
            'name': 'Henrik Larsson',
            'company': 'Nordic Hospitality Group (Sweden)',
            'email': 'client@nordichotels.se',
            'phone': '+46 8 123 4567',
            'category': 'Hospitality & Dining',
            'product_title': 'Hotel & Resort Luxury Linens',
            'volume': '1x 20ft Container (FCL)',
            'port': 'Port of Gothenburg / Sweden',
            'notes': 'Looking for 300TC white sateen duvet covers and 600 GSM bath sheet samples with OEKO-TEX certificate.',
            'status': InquiryStatus.UNDER_REVIEW
        }
    )
    if created:
        print(f"  [OK] Created Sample Inquiry #{inquiry.id}")
    else:
        print(f"  [INFO] Inquiry #{inquiry.id} already exists.")

    print("\n[SUCCESS] Database Seeding Completed Successfully!")
    print("\nCredentials for testing:")
    print("  SuperAdmin: username='superadmin', password='SuperAdmin123!' (Role: SUPERADMIN)")
    print("  Admin:      username='admin',      password='Admin123!'      (Role: ADMIN)")
    print("  Client:     username='client_user',password='Client123!'     (Role: USER)")


if __name__ == '__main__':
    seed_all()
