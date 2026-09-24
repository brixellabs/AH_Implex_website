from django.urls import path
from .views import CompanyInfoView, DashboardSummaryView

app_name = 'content_cms'

urlpatterns = [
    path('company/', CompanyInfoView.as_view(), name='company_info'),
    path('dashboard/summary/', DashboardSummaryView.as_view(), name='dashboard_summary'),
]
