from rest_framework import serializers
from .models import Category, Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    url = serializers.CharField(read_only=True)

    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image', 'image_url', 'url', 'alt_text', 'is_primary', 'order', 'created_at']
        read_only_fields = ['id', 'created_at']


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='slug', required=False)
    products_count = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'slug', 'label', 'description', 'icon', 'order', 'is_active', 'products_count', 'created_at']
        read_only_fields = ['created_at']

    def create(self, validated_data):
        if 'slug' not in validated_data and 'id' in self.initial_data:
            validated_data['slug'] = self.initial_data['id']
        return super().create(validated_data)


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    gallery_images = ProductImageSerializer(many=True, read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'category', 'category_name', 'badge', 'tagline',
            'description', 'featured_image', 'image_url', 'image', 'specs',
            'features', 'gallery_images', 'is_featured', 'is_active', 'order',
            'created_at', 'updated_at'
        ]

    def get_image(self, obj) -> str:
        request = self.context.get('request')
        if obj.featured_image:
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
            return obj.featured_image.url
        return obj.image_url or ''

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Format for React frontend compatibility
        if not data.get('specs'):
            data['specs'] = {
                'composition': '',
                'gsm': '',
                'moq': '500 Sets',
                'leadTime': '30-45 Days',
                'packaging': 'Export Carton Packaging'
            }
        if not data.get('features'):
            data['features'] = ['OEKO-TEX Standard 100 Certified', 'High Tensile Strength']
        # Map category field string if expected by frontend
        if instance.category:
            data['category'] = instance.category.slug
        return data


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Handles creation and updates with file image uploads, base64 images, or external URLs.
    """
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Product
        fields = [
            'id', 'title', 'category', 'category_name', 'badge', 'tagline',
            'description', 'featured_image', 'image_url', 'specs', 'features',
            'is_featured', 'is_active', 'order'
        ]

    def create(self, validated_data):
        category = validated_data.get('category')
        if category and not validated_data.get('category_name'):
            validated_data['category_name'] = category.label
        return super().create(validated_data)

    def update(self, instance, validated_data):
        category = validated_data.get('category', instance.category)
        if category and not validated_data.get('category_name'):
            validated_data['category_name'] = category.label
        return super().update(instance, validated_data)
