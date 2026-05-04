import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Loader2, CheckCircle2, Gem } from 'lucide-react';
import { signIn } from '../lib/supabase';

export default function LoginPortal() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center lg:justify-start p-0 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-luxury-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[100px] rounded-full" />
      </div>

      {/* Side Image for Desktop */}
      <div className="absolute top-0 right-0 hidden h-full w-1/2 overflow-hidden opacity-60 lg:block">
        <img 
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1600" 
          alt="QuattroCape luxury chauffeur service staff login portal with Cape Town scenic coastal background" 
          className="absolute inset-0 size-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-transparent to-transparent"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-md w-full relative z-10 lg:ml-24 p-6"
      >
        <div className="luxury-card luxury-card-glass p-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
              <Gem size={32} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h1 className="text-3xl font-display mb-3">QuattroCape Staff</h1>
                <p className="text-white/40 text-sm mb-8 tracking-wide">
                  Enter your administrative email to access the dashboard.
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                      type="email"
                      required
                      placeholder="admin@quattrocape.co.za"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xs py-4 pl-12 pr-4 text-white focus:outline-none focus:border-luxury-gold/50 transition-colors"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-xs italic">{error}</p>
                  )}

                  <button
                    disabled={loading}
                    className="w-full btn-gold !py-4"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>Continue to Dashboard <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6"
              >
                <CheckCircle2 className="text-emerald-500 mx-auto mb-6" size={64} />
                <h2 className="text-2xl font-display mb-4">Transmission Sent</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  Check <span className="text-white font-medium">{email}</span> for your secure access link.
                </p>
                <button 
                  onClick={() => setSent(false)}
                  className="text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-accent border-b border-luxury-gold/0 hover:border-luxury-gold transition-all"
                >
                  Resend Link
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="text-[9px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all"
          >
            Return to Main Site
          </button>
        </div>
      </motion.div>
    </div>
  );
}
