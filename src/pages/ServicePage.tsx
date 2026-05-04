import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Navbar, Footer } from '../components/LandingPage';
import { Seo } from '../components/Seo';

type ServiceContent = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  price: string;
  path: string;
};

const SERVICE_MAP: Record<string, ServiceContent> = {
  'airport-transfers': {
    title: 'Airport Transfers',
    subtitle: 'Arrivals & Departures',
    description:
      'Private luxury airport transfers in Cape Town with professional meet-and-greet service, precise scheduling, and discreet executive transport.',
    image: '/images/services/airport-transfers.png',
    alt: 'Premium airport arrivals and departures hall for chauffeur transfer services',
    price: 'From €90',
    path: '/airport-transfers',
  },
  'private-day-tours': {
    title: 'Private Day Tours',
    subtitle: 'Curated Exploration',
    description:
      'Bespoke chauffeured day tours across Cape Town, from coastal drives to wine routes, with tailored itineraries and refined comfort.',
    image: '/images/services/private-day-tours.png',
    alt: 'Scenic coastal route in Cape Town for a private day tour',
    price: 'From €200',
    path: '/private-day-tours',
  },
  'stay-chauffeur': {
    title: 'Stay Chauffeur',
    subtitle: 'Full Residency',
    description:
      'Dedicated private chauffeur service for the duration of your stay, offering seamless daily mobility and premium executive comfort.',
    image: '/images/services/stay-chauffeur.png',
    alt: 'Luxury vehicle interior for full-stay chauffeur service',
    price: 'From €700',
    path: '/stay-chauffeur',
  },
};

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICE_MAP[slug] : undefined;

  if (!service) {
    return (
      <main className="min-h-screen bg-luxury-black text-white">
        <Navbar />
        <section className="py-40 px-6 text-center">
          <h1 className="text-5xl">Service not found</h1>
          <Link to="/" className="btn-gold mt-10 inline-flex">
            Return Home
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const seoTitle = `${service.title} | QuattroCape Chauffeur Cape Town`;
  const seoDescription = `${service.description} ${service.price}.`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'QuattroCape',
      areaServed: 'Cape Town',
    },
    areaServed: 'Cape Town',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      description: service.price,
    },
  };

  return (
    <main className="min-h-screen bg-luxury-black text-white">
      <Seo title={seoTitle} description={seoDescription} path={service.path} jsonLd={jsonLd} />
      <Navbar />

      <section className="py-28 md:py-40 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="micro-label opacity-50 block mb-6">{service.subtitle}</span>
            <h1 className="text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.9] font-display font-light mb-8">
              {service.title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10">{service.description}</p>
            <div className="flex flex-wrap items-center gap-6">
              <span className="micro-label !text-white/70 border border-white/10 px-4 py-2 rounded-full">
                {service.price}
              </span>
              <a href="/#reserve" className="btn-gold">
                Reserve This Service <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xs border border-white/10 bg-white/[0.02]">
            <img src={service.image} alt={service.alt} className="w-full h-[520px] object-cover" loading="eager" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

