from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from apps.accounts.permissions import IsAdmin, IsAdminOrReadOnly
from apps.accounts.models import UserRole
from apps.products.models import Product, Category
from apps.inquiries.models import Inquiry, InquiryStatus
from apps.inquiries.serializers import InquirySerializer
from .models import CompanyInfo
from .serializers import CompanyInfoSerializer

User = get_user_model()


class CompanyInfoView(views.APIView):
    """
    - GET: Public access to live CMS company content.
    - PUT/PATCH: SuperAdmin / Admin update company details.
    """
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request):
        company = CompanyInfo.load()
        serializer = CompanyInfoSerializer(company)
        return Response(serializer.data)

    def patch(self, request):
        company = CompanyInfo.load()
        serializer = CompanyInfoSerializer(company, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def put(self, request):
        company = CompanyInfo.load()
        serializer = CompanyInfoSerializer(company, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class DashboardSummaryView(views.APIView):
    """
    SuperAdmin & Admin Dashboard Overview API:
    Returns aggregate statistics, inquiries metrics, inventory counts, user counts by role, and recent RFQs.
    """
    permission_classes = [IsAdmin]

    def get(self, request):
        total_products = Product.objects.count()
        active_products = Product.objects.filter(is_active=True).count()
        featured_products = Product.objects.filter(is_featured=True).count()
        total_categories = Category.objects.count()

        total_inquiries = Inquiry.objects.count()
        new_inquiries = Inquiry.objects.filter(status=InquiryStatus.NEW).count()
        under_review_inquiries = Inquiry.objects.filter(status=InquiryStatus.UNDER_REVIEW).count()
        quoted_inquiries = Inquiry.objects.filter(status=InquiryStatus.QUOTED).count()
        closed_inquiries = Inquiry.objects.filter(status=InquiryStatus.CLOSED).count()

        total_users = User.objects.count()
        superadmin_count = User.objects.filter(role=UserRole.SUPERADMIN).count()
        admin_count = User.objects.filter(role=UserRole.ADMIN).count()
        regular_user_count = User.objects.filter(role=UserRole.USER).count()

        recent_inquiries = Inquiry.objects.all().order_by('-created_at')[:5]
        recent_inquiries_data = InquirySerializer(recent_inquiries, many=True).data

        return Response({
            "metrics": {
                "products": {
                    "total": total_products,
                    "active": active_products,
                    "featured": featured_products
                },
                "categories": {
                    "total": total_categories
                },
                "inquiries": {
                    "total": total_inquiries,
                    "new": new_inquiries,
                    "under_review": under_review_inquiries,
                    "quoted": quoted_inquiries,
                    "closed": closed_inquiries
                },
                "users": {
                    "total": total_users,
                    "superadmins": superadmin_count,
                    "admins": admin_count,
                    "clients": regular_user_count
                }
            },
            "recent_inquiries": recent_inquiries_data,
            "system": {
                "api_status": "Online",
                "database_engine": "PostgreSQL Ready",
                "email_service": "Active"
            }
        })
