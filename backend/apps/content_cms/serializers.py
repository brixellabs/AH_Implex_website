from rest_framework import serializers
from .models import CompanyInfo


class CompanyInfoSerializer(serializers.ModelSerializer):
    legalName = serializers.CharField(source='legal_name', required=False)
    heroDescription = serializers.CharField(source='hero_description', required=False)

    class Meta:
        model = CompanyInfo
        fields = [
            'id', 'name', 'legal_name', 'legalName', 'tagline', 'eyebrow',
            'hero_description', 'heroDescription', 'contact', 'socials',
            'stats', 'updated_at'
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Default fallbacks if empty
        if not data.get('contact'):
            data['contact'] = {
                'email': 'info@ah-impex.com',
                'phone': '+92 41 854 1234',
                'phoneRaw': '+92418541234',
                'whatsapp': '+92 300 8661234',
                'whatsappClean': '923008661234',
                'address': 'Mill Sector 4, Khurrianwala Industrial Zone, Faisalabad, Punjab, Pakistan',
                'addressNote': 'Direct Access to M-4 Motorway & Dry Port Clearance Terminals',
                'workingHours': 'Monday - Saturday: 08:30 - 18:30 (PKT / UTC+5)',
                'emergencyNotice': '24/7 Priority Emergency Port-Loading & Vessel Logistics Dispatch Desk Active'
            }
        if not data.get('socials'):
            data['socials'] = {
                'whatsapp': 'https://wa.me/923008661234',
                'linkedin': 'https://www.linkedin.com/company/ah-impex',
                'instagram': 'https://www.instagram.com/ahimpextextiles',
                'facebook': 'https://www.facebook.com/ahimpextextiles',
                'youtube': 'https://www.youtube.com/@ahimpextextiles'
            }
        if not data.get('stats'):
            data['stats'] = {
                'experienceYears': '28+',
                'exportCountries': '42+',
                'monthlyCapacity': '1.8M',
                'complianceRate': '99.8%',
                'spindles': '85,000+',
                'airJetLooms': '340+'
            }
        return data
