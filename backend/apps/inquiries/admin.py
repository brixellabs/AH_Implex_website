from django.contrib import admin
from .models import Inquiry

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ['id', 'company', 'name', 'email', 'category', 'status', 'email_sent_to_company', 'created_at']
    list_filter = ['status', 'category', 'email_sent_to_company', 'created_at']
    search_fields = ['id', 'company', 'name', 'email', 'phone', 'product_title', 'notes']
    readonly_fields = ['id', 'created_at', 'updated_at', 'email_sent_to_company', 'email_sent_to_client']
    list_editable = ['status']
