import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { addLead } from "../lib/supabase";
import { services, ServiceSlug, WHATSAPP } from "../lib/content";

export function BookingForm({
  initialService = "airport-transfers",
}: {
  initialService?: ServiceSlug;
}) {
  const [params] = useSearchParams();
  const [service, setService] = useState<ServiceSlug>(initialService);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    passengers: "1",
    pickup: "",
    destination: "",
    flight: "",
    message: "",
    consent: false,
  });
  const [today, setToday] = useState("");
  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setToday(d.toISOString().slice(0, 10));
  }, []);
  useEffect(() => {
    const s = params.get("service");
    if (s && Object.hasOwn(services, s)) setService(s as ServiceSlug);
  }, [params]);
  const update = (key: keyof typeof form, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  const details = () =>
    `Service: ${services[service].name} | Advertised rate: R${services[service].price} ${services[service].unit}\nPhone: ${form.phone}\nDate: ${form.date} | Local time: ${form.time || "To arrange"} | Passengers: ${form.passengers}\nPickup: ${service === "airport-transfers" ? "Cape Town International Airport" : form.pickup}\nDestination/route: ${form.destination}\nFlight: ${form.flight || "Not supplied"}\nRequests: ${form.message || "None"}\nPrivacy consent: given`;
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading || success) return;
    if (today && form.date < today) {
      setError("Please choose today or a future travel date.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addLead({
        name: form.name,
        email: form.email,
        service: services[service].name,
        message: details(),
      });
      setSuccess(true);
    } catch {
      setError(
        "We could not save your request. Your details are still here. Please try again or send your request through WhatsApp below.",
      );
    } finally {
      setLoading(false);
    }
  }
  const whatsapp = `${WHATSAPP}?text=${encodeURIComponent(`Hello QuattroCape, I would like to request a journey.\nName: ${form.name}\nEmail: ${form.email}\n${details()}`)}`;
  if (success)
    return (
      <div className="booking-success" role="status">
        <Check size={36} />
        <h3>Your request is with us.</h3>
        <p>
          Thank you, {form.name}. We’ll use your contact details to discuss
          availability and final arrangements. Your booking is not confirmed
          yet.
        </p>
        <button
          className="button button-outline"
          onClick={() => {
            setSuccess(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              date: "",
              time: "",
              passengers: "1",
              pickup: "",
              destination: "",
              flight: "",
              message: "",
              consent: false,
            });
          }}
        >
          Request another journey
        </button>
      </div>
    );
  return (
    <form
      className="booking-form"
      onSubmit={submit}
      aria-label="Request a chauffeur journey"
    >
      <div className="form-title">
        <h3>Plan your journey</h3>
        <span>Availability request · no payment now</span>
      </div>
      <div className="service-picker">
        {Object.entries(services).map(([slug, s]) => (
          <button
            type="button"
            key={slug}
            className={service === slug ? "selected" : ""}
            aria-pressed={service === slug}
            onClick={() => setService(slug as ServiceSlug)}
          >
            {s.name}
            <strong>
              R{s.price.toLocaleString("en-ZA")}
              {slug === "private-day-tours" ? " / day" : ""}
            </strong>
          </button>
        ))}
      </div>
      <div className="form-grid">
        <label htmlFor="name">
          Full name
          <input
            id="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={200}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email address
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            maxLength={320}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>
        <label htmlFor="phone">
          Phone / WhatsApp
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={40}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </label>
        <label htmlFor="date">
          Travel date
          <input
            id="date"
            type="date"
            required
            min={today || undefined}
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </label>
        <label htmlFor="time">
          {service === "airport-transfers"
            ? "Flight arrival time"
            : "Preferred pickup time"}
          <input
            id="time"
            type="time"
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
          />
        </label>
        <label htmlFor="passengers">
          Passengers
          <input
            id="passengers"
            type="number"
            required
            min={1}
            max={20}
            value={form.passengers}
            onChange={(e) => update("passengers", e.target.value)}
          />
        </label>
        {service === "airport-transfers" ? (
          <label className="full-width" htmlFor="flight">
            Flight number
            <input
              id="flight"
              maxLength={30}
              placeholder="e.g. BA59 — optional if not booked yet"
              value={form.flight}
              onChange={(e) => update("flight", e.target.value)}
            />
          </label>
        ) : (
          <label className="full-width" htmlFor="pickup">
            Pickup address or hotel
            <input
              id="pickup"
              required
              maxLength={300}
              value={form.pickup}
              onChange={(e) => update("pickup", e.target.value)}
            />
          </label>
        )}
        <label className="full-width" htmlFor="destination">
          {service === "airport-transfers"
            ? "Destination address or hotel"
            : "Where would you like to explore?"}
          <input
            id="destination"
            required
            maxLength={500}
            placeholder={
              service === "airport-transfers"
                ? "Your Cape Town destination"
                : "Cape Peninsula, Winelands, city, or your own ideas"
            }
            value={form.destination}
            onChange={(e) => update("destination", e.target.value)}
          />
        </label>
        <label className="full-width" htmlFor="message">
          Luggage, access needs & special requests
          <textarea
            id="message"
            rows={3}
            maxLength={4000}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us what would make your journey special. For several tour days, include your dates."
          />
        </label>
      </div>
      <p className="form-hint">
        Vehicle suitability, luggage capacity, route, timings, and any extras
        are agreed before confirmation.
      </p>
      <label className="consent">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
        />
        <span>
          I agree to QuattroCape using these details to respond to my request,
          as explained in the <a href="/privacy">privacy policy</a>.
        </span>
      </label>
      <button className="button" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={17} />
            Sending request…
          </>
        ) : (
          <>
            Request availability <ArrowUpRight size={17} />
          </>
        )}
      </button>
      <p className="form-hint">
        This is an enquiry, not a confirmed reservation.
      </p>
      {error && (
        <div className="form-error" role="alert">
          <p>{error}</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            Send these details on WhatsApp ↗
          </a>
        </div>
      )}
    </form>
  );
}
