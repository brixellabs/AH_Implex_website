from django.urls import path
from .views import (
    CategoryListCreateView,
    CategoryDetailView,
    ProductListCreateView,
    ProductDetailView,
    ProductImageUploadView,
    ProductImageDeleteView
)

app_name = 'products'

urlpatterns = [
    # Categories
    path('categories/', CategoryListCreateView.as_view(), name='category_list_create'),
    path('categories/<slug:slug>/', CategoryDetailView.as_view(), name='category_detail'),

    # Products
    path('products/', ProductListCreateView.as_view(), name='product_list_create'),
    path('products/<str:id>/', ProductDetailView.as_view(), name='product_detail'),
    path('products/<str:product_id>/upload-image/', ProductImageUploadView.as_view(), name='product_image_upload'),
    path('products/gallery/<int:id>/', ProductImageDeleteView.as_view(), name='product_image_delete'),
]
