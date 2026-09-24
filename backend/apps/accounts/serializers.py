from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import UserRole

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT Token Serializer that injects user role and profile details into the token response.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        token['is_superadmin'] = user.is_superadmin
        token['is_admin_user'] = user.is_admin_user
        token['company_name'] = user.company_name or ''
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'role': self.user.role,
            'is_superadmin': self.user.is_superadmin,
            'is_admin_user': self.user.is_admin_user,
            'company_name': self.user.company_name or '',
            'country': self.user.country or '',
            'phone': self.user.phone or '',
            'designation': self.user.designation or '',
            'avatar': self.user.avatar.url if self.user.avatar else None,
        }
        return data


class UserSerializer(serializers.ModelSerializer):
    """
    Read/Update serializer for user profiles and user lists.
    """
    is_superadmin = serializers.BooleanField(read_only=True)
    is_admin_user = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'phone', 'company_name', 'country', 'designation',
            'avatar', 'is_active', 'is_verified', 'is_superadmin', 'is_admin_user',
            'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'role', 'is_active', 'date_joined', 'last_login']


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for public user/client self-registration (always creates USER role).
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'password_confirm',
            'first_name', 'last_name', 'phone', 'company_name', 'country', 'designation'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        # Standard registration is always standard USER
        user = User.objects.create(
            role=UserRole.USER,
            **validated_data
        )
        user.set_password(password)
        user.save()
        return user


class AdminCreateUserSerializer(serializers.ModelSerializer):
    """
    SuperAdmin serializer to create Admin or SuperAdmin or Client users directly.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'role',
            'first_name', 'last_name', 'phone', 'company_name',
            'country', 'designation', 'is_active'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password')
        role = validated_data.get('role', UserRole.ADMIN)
        user = User.objects.create(
            **validated_data
        )
        user.role = role
        user.set_password(password)
        user.save()
        return user


class UserRoleUpdateSerializer(serializers.ModelSerializer):
    """
    SuperAdmin serializer to promote, demote, or change a user's role.
    """
    class Meta:
        model = User
        fields = ['role', 'is_active']


class ChangePasswordSerializer(serializers.Serializer):
    """
    Password change serializer for authenticated users.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({"new_password": "New passwords do not match."})
        return attrs
