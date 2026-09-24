from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    RegisterView,
    UserProfileView,
    ChangePasswordView,
    SuperAdminUserListCreateView,
    SuperAdminUserDetailView,
    SetUserRoleView,
    CurrentUserRoleCheckView
)

app_name = 'accounts'

urlpatterns = [
    # Authentication
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/me/', UserProfileView.as_view(), name='profile'),
    path('auth/role/', CurrentUserRoleCheckView.as_view(), name='role_check'),
    path('auth/change-password/', ChangePasswordView.as_view(), name='change_password'),

    # SuperAdmin User & Role Management
    path('users/', SuperAdminUserListCreateView.as_view(), name='user_list_create'),
    path('users/<int:pk>/', SuperAdminUserDetailView.as_view(), name='user_detail'),
    path('users/<int:pk>/set-role/', SetUserRoleView.as_view(), name='set_user_role'),
]
