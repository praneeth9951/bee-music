
'use client';
import { supabase } from '@/lib/supabaseClient';

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  const headers = new Headers(init?.headers || {});
  if (token) headers.set('Authorization', 'Bearer ' + token);
  return fetch(input, { ...init, headers });
}
