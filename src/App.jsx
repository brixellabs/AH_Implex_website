import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CompanyPillars from './components/CompanyPillars';
import AboutSection from './components/AboutSection';
import ProductSection from './components/ProductSection';
import ManufacturingSection from './components/ManufacturingSection';
import QualityControl from './components/QualityControl';
import CertificationSection from './components/CertificationSection';
import ExportMarkets from './components/ExportMarkets';
import SocialSection from './components/SocialSection';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';
import QuoteModal from './components/QuoteModal';
import AdminDashboard from './components/admin/AdminDashboard';

function MainApp() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#admin' ? 'admin' : 'site';
  });

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteModalInitialData, setQuoteModalInitialData] = useState({});

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('site');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenQuoteModal = (initialData = {}) => {
    setQuoteModalInitialData(initialData);
    setQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setQuoteModalOpen(false);
  };

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    window.location.hash = '';
    setCurrentView('site');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'admin') {
    return <AdminDashboard onExitAdmin={handleExitAdmin} />;
  }

  return (
    <div className="min-h-screen bg-brand-900 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Sticky Glassmorphic Navigation Bar */}
      <Navbar
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Page Landmark */}
      <main className="flex-1">
        {/* 3. Hero Section with Ken Burns Textile Background & Floating Glass Card */}
        <HeroSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 4. Strategic Company Pillars Row (Vision, Quality, Social Responsibility) */}
        <CompanyPillars />

        {/* 5. Company Story, Heritage & Capabilities Grid */}
        <AboutSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 6. Product Catalog with Category Filtering & Specifications */}
        <ProductSection
          onSelectProduct={handleOpenQuoteModal}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* 7. 5-Step Interactive Manufacturing Process Timeline */}
        <ManufacturingSection />

        {/* 8. 6-Stage International Quality Control Pipeline */}
        <QualityControl onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 9. Certifications & International Standards Showcase with Lightbox */}
        <CertificationSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 11. Worldwide Logistics & Export Markets Visual */}
        <ExportMarkets onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 12. Corporate Social Media & Digital Communication Desk */}
        <SocialSection />

        {/* 13. High-Converting Bottom B2B Inquiry & Contact Section */}
        <ContactCTA onOpenQuoteModal={handleOpenQuoteModal} />
      </main>

      {/* 14. Luxury Multi-Column Corporate Footer */}
      <Footer
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 15. Single Elegant Floating Contact Action Button */}
      <FloatingContactButtons onOpenQuoteModal={handleOpenQuoteModal} />

      {/* 16. Technical B2B Request for Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={handleCloseQuoteModal}
        initialData={quoteModalInitialData}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
