import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getSupabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

// Views
import { Navbar, Hero, Services, Experience, Pricing, WhyChooseUs, Reservation, Footer } from './components/LandingPage';
import { Seo } from './components/Seo';

const AdminPortal = lazy(() => import('./components/AdminPortal'));
const LoginPortal = lazy(() => import('./components/LoginPortal'));
const ServicePage = lazy(() => import('./pages/ServicePage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

function LandingView() {
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'QuattroCape',
    areaServed: 'Cape Town',
    url: 'https://quattrocape.com/',
    telephone: '+27 21 000 0000',
    email: 'concierge@quattrocape.com',
  };

  return (
    <main className="min-h-screen">
      <Seo
        title="QuattroCape | Private Chauffeur Services in Cape Town"
        description="Luxury airport transfers, curated private day tours, and full-stay chauffeur services in Cape Town."
        path="/"
        jsonLd={homeJsonLd}
      />
      <Navbar />
      <Hero />
      <Services />
      <Experience />
      <Pricing />
      <WhyChooseUs />
      <Reservation />
      <Footer />
    </main>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen bg-luxury-black flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LandingView />} />
          <Route path="/airport-transfers" element={<ServicePage />} />
          <Route path="/private-day-tours" element={<ServicePage />} />
          <Route path="/stay-chauffeur" element={<ServicePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route
            path="/admin"
            element={session ? <AdminPortal /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!session ? <LoginPortal /> : <Navigate to="/admin" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
