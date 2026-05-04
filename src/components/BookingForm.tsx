import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, Loader2, Send } from 'lucide-react';
import { addLead } from '../lib/supabase';

const services = ["Day", "3-Day", "Weekly"];

export const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dates: '',
    guests: 1,
    service: services[0],
    message: ''
  });

  useEffect(() => {
    const handleServiceUpdate = (e: any) => {
      const selectedService = e.detail;
      if (services.includes(selectedService)) {
        setFormData(prev => ({ ...prev, service: selectedService }));
      }
    };

    window.addEventListener('setBookingService', handleServiceUpdate);
    return () => window.removeEventListener('setBookingService', handleServiceUpdate);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addLead({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: `Phone: ${formData.phoneNumber} | Dates: ${formData.dates} | Guests: ${formData.guests} | Message: ${formData.message}`
      });

      setSuccess(true);
      
      // Reset form after a few seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          dates: '',
          guests: 1,
          service: services[0],
          message: ''
        });
      }, 3000);

    } catch (err: any) {
      console.error("Booking submission error:", err);
      // Provide more specific feedback if it's a configuration error
      if (err.message?.includes('Supabase configuration missing')) {
        setError("System configuration error: Supabase URL or Key is missing in environment secrets.");
      } else if (err.message?.includes('Failed to fetch')) {
        setError("Network error: Could not reach the database. Please check your connection.");
      } else {
        setError(err.message || "Failed to submit request. Please try again or contact via WhatsApp directly.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="luxury-card luxury-card-glass p-8 md:p-12 max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <span className="micro-label mb-2 block opacity-50">Reservation Request</span>
        <h3 className="text-3xl font-display font-light">Secure Your <span className="italic text-luxury-gold">Reservation</span></h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="micro-label !text-[10px] opacity-40">Your Name</label>
            <input 
              required
              type="text"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xs px-4 py-3 text-sm focus:border-luxury-gold outline-none transition-colors"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="micro-label !text-[10px] opacity-40">Email Address</label>
            <input 
              required
              type="email"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xs px-4 py-3 text-sm focus:border-luxury-gold outline-none transition-colors"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="micro-label !text-[10px] opacity-40">Phone Number</label>
            <input 
              required
              type="tel"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xs px-4 py-3 text-sm focus:border-luxury-gold outline-none transition-colors"
              placeholder="+27..."
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="micro-label !text-[10px] opacity-40">Requested Dates</label>
            <input 
              required
              type="text"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xs px-4 py-3 text-sm focus:border-luxury-gold outline-none transition-colors"
              placeholder="e.g. May 12 - May 15"
              value={formData.dates}
              onChange={(e) => setFormData({...formData, dates: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="micro-label !text-[10px] opacity-40">Select Service</label>
            <select 
              className="w-full bg-white/[0.03] border border-white/10 rounded-xs px-4 py-3 text-sm focus:border-luxury-gold outline-none transition-colors appearance-none"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            >
              {services.map(s => <option key={s} value={s} className="bg-luxury-black">{s} Package</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="micro-label !text-[10px] opacity-40">Number of Guests</label>
            <input 
              required
              type="number"
              min="1"
              max="20"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xs px-4 py-3 text-sm focus:border-luxury-gold outline-none transition-colors"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="micro-label !text-[10px] opacity-40">Additional Message</label>
          <textarea 
            rows={3}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xs px-4 py-3 text-sm focus:border-luxury-gold outline-none transition-colors resize-none"
            placeholder="Dietary requirements, specific destinations, or special requests..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>

        <button 
          disabled={loading || success}
          type="submit"
          className="w-full btn-gold !py-5 mt-8 group flex items-center justify-center gap-3 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </motion.div>
            ) : success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Check size={18} />
                Request Received
              </motion.div>
            ) : (
              <motion.div 
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                Inquire Availability <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {error && (
          <p className="text-red-400 text-[10px] uppercase tracking-widest text-center mt-4">{error}</p>
        )}

        {success && (
          <p className="text-luxury-gold text-[10px] uppercase tracking-[0.2em] text-center mt-4 animate-pulse">
            Your request has been successfully submitted.
          </p>
        )}
      </form>
    </div>
  );
};
