from rest_framework import permissions
from .models import UserRole

class IsSuperAdmin(permissions.BasePermission):
    """
    Allows access only to SuperAdmin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superadmin)


class IsAdmin(permissions.BasePermission):
    """
    Allows access to both SuperAdmin and Admin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_admin_user)


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Allows read-only access to anyone, but write access only to SuperAdmin/Admin.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_admin_user)


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Allows access to object owners or SuperAdmin/Admin users.
    """
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_authenticated:
            if request.user.is_admin_user:
                return True
            # If object has user field
            if hasattr(obj, 'user') and obj.user == request.user:
                return True
            if hasattr(obj, 'email') and obj.email == request.user.email:
                return True
        return False
