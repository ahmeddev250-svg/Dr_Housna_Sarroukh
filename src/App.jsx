import React, { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Cabinet from './components/Cabinet';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';

function AppContent() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOpenBooking = (serviceTitle = '') => {
    setSelectedService(serviceTitle);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenBooking={handleOpenBooking} />
      <main className="flex-grow">
        <Hero onOpenBooking={handleOpenBooking} />
        <About />
        <Services onSelectService={handleOpenBooking} />
        <Cabinet />
        <Testimonials />
      </main>
      <Footer onOpenBooking={handleOpenBooking} />
      <AppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
