import time
from django.db import models
from django.conf import settings


class InquiryStatus(models.TextChoices):
    NEW = 'New', 'New'
    UNDER_REVIEW = 'Under Review', 'Under Review'
    QUOTED = 'Quoted', 'Quoted'
    IN_PRODUCTION = 'In Production', 'In Production'
    CLOSED = 'Closed', 'Closed'


class Inquiry(models.Model):
    """
    Export Request for Quote (RFQ) and Contact Inquiries.
    """
    id = models.CharField(max_length=50, primary_key=True, default='')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='inquiries'
    )
    name = models.CharField(max_length=200, help_text='Buyer contact person name')
    company = models.CharField(max_length=255, help_text='Company / Importer Name')
    email = models.EmailField(help_text='Direct contact email')
    phone = models.CharField(max_length=50, blank=True, default='', help_text='Phone or WhatsApp number with country code')
    category = models.CharField(max_length=150, blank=True, default='General Inquiry')
    product_title = models.CharField(max_length=255, blank=True, default='')
    volume = models.CharField(max_length=150, blank=True, default='1x 20ft Container (FCL)')
    port = models.CharField(max_length=200, blank=True, default='', help_text='Destination Seaport / Airport / Country')
    notes = models.TextField(blank=True, default='', help_text='Custom requirements, specifications, target pricing, GSM, etc.')
    
    status = models.CharField(
        max_length=50,
        choices=InquiryStatus.choices,
        default=InquiryStatus.NEW
    )
    internal_notes = models.TextField(blank=True, default='', help_text='Private administrative response notes')
    email_sent_to_company = models.BooleanField(default=False)
    email_sent_to_client = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Commercial Inquiry / RFQ'
        verbose_name_plural = 'Commercial Inquiries & RFQs'
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.id:
            self.id = f"inq-{int(time.time())}"
        super().save(*args, **kwargs)

    @property
    def date(self) -> str:
        return self.created_at.strftime("%Y-%m-%d %H:%M")

    def __str__(self):
        return f"RFQ #{self.id} from {self.company} ({self.name}) - {self.status}"
