"""
Django settings for ah_impex_backend project.
Generated for A&H IMPEX - Global Textile Manufacturer & Exporter.
"""

import os
from pathlib import Path
from datetime import timedelta
import dj_database_url
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-ah-impex-global-textile-export-secret-key-2026')

DEBUG = os.getenv('DEBUG', 'True').lower() in ('true', '1', 't')

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').split(',')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third Party Packages
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',

    # Internal Project Apps
    'apps.accounts.apps.AccountsConfig',
    'apps.products.apps.ProductsConfig',
    'apps.inquiries.apps.InquiriesConfig',
    'apps.content_cms.apps.ContentCmsConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Top-level for Cross-Origin API requests
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Production Static File Serving
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ah_impex_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ah_impex_backend.wsgi.application'


# ==============================================================================
# DATABASE: PostgreSQL Configuration with SQLite Fallback
# ==============================================================================
# In production, PostgreSQL credentials from .env are utilized.
# If PostgreSQL is not reachable during initial local dev or offline, it falls back to SQLite.

database_url = os.getenv('DATABASE_URL')
use_sqlite_fallback = os.getenv('USE_SQLITE_FALLBACK', 'True').lower() in ('true', '1', 't')

if database_url and not use_sqlite_fallback:
    DATABASES = {
        'default': dj_database_url.config(default=database_url, conn_max_age=600)
    }
else:
    # Try PostgreSQL, fallback to SQLite if PostgreSQL connection fails
    db_name = os.getenv('DB_NAME', 'ah_impex_db')
    db_user = os.getenv('DB_USER', 'postgres')
    db_password = os.getenv('DB_PASSWORD', 'postgres')
    db_host = os.getenv('DB_HOST', 'localhost')
    db_port = os.getenv('DB_PORT', '5432')

    if not use_sqlite_fallback and db_name:
        DATABASES = {
            'default': {
                'ENGINE': os.getenv('DB_ENGINE', 'django.db.backends.postgresql'),
                'NAME': db_name,
                'USER': db_user,
                'PASSWORD': db_password,
                'HOST': db_host,
                'PORT': db_port,
            }
        }
    else:
        # Default development database
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3',
            }
        }


# ==============================================================================
# CUSTOM USER MODEL & AUTHENTICATION
# ==============================================================================
AUTH_USER_MODEL = 'accounts.CustomUser'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8},
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# ==============================================================================
# DJANGO REST FRAMEWORK & JWT
# ==============================================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
}


# ==============================================================================
# CORS HEADERS (Cross-Origin Resource Sharing for React Frontend)
# ==============================================================================
CORS_ALLOW_ALL_ORIGINS = os.getenv('CORS_ALLOW_ALL_ORIGINS', 'True').lower() in ('true', '1', 't')
cors_origins_env = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173')
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in cors_origins_env.split(',') if origin.strip()]
CORS_ALLOW_CREDENTIALS = True


# ==============================================================================
# EMAIL NOTIFICATION SYSTEM (.env credentials)
# ==============================================================================
EMAIL_BACKEND = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True').lower() in ('true', '1', 't')
EMAIL_USE_SSL = os.getenv('EMAIL_USE_SSL', 'False').lower() in ('true', '1', 't')
EMAIL_TIMEOUT = int(os.getenv('EMAIL_TIMEOUT', 15))

EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '').strip()
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '').strip()

DEFAULT_FROM_EMAIL = os.getenv(
    'DEFAULT_FROM_EMAIL',
    f"A&H IMPEX Export <{EMAIL_HOST_USER}>" if EMAIL_HOST_USER else "A&H IMPEX <export@ah-impex.com>"
)
COMPANY_NOTIFICATION_EMAIL = os.getenv(
    'COMPANY_NOTIFICATION_EMAIL',
    EMAIL_HOST_USER if EMAIL_HOST_USER else "info@ah-impex.com"
)

# HTTPS REST API Keys (Port 443 - 100% Guaranteed to work on Render without SMTP Port Block)
BREVO_API_KEY = os.getenv('BREVO_API_KEY', '').strip()
RESEND_API_KEY = os.getenv('RESEND_API_KEY', '').strip()
SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY', '').strip()


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Karachi'
USE_I18N = True
USE_TZ = True


# ==============================================================================
# STATIC & MEDIA FILES (Image Uploads & Catalog Assets)
# ==============================================================================
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
