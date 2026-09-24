from rest_framework import serializers
from .models import Inquiry


class InquirySerializer(serializers.ModelSerializer):
    productTitle = serializers.CharField(source='product_title', required=False, allow_blank=True)
    date = serializers.CharField(read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Inquiry
        fields = [
            'id', 'user', 'user_email', 'name', 'company', 'email', 'phone',
            'category', 'product_title', 'productTitle', 'volume', 'port',
            'notes', 'status', 'internal_notes', 'email_sent_to_company',
            'email_sent_to_client', 'date', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'email_sent_to_company', 'email_sent_to_client', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Handle productTitle if provided in camelCase
        if 'product_title' not in validated_data and 'productTitle' in self.initial_data:
            validated_data['product_title'] = self.initial_data['productTitle']
        return super().create(validated_data)


class InquiryCreateSerializer(serializers.ModelSerializer):
    """
    Public RFQ & Contact submission serializer.
    Accepts both snake_case and camelCase for seamless React frontend integration.
    """
    productTitle = serializers.CharField(source='product_title', required=False, allow_blank=True)

    class Meta:
        model = Inquiry
        fields = [
            'id', 'name', 'company', 'email', 'phone', 'category',
            'product_title', 'productTitle', 'volume', 'port', 'notes'
        ]
        read_only_fields = ['id']


class InquiryStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['status', 'internal_notes']
