import { Footer, Navbar } from "../components/LandingPage";
import { Seo } from "../components/Seo";
import { WHATSAPP } from "../lib/content";
export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | QuattroCape"
        description="How QuattroCape handles your chauffeur enquiry and personal information."
        path="/privacy"
      />
      <Navbar />
      <main id="main-content" className="section shell legal">
        <span className="eyebrow">YOUR INFORMATION</span>
        <h1>Privacy policy</h1>
        <h2>Information you share</h2>
        <p>
          When you request a journey, we collect your name, email, telephone
          number, travel dates, passenger count, pickup and destination, flight
          details where supplied, and any requests you include. Please do not
          submit payment card details, identity documents, or unnecessary
          sensitive information through this form.
        </p>
        <h2>How your details are used</h2>
        <p>
          We use your enquiry to check availability, contact you, plan your
          journey, and administer your booking. The form requests your agreement
          to this use. We do not sell your personal information.
        </p>
        <h2>Storage and service providers</h2>
        <p>
          Enquiries submitted through the website are stored with Supabase. The
          website is hosted through Vercel when deployed there. These providers
          process information needed to operate the service and may process it
          outside South Africa. If you choose WhatsApp, you share your message
          with WhatsApp under its own privacy terms; opening a prepared message
          does not send it until you choose to send it.
        </p>
        <h2>Retention and your choices</h2>
        <p>
          We retain enquiries only as needed to manage the request, provide the
          service, and meet applicable record-keeping obligations. You may
          request access, correction, or deletion of your information, or
          withdraw consent for future contact about an unconfirmed enquiry, by
          contacting QuattroCape. Legal obligations may limit deletion of some
          booking records.
        </p>
        <h2>Cookies and contact</h2>
        <p>
          The staff login uses browser storage for authentication. This rebuild
          does not add advertising trackers or analytics. Contact us about your
          information through our existing WhatsApp channel.
        </p>
        <a
          className="text-link"
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact QuattroCape ↗
        </a>
      </main>
      <Footer />
    </>
  );
}
