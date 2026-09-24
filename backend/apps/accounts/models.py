from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserRole(models.TextChoices):
    SUPERADMIN = 'SUPERADMIN', _('Super Admin')
    ADMIN = 'ADMIN', _('Admin')
    USER = 'USER', _('User')


class CustomUser(AbstractUser):
    """
    Custom User model supporting 3 distinct roles:
    1. SUPERADMIN: Full control over admin dashboard, can create/promote Admins, manage all content & users.
    2. ADMIN: Staff access to manage products, categories, content, inquiries.
    3. USER: Standard client/customer who can submit RFQ, view products, track inquiries.
    """
    email = models.EmailField(_('email address'), unique=True)
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.USER,
        help_text=_('User role determining system privileges: SUPERADMIN, ADMIN, or USER.')
    )
    phone = models.CharField(max_length=30, blank=True, null=True, help_text=_('Contact phone or WhatsApp'))
    company_name = models.CharField(max_length=200, blank=True, null=True, help_text=_('Business / Enterprise name'))
    country = models.CharField(max_length=100, blank=True, null=True)
    designation = models.CharField(max_length=150, blank=True, null=True, help_text=_('Job title (e.g. Procurement Manager)'))
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        ordering = ['-date_joined']

    @property
    def is_superadmin(self) -> bool:
        return self.role == UserRole.SUPERADMIN or self.is_superuser

    @property
    def is_admin_user(self) -> bool:
        return self.role in [UserRole.SUPERADMIN, UserRole.ADMIN] or self.is_staff or self.is_superuser

    @property
    def is_regular_user(self) -> bool:
        return self.role == UserRole.USER

    def save(self, *args, **kwargs):
        # Auto-sync Django built-in permission flags with role
        if self.is_superuser:
            self.role = UserRole.SUPERADMIN
            self.is_staff = True
        elif self.role == UserRole.SUPERADMIN:
            self.is_staff = True
            self.is_superuser = True
        elif self.role == UserRole.ADMIN:
            self.is_staff = True
            self.is_superuser = False
        else: # USER
            self.is_staff = False
            self.is_superuser = False
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()}) - {self.email}"
