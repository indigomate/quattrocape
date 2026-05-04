import { Footer, Navbar } from '../components/LandingPage';
import { Seo } from '../components/Seo';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-luxury-black text-white">
      <Seo
        title="Terms of Service | QuattroCape"
        description="Terms of service for QuattroCape private chauffeur bookings and transport services."
        path="/terms"
      />
      <Navbar />
      <section className="py-28 md:py-40">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h1 className="text-[clamp(2rem,6vw,4rem)] leading-[0.9] mb-10">Terms of Service</h1>
          <div className="space-y-8 text-white/65">
            <p>
              Submitting an inquiry does not confirm a booking until availability, route, and pricing are agreed by
              both parties.
            </p>
            <p>
              Service timelines, rates, and routes may vary depending on traffic, safety conditions, and special
              requests. Additional waiting, distance, or itinerary changes may affect final pricing.
            </p>
            <p>
              By using our site and inquiry forms, you agree to provide accurate information and use services lawfully.
              For support, contact concierge@quattrocape.com.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

