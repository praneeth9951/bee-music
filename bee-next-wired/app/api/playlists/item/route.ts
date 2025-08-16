
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export async function POST(req: NextRequest){
  const body = await req.json(); const name = String(body.name||''); const track_id = String(body.track_id||'');
  if(!name||!track_id) return NextResponse.json({error:'name/track_id'},{status:400});
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const client = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data: pl } = await client.from('playlists').upsert({ name }, { onConflict: 'name' }).select('id').single();
  await client.from('playlist_items').insert({ playlist_id: pl.id, track_id });
  return NextResponse.json({ok:true});
}
