
'use client';
import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { Provider, Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  signIn: (email: string) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(res => {
      if (!mounted) return;
      setSession(res.data.session || null);
      setUser(res.data.session?.user || null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s || null);
      setUser(s?.user || null);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); }
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  const signIn = async (email: string) => {
    await supabase.auth.signInWithOtp({ email });
  };

  return <AuthContext.Provider value={{ user, session, signOut, signIn }}>{children}</AuthContext.Provider>;
}
