import { Footer, Navbar } from "../components/LandingPage";
import { Seo } from "../components/Seo";
import { WHATSAPP } from "../lib/content";
export default function TermsPage() {
  return (
    <>
      <Seo
        title="Booking Terms | QuattroCape"
        description="Booking terms for QuattroCape airport pickups and private daily tours."
        path="/terms"
      />
      <Navbar />
      <main id="main-content" className="section shell legal">
        <span className="eyebrow">TRAVEL WITH CLARITY</span>
        <h1>Booking terms</h1>
        <h2>Chauffeur services</h2>
        <p>
          QuattroCape offers private chauffeur-driven airport pickups and daily
          tours. Airport pickups are R1,000 per pickup. Daily tours are R5,000
          per day. All advertised prices are in South African rand (ZAR).
        </p>
        <h2>Your request and confirmation</h2>
        <p>
          Submitting the form or sending a WhatsApp message is an availability
          enquiry. A booking is confirmed only when QuattroCape confirms your
          service and agreed arrangements. No payment is taken on this website.
        </p>
        <h2>Your agreed journey</h2>
        <p>
          Before confirmation, we agree the pickup and destination, date,
          schedule, passenger and luggage requirements, vehicle suitability,
          tour hours, and any waiting arrangements. Tell us about child seats,
          accessibility requirements, and special requests in advance so
          availability can be checked.
        </p>
        <h2>What the price covers</h2>
        <p>
          The advertised rate covers the private vehicle and chauffeur for the
          agreed service. Meals, attraction tickets, tastings, accommodation,
          and other third-party experiences are not included unless expressly
          agreed. Any requested extras, route extensions, or additional time
          must be agreed and priced before acceptance.
        </p>
        <h2>Changes and cancellations</h2>
        <p>
          Payment, cancellation, refund, flight-delay, waiting-time, and no-show
          terms must be supplied and agreed as part of your booking
          confirmation. Ask for these terms before accepting or paying. Notify
          QuattroCape promptly if your plans change. No itinerary stop or
          attraction is guaranteed where access, weather, or safety prevents it.
        </p>
        <h2>Questions</h2>
        <p>
          <a
            className="text-link"
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact QuattroCape on WhatsApp ↗
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
