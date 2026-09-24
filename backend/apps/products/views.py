from rest_framework import generics, status, views, permissions, filters
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from apps.accounts.permissions import IsAdmin, IsAdminOrReadOnly
from .models import Category, Product, ProductImage
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ProductCreateUpdateSerializer,
    ProductImageSerializer
)


class CategoryListCreateView(generics.ListCreateAPIView):
    """
    - GET: Public list of active categories.
    - POST: Admin / SuperAdmin create new category.
    """
    queryset = Category.objects.all().order_by('order', 'label')
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['label', 'description', 'slug']


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    - GET: Public view category details.
    - PUT/PATCH/DELETE: Admin / SuperAdmin edit or delete category.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'


class ProductListCreateView(generics.ListCreateAPIView):
    """
    - GET: Public list of products with search and filtering by category or featured status.
    - POST: Admin / SuperAdmin create product. Supports multipart form data or JSON.
    """
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'badge', 'is_featured', 'is_active']
    search_fields = ['title', 'tagline', 'description', 'category_name', 'badge']
    ordering_fields = ['order', 'created_at', 'title']

    def get_queryset(self):
        queryset = Product.objects.all().select_related('category').prefetch_related('gallery_images')
        # Filter for public view vs admin
        user = self.request.user
        if not (user and user.is_authenticated and user.is_admin_user):
            queryset = queryset.filter(is_active=True)
            
        category_param = self.request.query_params.get('category')
        if category_param and category_param != 'all':
            queryset = queryset.filter(category__slug=category_param)

        return queryset

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductCreateUpdateSerializer
        return ProductSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        read_serializer = ProductSerializer(product, context={'request': request})
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    - GET: Public product detail.
    - PUT/PATCH/DELETE: Admin / SuperAdmin update or delete product.
    """
    queryset = Product.objects.all().select_related('category').prefetch_related('gallery_images')
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return ProductCreateUpdateSerializer
        return ProductSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        read_serializer = ProductSerializer(product, context={'request': request})
        return Response(read_serializer.data)


class ProductImageUploadView(views.APIView):
    """
    Admin / SuperAdmin endpoint to upload gallery image for a specific product.
    """
    permission_classes = [IsAdmin]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        image_file = request.FILES.get('image')
        alt_text = request.data.get('alt_text', f"Gallery image for {product.title}")
        is_primary = request.data.get('is_primary', 'false').lower() == 'true'

        if not image_file:
            return Response({"image": ["No image file provided."]}, status=status.HTTP_400_BAD_REQUEST)

        product_image = ProductImage.objects.create(
            product=product,
            image=image_file,
            alt_text=alt_text,
            is_primary=is_primary
        )

        return Response(ProductImageSerializer(product_image).data, status=status.HTTP_201_CREATED)


class ProductImageDeleteView(generics.DestroyAPIView):
    """
    Admin / SuperAdmin endpoint to remove a gallery image.
    """
    queryset = ProductImage.objects.all()
    permission_classes = [IsAdmin]
    lookup_field = 'id'
