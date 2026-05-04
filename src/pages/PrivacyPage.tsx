import { Footer, Navbar } from '../components/LandingPage';
import { Seo } from '../components/Seo';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-luxury-black text-white">
      <Seo
        title="Privacy Policy | QuattroCape"
        description="Privacy policy for QuattroCape chauffeur services and booking inquiries."
        path="/privacy"
      />
      <Navbar />
      <section className="py-28 md:py-40">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h1 className="text-[clamp(2rem,6vw,4rem)] leading-[0.9] mb-10">Privacy Policy</h1>
          <div className="space-y-8 text-white/65">
            <p>
              We collect contact and booking details you submit through our inquiry forms to provide chauffeur
              services, respond to requests, and manage reservations.
            </p>
            <p>
              Information may include your name, email address, selected service, dates, and message details. We do
              not sell personal information.
            </p>
            <p>
              We retain booking inquiry records only as needed for business operations, legal obligations, and customer
              support. You may request access, correction, or deletion by contacting concierge@quattrocape.com.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

