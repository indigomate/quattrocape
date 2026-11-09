import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { homeMeta, structuredData } from "./lib/content";
import { getSupabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";

// Views
import {
  Navbar,
  Hero,
  Services,
  Experience,
  Pricing,
  WhyChooseUs,
  Reservation,
  Footer,
} from "./components/LandingPage";
import { Seo } from "./components/Seo";

const AdminPortal = lazy(() => import("./components/AdminPortal"));
const LoginPortal = lazy(() => import("./components/LoginPortal"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

export function LandingView() {
  return (
    <>
      <Seo
        title={homeMeta.title}
        description={homeMeta.description}
        path="/"
        jsonLd={structuredData()}
      />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Experience />
        <Pricing />
        <WhyChooseUs />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();

    if (!supabase) {
      setAuthReady(true);
      return;
    }

    // Authentication must never block the public marketing pages.
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch(() => setSession(null))
      .finally(() => setAuthReady(true));

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
          <Route
            path="/stay-chauffeur"
            element={<Navigate to="/private-day-tours" replace />}
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route
            path="/admin"
            element={
              !authReady ? (
                <p role="status">Checking staff access…</p>
              ) : session ? (
                <AdminPortal />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !authReady ? (
                <p role="status">Checking staff access…</p>
              ) : !session ? (
                <LoginPortal />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />
          <Route
            path="*"
            element={
              <>
                <Seo
                  title="Page not found | QuattroCape"
                  description="This page could not be found."
                  noindex
                />
                <Navbar />
                <main id="main-content" className="section shell">
                  <h1>Page not found</h1>
                  <a href="/" className="text-link">
                    Return to QuattroCape
                  </a>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
