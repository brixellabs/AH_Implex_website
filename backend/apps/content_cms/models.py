from django.db import models


class CompanyInfo(models.Model):
    """
    Singleton model for dynamic site content, hero copy, contact details, social links, and mill statistics.
    """
    name = models.CharField(max_length=200, default='A&H IMPEX')
    legal_name = models.CharField(max_length=255, default='A&H Impex Global Textile Exporters (Pvt.) Ltd.')
    tagline = models.CharField(max_length=300, default='Pakistan’s Premier Textile Manufacturer & Global Exporter')
    eyebrow = models.CharField(max_length=300, default='Institutional Bedding • Hospitality Linens • Workwear Textiles')
    hero_description = models.TextField(
        default='Vertically integrated spinning, weaving, eco-dyeing, and precision automated stitching mill delivering container-grade textile shipments to North America, Europe, Oceania, and the GCC.'
    )
    
    # Contact Details (Stored in structured JSON for flexibility + direct fields)
    contact = models.JSONField(
        default=dict,
        blank=True,
        help_text='JSON containing email, phone, whatsapp, address, workingHours, emergencyNotice'
    )
    
    # Social Links
    socials = models.JSONField(
        default=dict,
        blank=True,
        help_text='JSON containing whatsapp, linkedin, instagram, facebook, youtube links'
    )
    
    # Operational & Factory Statistics
    stats = models.JSONField(
        default=dict,
        blank=True,
        help_text='JSON containing experienceYears, exportCountries, monthlyCapacity, complianceRate, etc.'
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Company CMS Content'
        verbose_name_plural = 'Company CMS Content'

    def save(self, *args, **kwargs):
        # Guarantee singleton row (id=1)
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return f"{self.name} CMS Settings (Last Updated: {self.updated_at.strftime('%Y-%m-%d %H:%M')})"
