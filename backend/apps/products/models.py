import uuid
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """
    Product Category (e.g. Home Textiles, Apparel & Workwear, Hospitality, Institutional).
    """
    slug = models.SlugField(max_length=100, unique=True, primary_key=True)
    label = models.CharField(max_length=150)
    description = models.TextField(blank=True, default='')
    icon = models.CharField(max_length=50, blank=True, default='faBoxesStacked')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Product Category'
        verbose_name_plural = 'Product Categories'
        ordering = ['order', 'label']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.label)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.label


class Product(models.Model):
    """
    Export Textile Product Model with comprehensive technical specifications and gallery images.
    """
    id = models.CharField(max_length=100, primary_key=True, default='')
    title = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='products'
    )
    category_name = models.CharField(max_length=150, blank=True, default='')
    badge = models.CharField(max_length=100, default='Export Grade', blank=True)
    tagline = models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(blank=True, default='')
    
    # Main / Cover Image
    featured_image = models.ImageField(upload_to='products/', null=True, blank=True)
    image_url = models.TextField(blank=True, default='', help_text='Fallback URL or existing asset URL')

    # Structured technical specifications
    specs = models.JSONField(
        default=dict,
        blank=True,
        help_text='JSON containing composition, gsm, moq, leadTime, packaging, weave, etc.'
    )
    
    # Feature bullet points
    features = models.JSONField(
        default=list,
        blank=True,
        help_text='List of bullet strings for product features'
    )

    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Export Product'
        verbose_name_plural = 'Export Products'
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = f"prod-{int(uuid.uuid4().int % 1000000)}"
        if self.category and not self.category_name:
            self.category_name = self.category.label
        super().save(*args, **kwargs)

    @property
    def display_image(self) -> str:
        """
        Returns absolute or relative URL of the product image.
        """
        if self.featured_image:
            return self.featured_image.url
        return self.image_url or ''

    def __str__(self):
        return f"{self.title} ({self.category_name or 'Uncategorized'})"


class ProductImage(models.Model):
    """
    Additional High-Resolution Gallery Images for a Product.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='products/gallery/', null=True, blank=True)
    image_url = models.TextField(blank=True, default='')
    alt_text = models.CharField(max_length=255, blank=True, default='')
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Product Gallery Image'
        verbose_name_plural = 'Product Gallery Images'
        ordering = ['order', 'created_at']

    @property
    def url(self) -> str:
        if self.image:
            return self.image.url
        return self.image_url or ''

    def __str__(self):
        return f"Image for {self.product.title} (Order: {self.order})"
