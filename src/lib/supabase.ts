import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eobzmqrkvpnbfyjkdlhf.supabase.co';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_5l4mfA_mwB90jYd56P0-1w_oCEwlpb-';

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase configuration missing. Database features will be disabled. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.');
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

export type LeadSubmission = {
  name: string;
  email: string;
  service: string;
  message: string;
};

/**
 * Adds a new lead to the Supabase 'leads' table.
 * Do not chain .select() after insert: anon users have INSERT-only RLS; RETURNING requires SELECT.
 */
export async function addLead(data: LeadSubmission): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase configuration missing');

  const payload = {
    name: data.name.trim(),
    email: data.email.trim(),
    service: data.service.trim(),
    message: data.message,
  };

  const { error } = await supabase.from('leads').insert([payload]);

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }
}

/**
 * Fetches all leads from the Supabase 'leads' table (Admin only).
 */
export async function getLeads() {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase configuration missing');

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error fetching leads:', error);
    throw error;
  }

  return data;
}

/**
 * Handles signing in (Admin restricted by Supabase policies).
 */
export async function signIn(email: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase configuration missing');

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Signs out the current user.
 */
export async function signOut() {
  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Gets the current active session.
 */
export async function getSession() {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}
