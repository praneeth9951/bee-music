
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export async function GET(_req, { params }){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  // return tracks in playlist
  const { data } = await anon.from('playlist_items').select('track:tracks(*)').eq('playlist_id', params.id);
  if(!data) return NextResponse.json([], { status: 200 });
  const tracks = data.map((r:any)=> r.track);
  return NextResponse.json(tracks);
}
