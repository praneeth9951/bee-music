
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export async function GET(){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data } = await anon.from('playlists').select('id,name').order('created_at',{ascending:false});
  return NextResponse.json(data || []);
}
