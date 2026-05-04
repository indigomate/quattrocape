import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Mail, Calendar, User, ClipboardList, Loader2, ArrowLeft } from 'lucide-react';
import { getLeads, signOut } from '../lib/supabase';

interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  created_at: string;
}

export default function AdminPortal() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data as Lead[]);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-luxury-black text-white font-sans relative">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=40&w=1920" 
          alt="QuattroCape luxury chauffeur service administrative dashboard background showing scenic Cape Town drive" 
          className="absolute inset-0 size-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Header */}
      <header className="border-b border-white/5 glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-display uppercase tracking-widest text-luxury-gold">QuattroCape Admin</h1>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            Sign Out <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl mb-2 font-display">Client Inquiries</h2>
            <p className="text-white/40 uppercase tracking-[0.1em] text-xs">Total Reservations: {leads.length}</p>
          </div>
          
          <button 
            onClick={fetchLeads}
            disabled={loading}
            className="btn-outline !py-3 !px-6"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Refresh Data'}
          </button>
        </div>

        {error && (
          <div className="p-6 border border-red-500/20 bg-red-500/5 text-red-500 rounded-sm mb-8">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-luxury-gold" size={32} />
          </div>
        ) : (
          <div className="grid gap-6">
            {leads.length === 0 ? (
              <div className="luxury-card luxury-card-glass p-20 text-center">
                <ClipboardList className="mx-auto mb-4 text-white/10" size={48} />
                <p className="text-white/40">No inquiries received yet.</p>
              </div>
            ) : (
              leads.map((lead, idx) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="luxury-card luxury-card-glass group"
                >
                  <div className="p-8 flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <div className="micro-label mb-2">Service Request</div>
                      <div className="text-2xl text-luxury-gold font-display">{lead.service}</div>
                      <div className="mt-4 text-[10px] text-white/30 truncate">ID: {lead.id}</div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-white/80">
                          <User size={16} className="text-luxury-gold" />
                          <span>{lead.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <Mail size={16} className="text-luxury-gold" />
                          <a href={`mailto:${lead.email}`} className="hover:text-luxury-gold transition-colors">{lead.email}</a>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                        <div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">Message</div>
                        <p className="text-white/70 italic leading-relaxed">
                          "{lead.message || 'No additional message provided.'}"
                        </p>
                      </div>
                    </div>

                    <div className="md:w-1/6 flex flex-col items-end justify-between">
                      <div className="text-right">
                        <div className="micro-label mb-1">Received</div>
                        <div className="flex items-center gap-2 text-white/50 text-xs">
                          <Calendar size={12} />
                          {new Date(lead.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">Proprietary Administration Interface &copy; 2026 QuattroCape</p>
        </div>
      </footer>
    </div>
  );
}
