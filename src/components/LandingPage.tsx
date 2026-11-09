import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Plane,
  Route,
  Check,
  MapPin,
} from "lucide-react";
import { BookingForm } from "./BookingForm";
import { services, faqs, WHATSAPP } from "../lib/content";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell nav-inner">
          <Link className="wordmark" to="/" aria-label="QuattroCape home">
            QUATTRO<span>CAPE</span>
            <small>PRIVATE CHAUFFEUR · CAPE TOWN</small>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="navigation"
            className={open ? "navigation open" : "navigation"}
            aria-label="Main navigation"
            onClick={() => setOpen(false)}
          >
            <Link to="/airport-transfers">Airport pickups</Link>
            <Link to="/private-day-tours">Daily tours</Link>
            <a href="/#experience">The experience</a>
            <a href="/#reserve" className="button button-small">
              Plan your journey <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero-image"
        src="/images/services/private-day-tours.png"
        alt="Dramatic Cape Town coastal scenery"
        width="1536"
        height="1024"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <div className="shell hero-content">
        <span className="eyebrow">CAPE TOWN, WITH A PERSONAL TOUCH</span>
        <h1 id="hero-title">
          Your Cape Town.
          <br />
          <em>Your chauffeur.</em>
        </h1>
        <p>
          Arrive beautifully. Explore freely. Private airport pickups and
          full-day tours, with every journey made yours.
        </p>
        <div className="button-row">
          <a className="button" href="#reserve">
            Plan your journey <ArrowUpRight size={17} />
          </a>
          <a className="text-link" href="#services">
            Explore our services <ArrowRight size={17} />
          </a>
        </div>
        <div className="hero-note">
          <MapPin size={15} /> Cape Town & the Western Cape
        </div>
      </div>
      <div className="hero-bottom shell">
        <span>THE FREEDOM TO ENJOY THE JOURNEY.</span>
        <a href="#services">Discover QuattroCape ↓</a>
      </div>
    </section>
  );
}
export function Services() {
  return (
    <section className="section shell" id="services">
      <div className="section-heading">
        <div>
          <span className="eyebrow">TWO WAYS TO TRAVEL WELL</span>
          <h2>
            A seamless arrival.
            <br />
            An unforgettable day.
          </h2>
        </div>
        <p>
          Just you, your plans, and a chauffeur who takes care of the driving.
          Choose a simple airport pickup or make a day of discovering the Cape.
        </p>
      </div>
      <div className="service-grid">
        {Object.entries(services).map(([slug, s], i) => (
          <article className="service-card" key={slug}>
            <Link to={`/${slug}`} className="service-photo">
              <img
                src={s.image}
                alt={s.alt}
                width="1536"
                height="1024"
                loading="lazy"
              />
              <span className="photo-tag">
                {i === 0 ? <Plane size={15} /> : <Route size={15} />}{" "}
                {s.eyebrow}
              </span>
            </Link>
            <div className="service-body">
              <span className="eyebrow">0{i + 1} / PRIVATE CHAUFFEUR</span>
              <h3>{i === 0 ? "Airport pickups" : "Private daily tours"}</h3>
              <p>
                {i === 0
                  ? "From Cape Town International Airport to your agreed destination. A personal welcome to the city."
                  : "Coastal roads, Winelands, or the city’s hidden corners. A private day shaped around you."}
              </p>
              <div className="service-foot">
                <div className="price">
                  R{s.price.toLocaleString("en-ZA")}
                  <small>{s.unit}</small>
                </div>
                <Link
                  className="circle-link"
                  to={`/${slug}`}
                  aria-label={`Explore ${s.label}`}
                >
                  <ArrowUpRight />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="shell experience-grid">
        <div className="experience-image">
          <img
            src="/images/services/stay-chauffeur.png"
            alt="Comfortable private vehicle interior"
            loading="lazy"
            width="1024"
            height="1024"
          />
          <span className="image-caption">
            A little more space to enjoy the moment.
          </span>
        </div>
        <div className="experience-copy">
          <span className="eyebrow">MORE THAN GETTING THERE</span>
          <h2>
            Let the Cape
            <br />
            <em>come to you.</em>
          </h2>
          <p>
            There is a different way to see Cape Town. No navigating unfamiliar
            roads. No rushing past the view. Just the comfort of your own
            vehicle and the freedom to be present.
          </p>
          <p>
            From your first airport pickup to a day along the peninsula, we plan
            the driving around your experience. Tell us what your ideal day
            looks like. We’ll start there.
          </p>
          <ul className="check-list">
            <li>
              <Check />A chauffeur with every journey
            </li>
            <li>
              <Check />
              Private travel, at your pace
            </li>
            <li>
              <Check />
              Clear prices in South African rand
            </li>
          </ul>
          <a className="text-link" href="#reserve">
            Make it your Cape Town <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
export function Pricing() {
  return (
    <section className="section shell" id="pricing">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE PRICE OF A GREAT JOURNEY</span>
          <h2>
            Simple. Personal.
            <br />
            Chauffeur included.
          </h2>
        </div>
        <p>
          Two services. Clear starting arrangements. Your route and the details
          are agreed before your booking is confirmed.
        </p>
      </div>
      <div className="rate-grid">
        {Object.entries(services).map(([slug, s]) => (
          <article className="rate" key={slug}>
            <span className="eyebrow">{s.name}</span>
            <div className="rate-number">
              R{s.price.toLocaleString("en-ZA")}
              <span> / {s.unit.replace("per ", "")}</span>
            </div>
            <ul className="check-list">
              {s.includes.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <a
              className="button button-outline"
              href={`/?service=${slug}#reserve`}
            >
              Request {s.name.toLowerCase()} <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Rates are in ZAR. Meals, attraction tickets, tastings, and other
        third-party experiences are separate unless agreed. Tour duration, route
        coverage, waiting arrangements, and any extras are confirmed with your
        itinerary.
      </p>
    </section>
  );
}
export function WhyChooseUs() {
  return (
    <>
      <section className="journey-band">
        <div className="shell">
          <span className="eyebrow">FROM IDEA TO ITINERARY</span>
          <h2>Your next journey, in three steps.</h2>
          <div className="steps">
            {[
              [
                "01",
                "Tell us your plans",
                "Choose an airport pickup or a daily tour. Share your dates, passengers, and where you want to go.",
              ],
              [
                "02",
                "We shape the details",
                "We check availability and agree your route, timings, vehicle suitability, and any special requests.",
              ],
              [
                "03",
                "Settle in. Enjoy the Cape.",
                "Once your booking is confirmed, your chauffeur takes care of the driving. You take in the experience.",
              ],
            ].map(([n, h, p]) => (
              <div key={n}>
                <span className="step-number">{n}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FAQ />
    </>
  );
}
export function FAQ() {
  return (
    <section className="section shell faq-section">
      <div>
        <span className="eyebrow">BEFORE YOU TRAVEL</span>
        <h2>
          A few helpful
          <br />
          answers.
        </h2>
        <p>Something else on your mind?</p>
        <a
          className="text-link"
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask us on WhatsApp <ArrowUpRight size={17} />
        </a>
      </div>
      <div>
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Reservation() {
  return (
    <section className="reservation section" id="reserve">
      <div className="shell reservation-grid">
        <div>
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
          <h2>
            Where shall
            <br />
            <em>we take you?</em>
          </h2>
          <p>
            A smooth arrival or a day to remember. Share a few details and let’s
            put your Cape Town experience together.
          </p>
          <a
            className="text-link"
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefer to chat? WhatsApp us <ArrowUpRight size={17} />
          </a>
          <div className="reservation-note">
            Airport pickup <strong>R1,000</strong>
            <br />
            Private daily tour <strong>R5,000 / day</strong>
          </div>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Link className="wordmark" to="/">
              QUATTRO<span>CAPE</span>
              <small>PRIVATE CHAUFFEUR · CAPE TOWN</small>
            </Link>
            <p>
              Your Cape Town. Your chauffeur.
              <br />A journey worth being present for.
            </p>
          </div>
          <div>
            <span className="eyebrow">EXPLORE</span>
            <Link to="/airport-transfers">Airport pickups</Link>
            <Link to="/private-day-tours">Private daily tours</Link>
            <a href="/#reserve">Plan your journey</a>
          </div>
          <div>
            <span className="eyebrow">LET’S CONNECT</span>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              WhatsApp · +27 84 692 9334
            </a>
            <a
              href="https://www.instagram.com/quattrocape/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <ArrowUpRight size={13} />
            </a>
            <span>Cape Town, South Africa</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} QuattroCape. All rights reserved.
          </span>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Booking terms</Link>
            <Link to="/login">Staff login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
