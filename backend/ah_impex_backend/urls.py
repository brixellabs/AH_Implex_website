"""
Master URL configuration for ah_impex_backend.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    """
    API Root endpoint providing documentation and health status of the A&H IMPEX Backend.
    """
    return Response({
        "service": "A&H IMPEX Global Textile Exporter API",
        "version": "1.0.0",
        "status": "Operational",
        "endpoints": {
            "authentication": {
                "login": "/api/auth/login/",
                "register": "/api/auth/register/",
                "refresh_token": "/api/auth/token/refresh/",
                "current_user": "/api/auth/me/",
                "role_check": "/api/auth/role/",
                "change_password": "/api/auth/change-password/"
            },
            "superadmin_user_management": {
                "users_list_create": "/api/users/",
                "user_detail": "/api/users/<id>/",
                "set_user_role": "/api/users/<id>/set-role/"
            },
            "catalog": {
                "categories": "/api/categories/",
                "products": "/api/products/",
                "product_image_upload": "/api/products/<product_id>/upload-image/"
            },
            "rfq_and_inquiries": {
                "submit_or_list_inquiries": "/api/inquiries/",
                "inquiry_detail": "/api/inquiries/<id>/"
            },
            "content_cms": {
                "company_details": "/api/company/",
                "dashboard_summary": "/api/dashboard/summary/"
            }
        }
    })


urlpatterns = [
    # Django Built-in Admin Interface
    path('admin/', admin.site.urls),

    # API Root Health Check
    path('api/', api_root, name='api_root'),

    # Application Endpoints
    path('api/', include('apps.accounts.urls', namespace='accounts')),
    path('api/', include('apps.products.urls', namespace='products')),
    path('api/', include('apps.inquiries.urls', namespace='inquiries')),
    path('api/', include('apps.content_cms.urls', namespace='content_cms')),
]

# Serve Media and Static files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
