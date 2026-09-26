from django.db import models
from rest_framework import generics, status, permissions, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from apps.accounts.permissions import IsAdmin, IsOwnerOrAdmin
from .models import Inquiry
from .serializers import (
    InquirySerializer,
    InquiryCreateSerializer,
    InquiryStatusUpdateSerializer
)
from .services import send_inquiry_email_notifications


class InquiryListCreateView(generics.ListCreateAPIView):
    """
    - GET: List inquiries.
      - SuperAdmin/Admin sees all inquiries.
      - Regular authenticated user sees only their own inquiries.
    - POST: Public / AllowAny. Submits RFQ & automatically dispatches email notification to company and confirmation to client.
    """
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'category']
    search_fields = ['name', 'company', 'email', 'phone', 'product_title', 'notes']
    ordering_fields = ['created_at', 'status', 'company']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Inquiry.objects.none()
        if user.is_admin_user:
            return Inquiry.objects.all().order_by('-created_at')
        # Regular user sees inquiries linked to their user account or email
        return Inquiry.objects.filter(models.Q(user=user) | models.Q(email__iexact=user.email)).order_by('-created_at')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return InquiryCreateSerializer
        return InquirySerializer

    def create(self, request, *args, **kwargs):
        # Support both camelCase and snake_case in input
        data = request.data.copy() if hasattr(request.data, 'copy') else dict(request.data)
        if 'productTitle' in data and 'product_title' not in data:
            data['product_title'] = data['productTitle']

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user if request.user.is_authenticated else None
        inquiry = serializer.save(user=user)

        # Trigger Automated Email Notifications to Company & Client
        try:
            send_inquiry_email_notifications(inquiry)
        except Exception as e:
            import logging
            logging.getLogger(__name__).error(f"❌ Failed to dispatch email notification: {str(e)}", exc_info=True)
            print(f"❌ [Email Dispatch Exception] {str(e)}")

        read_serializer = InquirySerializer(inquiry)
        return Response({
            "message": "Your Request for Quote has been received. Our export desk has been notified via email.",
            "inquiry": read_serializer.data
        }, status=status.HTTP_201_CREATED)


class InquiryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    - GET: SuperAdmin / Admin or Inquiry owner.
    - PATCH/PUT: SuperAdmin / Admin update status / notes.
    - DELETE: SuperAdmin / Admin delete inquiry.
    """
    queryset = Inquiry.objects.all()
    lookup_field = 'id'

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdmin()]
        return [IsOwnerOrAdmin()]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return InquiryStatusUpdateSerializer
        return InquirySerializer
