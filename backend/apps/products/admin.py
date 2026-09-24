from django.contrib import admin
from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image', 'image_url', 'alt_text', 'is_primary', 'order']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['label', 'slug', 'order', 'is_active', 'created_at']
    list_editable = ['order', 'is_active']
    search_fields = ['label', 'slug', 'description']
    prepopulated_fields = {'slug': ('label',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'badge', 'is_featured', 'is_active', 'order', 'created_at']
    list_filter = ['category', 'badge', 'is_featured', 'is_active']
    list_editable = ['is_featured', 'is_active', 'order']
    search_fields = ['title', 'tagline', 'description', 'category_name']
    inlines = [ProductImageInline]


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'is_primary', 'order', 'created_at']
    list_filter = ['is_primary', 'product__category']
