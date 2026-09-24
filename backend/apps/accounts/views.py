from rest_framework import generics, status, views, permissions, filters
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from .models import UserRole
from .permissions import IsSuperAdmin, IsAdmin
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserSerializer,
    UserRegistrationSerializer,
    AdminCreateUserSerializer,
    UserRoleUpdateSerializer,
    ChangePasswordSerializer
)

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Login endpoint: Validates credentials and returns JWT tokens along with detailed user & role info.
    """
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """
    Public registration endpoint for standard Users / Clients.
    """
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_data = UserSerializer(user).data
        return Response({
            "message": "User registered successfully.",
            "user": user_data
        }, status=status.HTTP_201_CREATED)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Get or update currently authenticated user's profile.
    """
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(views.APIView):
    """
    Endpoint for authenticated user to change their password.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({"old_password": ["Current password is not correct."]}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)


# ============================================================================
# SUPERADMIN ONLY: USER MANAGEMENT & ROLE ASSIGNMENT
# ============================================================================

class SuperAdminUserListCreateView(generics.ListCreateAPIView):
    """
    SuperAdmin View:
    - GET: List all users, filter by role (SUPERADMIN, ADMIN, USER) or active status, search by name/email/company.
    - POST: SuperAdmin can directly create an Admin or SuperAdmin or Client user.
    """
    permission_classes = [IsSuperAdmin]
    queryset = User.objects.all().order_by('-date_joined')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['role', 'is_active', 'is_staff']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'company_name']
    ordering_fields = ['date_joined', 'username', 'role']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AdminCreateUserSerializer
        return UserSerializer


class SuperAdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    SuperAdmin View:
    - GET: View any user's profile.
    - PUT/PATCH: Update user details or role.
    - DELETE: Delete user account (prevents deleting oneself).
    """
    permission_classes = [IsSuperAdmin]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def destroy(self, request, *args, **kwargs):
        user_to_delete = self.get_object()
        if user_to_delete.id == request.user.id:
            return Response({"detail": "SuperAdmin cannot delete their own account."}, status=status.HTTP_400_BAD_REQUEST)
        return super().destroy(request, *args, **kwargs)


class SetUserRoleView(views.APIView):
    """
    SuperAdmin View to easily update a user's role (e.g. Promote to ADMIN, demote to USER, etc.)
    Payload: {"role": "ADMIN" | "SUPERADMIN" | "USER"}
    """
    permission_classes = [IsSuperAdmin]

    def post(self, request, pk, *args, **kwargs):
        try:
            target_user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        if target_user.id == request.user.id and request.data.get('role') != UserRole.SUPERADMIN:
            return Response({"detail": "You cannot demote yourself from SuperAdmin."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserRoleUpdateSerializer(target_user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "message": f"Role updated successfully to {target_user.role}.",
            "user": UserSerializer(target_user).data
        }, status=status.HTTP_200_OK)


class CurrentUserRoleCheckView(views.APIView):
    """
    Quick status check for authenticated users to inspect their role and permissions.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "is_superadmin": user.is_superadmin,
            "is_admin_user": user.is_admin_user,
            "is_regular_user": user.is_regular_user,
            "permissions": {
                "can_manage_users": user.is_superadmin,
                "can_manage_products": user.is_admin_user,
                "can_manage_content": user.is_admin_user,
                "can_view_all_inquiries": user.is_admin_user
            }
        })
