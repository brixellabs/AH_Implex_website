from django.urls import path
from .views import InquiryListCreateView, InquiryDetailView

app_name = 'inquiries'

urlpatterns = [
    path('inquiries/', InquiryListCreateView.as_view(), name='inquiry_list_create'),
    path('inquiries/<str:id>/', InquiryDetailView.as_view(), name='inquiry_detail'),
]
