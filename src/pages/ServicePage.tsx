import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Navbar, Footer, FAQ } from "../components/LandingPage";
import { BookingForm } from "../components/BookingForm";
import { Seo } from "../components/Seo";
import { services, ServiceSlug, structuredData } from "../lib/content";
export default function ServicePage() {
  const { pathname } = useLocation();
  const slug = pathname.slice(1) as ServiceSlug;
  const service = services[slug];
  if (!service) return null;
  return (
    <>
      <Seo
        title={service.title}
        description={service.description}
        path={pathname}
        image={service.image}
        jsonLd={structuredData(slug)}
      />
      <Navbar />
      <main id="main-content">
        <section className="service-hero shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{service.label}</span>
          </nav>
          <div className="service-hero-grid">
            <div>
              <span className="eyebrow">{service.eyebrow}</span>
              <h1>{service.heading}</h1>
              <p>{service.intro}</p>
              <div className="service-price">
                R{service.price.toLocaleString("en-ZA")}{" "}
                <span>{service.unit} · chauffeur included</span>
              </div>
              <a href="#reserve" className="button">
                Request {service.name.toLowerCase()} <ArrowUpRight size={17} />
              </a>
            </div>
            <img
              src={service.image}
              alt={service.alt}
              width="1536"
              height="1024"
              fetchPriority="high"
            />
          </div>
        </section>
        <section className="included-band">
          <div className="shell">
            <span className="eyebrow">YOUR PRIVATE JOURNEY INCLUDES</span>
            <ul>
              {service.includes.map((item) => (
                <li key={item}>
                  <Check size={19} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MAKE IT YOUR EXPERIENCE</span>
              <h2>
                {slug === "airport-transfers"
                  ? "A better beginning."
                  : "A day worth remembering."}
              </h2>
            </div>
            <p>
              {slug === "airport-transfers"
                ? "Arrive with a plan, and a journey that feels personal from the start."
                : "These are itinerary ideas. We agree your final route and timing together."}
            </p>
          </div>
          <div className="steps service-details">
            {service.details.map(([h, p], i) => (
              <article key={h}>
                <span className="step-number">0{i + 1}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
          <p className="pricing-note">
            {slug === "private-day-tours"
              ? "R5,000 covers the chauffeur and vehicle for your agreed day. Meals, entrance fees, wine tastings, and other third-party experiences are separate unless expressly agreed. Confirm tour hours and any extras before booking."
              : "R1,000 per airport pickup. Confirm your destination, arrival time, waiting arrangements, passengers, and luggage before booking."}
          </p>
        </section>
        <FAQ />
        <section id="reserve" className="reservation section">
          <div className="shell reservation-grid">
            <div>
              <span className="eyebrow">LET’S PLAN IT</span>
              <h2>
                {slug === "airport-transfers"
                  ? "Your arrival, taken care of."
                  : "Your perfect day starts here."}
              </h2>
              <p>
                Tell us your dates and a little about your plans. We’ll check
                availability and work through the details with you.
              </p>
              <Link
                className="text-link"
                to={
                  slug === "airport-transfers"
                    ? "/private-day-tours"
                    : "/airport-transfers"
                }
              >
                Explore{" "}
                {slug === "airport-transfers"
                  ? "our daily tours"
                  : "airport pickups"}{" "}
                <ArrowUpRight size={17} />
              </Link>
            </div>
            <BookingForm initialService={slug} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
