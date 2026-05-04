import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ArrowUpRight, Shield, Clock, Compass, Gem, Instagram, MapPin, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookingForm } from './BookingForm';

// --- Components ---

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Reserve', href: '#reserve' },
  ];

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-luxury-black/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-luxury-black py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Removed Logo Text as requested */}
        <div className="flex items-center gap-10">
          <Link to="/" className="font-display text-2xl tracking-[0.2em] text-white group">
            QUATTRO<span className="text-luxury-gold italic group-hover:not-italic transition-all duration-500">CAPE</span>
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="font-accent text-[11px] uppercase tracking-[0.3em] font-medium text-white/40 hover:text-luxury-gold transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-500 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          <a 
            href="https://www.instagram.com/quattrocape/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-luxury-gold transition-colors block"
            aria-label="Instagram"
          >
            <Instagram size={20} strokeWidth={1.5} />
          </a>
          <a 
            href="https://wa.me/27123456789" 
            className="hidden sm:flex items-center gap-3 bg-white/5 hover:bg-luxury-gold hover:text-black border border-white/10 hover:border-luxury-gold px-6 py-3 rounded-full transition-all duration-500 text-[10px] uppercase tracking-widest font-accent"
          >
            WhatsApp <Phone size={12} />
          </a>
          
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-luxury-black border-b border-white/10 p-12 flex flex-col gap-10 lg:hidden shadow-2xl"
          >
            {navLinks.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="font-display text-4xl text-white/90 hover:text-luxury-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-6 pt-10 border-t border-white/5">
              <a href="https://wa.me/27123456789" className="btn-gold w-full text-center">
                Contact via WhatsApp
              </a>
              <div className="flex justify-center gap-8">
                <a href="https://www.instagram.com/quattrocape/" className="text-luxury-gold" target="_blank" rel="noopener noreferrer">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-luxury-black">
      {/* Visual Background with Stunning Images */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "alternate" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&q=85&w=2400" 
            alt="Exclusive black Mercedes-Benz luxury chauffeur service driving in Cape Town at night" 
            className="size-full object-cover object-center brightness-[0.35]"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/40"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-luxury-gold"></div>
                <span className="micro-label tracking-[0.6em]">The Private Reserve</span>
              </div>
              
              <h1 className="text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] font-display font-light mb-12">
                Private <br />
                <span className="text-luxury-gold italic">Chauffeur</span> <br />
                Experience
              </h1>

              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#reserve" 
                  className="btn-gold px-12 py-6 rounded-xs group"
                >
                  Book Experience <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.a>
                <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                    {[
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
                    ].map((url, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-luxury-black overflow-hidden bg-white/10 relative">
                        <img 
                          src={url} 
                          alt="Verified executive client of QuattroCape luxury chauffeur services" 
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 leading-tight">
                    Trusted by <br />
                    <span className="text-white font-semibold">Elite Individuals</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:block lg:col-span-4 translate-y-20">
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="p-8 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-xs"
             >
                <div className="space-y-8">
                  {[
                    { icon: <MapPin size={18} />, label: "Local Expertise", desc: "Curated Cape Town routes" },
                    { icon: <Clock size={18} />, label: "24/7 Availability", desc: "Absolute reachability" },
                    { icon: <Gem size={18} />, label: "Bespoke Fleet", desc: "The S-Class standard" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-5">
                      <div className="text-luxury-gold/60">{item.icon}</div>
                      <div>
                        <h4 className="micro-label !text-[10px] mb-1">{item.label}</h4>
                        <p className="text-white/40 text-[11px] leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="flex gap-1 text-luxury-gold mb-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                    </div>
                    <span className="micro-label !text-[8px] opacity-40">Verified Excellence</span>
                  </div>
                  <MapPin size={18} className="text-luxury-gold/40" />
                </div>
             </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4 cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
      >
        <span className="micro-label !text-[8px] tracking-[0.8em]">Scroll</span>
        <div className="w-[1px] h-12 bg-luxury-gold"></div>
      </motion.div>
    </section>
  );
};

export const Services = () => {
  const services = [
    {
      title: "Airport Transfers",
      label: "Arrivals & Departures",
      desc: "Seamless, elegant collections from CPT International. Luxury meet-and-greet with dedicated porter assistance.",
      img: "/images/services/airport-transfers.png",
      alt: "Premium airport terminal departures and arrivals hall with runway views for private Cape Town International transfers",
      price: "From €90"
    },
    {
      title: "Private Day Tours",
      label: "Curated Exploration",
      desc: "Experience the Winelands or Cape Point with an expert chauffeur. Tailored itineraries for the discerning explorer.",
      img: "/images/services/private-day-tours.png",
      alt: "Coastal touring road above turquoise ocean for private chauffeured Cape Point and scenic Cape Town day tours",
      price: "From €200"
    },
    {
      title: "Stay Chauffeur",
      label: "Full Residency",
      desc: "Your dedicated mobility partner for the duration of your stay. The ultimate standard in private transport.",
      img: "/images/services/stay-chauffeur.png",
      alt: "Luxury Audi cabin with quilted leather and premium cockpit for full-residency private chauffeur transport",
      price: "From €700"
    }
  ];

  return (
    <section id="services" className="py-32 md:py-56 bg-luxury-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <span className="micro-label mb-6 block opacity-50 underline decoration-luxury-gold/30 underline-offset-8">Our Collections</span>
            <h2 className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] font-display font-light">
              Movement <br />
              <span className="italic text-luxury-gold">Elevated</span>
            </h2>
          </div>
          <p className="max-w-sm text-white/40 font-light text-lg">
            Beyond transport—we provide a sanctuary on wheels. Every journey is curated for absolute peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
              className="group cursor-pointer min-h-0"
            >
              <div className="luxury-card h-full min-h-0 flex flex-col p-8 md:p-12">
                <div className="relative mb-10 h-[280px] sm:h-[300px] md:h-[380px] w-full shrink-0 overflow-hidden rounded-md transition-all duration-1000">
                    <img 
                      src={item.img} 
                      alt={item.alt} 
                      className="absolute inset-0 size-full bg-luxury-black object-cover object-center origin-center group-hover:scale-110 transition-transform duration-[3s]" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                      loading="eager"
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "auto"}
                    />
                  <div className="absolute top-4 right-4 z-10 bg-luxury-black/80 px-4 py-2 rounded-full border border-white/5">
                    <span className="micro-label !text-[8px] !text-white">{item.price}</span>
                  </div>
                </div>
                <span className="micro-label mb-4 block">{item.label}</span>
                <h3 className="text-3xl font-display mb-6 group-hover:text-luxury-gold transition-colors">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 font-light italic">
                  "{item.desc}"
                </p>
                <div className="mt-auto flex items-center justify-between group/btn">
                  <Link
                    to={
                      i === 0
                        ? '/airport-transfers'
                        : i === 1
                          ? '/private-day-tours'
                          : '/stay-chauffeur'
                    }
                    className="text-[10px] uppercase tracking-widest font-accent text-luxury-gold border-b border-luxury-gold/0 group-hover/btn:border-luxury-gold transition-all duration-500"
                  >
                    Enquire Now
                  </Link>
                  <Link
                    to={
                      i === 0
                        ? '/airport-transfers'
                        : i === 1
                          ? '/private-day-tours'
                          : '/stay-chauffeur'
                    }
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-luxury-gold group-hover:text-black transition-all"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="py-32 md:py-56 bg-white/[0.02] border-y border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative isolate h-[400px] lg:h-[600px] w-full overflow-hidden rounded-xs shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200" 
                alt="Luxurious interior of a QuattroCape executive sedan available in Cape Town" 
                className="absolute inset-0 size-full object-cover object-center origin-center hover:scale-105 transition-all duration-1000"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-10 left-10 space-y-2">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => <Gem key={s} size={12} className="text-luxury-gold" />)}
                </div>
                <p className="micro-label !text-white opacity-80">Immaculate Craftsmanship</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <span className="micro-label mb-8 block opacity-50 underline decoration-luxury-gold/30 underline-offset-8">The Ultimate Experience</span>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] font-display font-light mb-10">
                Discover <br />
                <span className="italic text-luxury-gold tracking-tight">Cape Town</span>
              </h2>
              <p className="text-xl text-white/50 leading-relaxed font-light mb-12">
                We craft unforgettable journeys for discerning travelers, transforming every ride into a curated exploration of the Cape's majestic beauty. From hidden coastal gems to the most celebrated wine estates, our chauffeurs are your personal guides to perfection.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-white/5 pt-12">
                {[
                  { icon: <Compass size={16} />, title: "Local Insight", desc: "Discover hidden gems and celebrated landmarks." },
                  { icon: <Gem size={16} />, title: "Bespoke Routes", desc: "Scenic drives tailored to your unique preferences." },
                  { icon: <Clock size={16} />, title: "Seamless Timing", desc: "Effortless flow from one exquisite moment to the next." },
                  { icon: <MapPin size={16} />, title: "Exclusive Access", desc: "Navigate the Cape with unparalleled local knowledge." }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <h4 className="micro-label !text-white text-[10px] mb-3 flex items-center gap-3">
                      <span className="text-luxury-gold">{item.icon}</span>
                      {item.title}
                    </h4>
                    <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/60 transition-colors uppercase tracking-widest">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Pricing = () => {
  const plans = [
    {
      name: "Day Exclusive",
      price: "200",
      info: "Single day premium service",
      features: ["10 Hour Dedicated Service", "Airport Collection included", "200km Radius", "Concierge Assist"],
      highlight: false
    },
    {
      name: "3-Day Residency",
      price: "700",
      info: "Perfect for long-weekends",
      features: ["3 Days (12hr/day)", "Winelands Tour Private", "600km Total Included", "24/7 Support Line"],
      highlight: true
    },
    {
      name: "Weekly Reserve",
      price: "1400",
      info: "The ultimate residence package",
      features: ["7 Full Days Priority", "Unlimited CPT Metro KM", "Guest Transport Add-ons", "Bespoke Itineraries"],
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-32 md:py-56 bg-luxury-black overflow-hidden relative">
      {/* Visual Background */}
      <div className="absolute inset-0 z-0 hidden overflow-hidden opacity-20 lg:block">
        <img 
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxurious scenic drive in Cape Town background" 
          className="absolute inset-0 size-full object-cover object-center"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-28">
          <span className="micro-label mb-8 block opacity-40">Transparent Value</span>
          <h2 className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.8] font-display font-light">
            Luxury <span className="italic text-luxury-gold font-normal">Retainers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`p-12 relative flex flex-col items-center transition-all duration-700 ${
                plan.highlight 
                ? 'bg-luxury-gold/[0.05] border border-luxury-gold/40 shadow-2xl' 
                : 'bg-white/[0.02] border border-white/5 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-luxury-gold text-black micro-label !text-[8px] py-1 px-8 tracking-[0.6em]">
                  Recommended
                </div>
              )}
              
              <h3 className="text-2xl font-display mb-1 text-center">{plan.name}</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-12 text-center">{plan.info}</p>
              
              <div className="flex items-baseline justify-center gap-2 mb-16 relative">
                <span className="text-luxury-gold text-sm font-semibold absolute -left-4 top-2">€</span>
                <span className="text-8xl font-display font-light tracking-tighter">{plan.price}</span>
                {i === 2 && <span className="text-luxury-gold text-4xl translate-y-[-10px] ml-1">+</span>}
              </div>

              <div className="w-full space-y-6 mb-16 border-y border-white/5 py-12">
                {plan.features.map((feat, fi) => (
                  <div key={fi} className="flex items-center gap-4">
                    <div className="w-1 h-1 rounded-full bg-luxury-gold"></div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-accent font-light">{feat}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#reserve" 
                onClick={() => {
                  window.location.hash = 'reserve';
                  // Dispatch a custom event to update the booking form
                  window.dispatchEvent(new CustomEvent('setBookingService', { detail: plan.name.split(' ')[0] }));
                }}
                className={`w-full group/btn flex items-center justify-center gap-3 py-4 transition-all duration-500 ${plan.highlight ? 'btn-gold shadow-gold' : 'btn-outline border-white/20 text-white hover:border-luxury-gold hover:text-black'}`}
              >
                Inquire <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUs = () => {
  return (
    <section id="about" className="py-32 md:py-56 bg-luxury-black border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="luxury-card relative h-[300px] w-full overflow-hidden p-4 md:h-[500px]">
                <div className="relative isolate size-full overflow-hidden rounded-xs">
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200" 
                    alt="Corporate executives discussing business in a private chauffeured luxury vehicle in Cape Town" 
                    className="absolute inset-0 size-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
             </div>
             {/* Floating badge */}
             <div className="absolute -bottom-10 -right-10 bg-luxury-gold text-black p-10 hidden sm:block">
                <Gem size={32} />
                <p className="micro-label !text-black mt-4">The Reserve <br /> Standard</p>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="micro-label mb-8 block opacity-40">Curated Perfection</span>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] font-display font-light mb-16">
              Effortless. <br />
              <span className="italic text-luxury-gold">Elegant.</span> <br />
              Unforgettable.
            </h2>
            
            <div className="grid grid-cols-1 gap-12">
              {[
                { n: "01", t: "Immersive Journeys", d: "Experience the true essence of Cape Town, from coastlines to vineyards." },
                { n: "02", t: "Absolute Comfort", d: "Relax in opulent vehicles designed for enjoying the scenic vistas." },
                { n: "03", t: "Concierge Network", d: "Unrivaled access to Table Mountain tickets, fine dining, and hidden culinary gems." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-10 group">
                  <span className="text-3xl font-display text-white/10 group-hover:text-luxury-gold transition-colors">{item.n}</span>
                  <div>
                    <h4 className="micro-label text-luxury-gold mb-3">{item.t}</h4>
                    <p className="text-white/40 text-sm leading-relaxed max-w-sm italic uppercase tracking-widest font-light">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Reservation = () => {
  return (
    <section id="reserve" className="py-32 md:py-56 bg-luxury-black relative overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 z-0 h-full w-full overflow-hidden opacity-10 lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1600" 
            alt="Professional luxury chauffeur opening the car door in Cape Town, South Africa" 
            className="absolute inset-0 size-full min-h-full min-w-full object-cover object-center lg:-skew-x-6 lg:translate-x-1/4"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <span className="micro-label mb-8 block opacity-40">Book Your Experience</span>
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] font-display font-light mb-10">
              The Path to <br />
              <span className="italic text-luxury-gold">Excellence</span> <br />
              Starts Here.
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed mb-12">
              Submit your inquiry and our concierge will contact you within 15 minutes to finalize your bespoke transport plan.
            </p>
            
            <div className="space-y-8">
               <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-luxury-gold">
                   <Phone size={18} />
                 </div>
                 <div>
                   <p className="micro-label !text-white/30 mb-1">Priority Line</p>
                   <p className="text-sm tracking-widest">+27 84 692 9334</p>
                 </div>
               </div>
               <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-luxury-gold">
                   <MapPin size={18} />
                 </div>
                 <div>
                   <p className="micro-label !text-white/30 mb-1">Global HQ</p>
                   <p className="text-sm tracking-widest">V&A Waterfront, Cape Town</p>
                 </div>
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer id="contact" className="bg-luxury-black pt-48 pb-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5">
            <h2 className="text-5xl font-display mb-12">Reserve Your <br /><span className="italic text-luxury-gold">Sanctuary</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16">
               <div>
                  <h4 className="micro-label mb-6 opacity-30">Our Presence</h4>
                  <p className="text-[11px] text-white/50 leading-loose uppercase tracking-[0.4em]">
                    V&A Waterfront<br />
                    Cape Town, 8001<br />
                    South Africa
                  </p>
               </div>
               <div>
                  <h4 className="micro-label mb-6 opacity-30">Direct Link</h4>
                  <p className="text-[11px] text-white/50 leading-loose uppercase tracking-[0.4em]">
                    +27 84 692 9334<br />
                    concierge@quattrocape.com
                  </p>
               </div>
            </div>
            {/* Prominent Instagram Link for Aesthetics */}
            <a 
              href="https://www.instagram.com/quattrocape/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 group bg-white/5 hover:bg-luxury-gold/10 px-8 py-4 rounded-full transition-all border border-white/5"
            >
              <Instagram size={18} className="text-luxury-gold" />
              <span className="micro-label !text-white group-hover:text-luxury-gold transition-colors">Join The Reserve on Instagram</span>
            </a>
          </div>

          <div className="lg:col-span-7 lg:flex flex-col items-end justify-end">
            <div className="text-left lg:text-right max-w-xl">
              <p className="text-3xl font-display font-light text-white/30 mb-10 leading-snug">
                "We don't just provide transport; we facilitate the most important resource of all: <span className="text-white italic">Time</span>."
              </p>
              <div className="flex flex-wrap gap-6 lg:justify-end">
                <a href="https://wa.me/27846929334" className="btn-gold !px-12 !py-6 text-sm">
                  WhatsApp Concierge
                </a>
                <Link 
                  to="/login"
                  className="btn-outline border-white/10 text-white hover:bg-white hover:text-black hover:border-white"
                >
                  Corporate Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-12">
            <span className="micro-label !text-white/20">© 2025 QuattroCape Private Reserve</span>
            <div className="w-[1px] h-4 bg-white/5 hidden md:block"></div>
            <div className="flex gap-8">
               <Link to="/privacy" className="micro-label !text-white/20 hover:text-white transition-colors">Privacy</Link>
               <Link to="/terms" className="micro-label !text-white/20 hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
             <span className="micro-label !text-white/30">Dispatcher Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

