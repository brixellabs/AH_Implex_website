from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'role', 'company_name', 'country', 'is_active', 'is_staff', 'date_joined']
    list_filter = ['role', 'is_active', 'is_staff', 'country']
    search_fields = ['username', 'email', 'company_name', 'phone']
    ordering = ['-date_joined']

    fieldsets = UserAdmin.fieldsets + (
        ('Custom Profile & Role Information', {
            'fields': ('role', 'phone', 'company_name', 'country', 'designation', 'avatar', 'is_verified'),
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Profile & Role Information', {
            'fields': ('email', 'role', 'phone', 'company_name', 'country', 'designation'),
        }),
    )
