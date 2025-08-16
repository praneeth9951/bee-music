
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export const runtime = 'nodejs';
function isAllowedEmail(email){ const list = (process.env.ADMIN_EMAILS||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean); return list.includes(email?.toLowerCase()); }
export async function POST(req){ const url=process.env.NEXT_PUBLIC_SUPABASE_URL; const service=process.env.SUPABASE_SERVICE_ROLE_KEY; const client = createClient(url, service);
  const formData = await req.formData(); const secret = String(formData.get('secret')||''); if(process.env.UPLOAD_SECRET && secret !== process.env.UPLOAD_SECRET){
    const auth = req.headers.get('authorization'); if(!auth?.startsWith('Bearer ')) return NextResponse.json({ error:'Forbidden'},{status:403});
    const token = auth.split(' ')[1]; const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY); const { data: u } = await anon.auth.getUser(token); const email = u?.user?.email || ''; if(!isAllowedEmail(email)) return NextResponse.json({ error:'Forbidden'},{status:403});
  }
  const title=String(formData.get('title')||''); const artist=String(formData.get('artist')||''); const cover_url=String(formData.get('cover_url')||''); const audio = formData.get('audio');
  if(!title||!artist||!audio) return NextResponse.json({ error:'Missing'},{status:400});
  const arrayBuffer = await audio.arrayBuffer(); const ext = (audio.name.split('.').pop()||'wav').toLowerCase(); const path = `audio/${crypto.randomUUID()}.${ext}`;
  const storage = client.storage.from('audio'); const { error: upErr } = await storage.upload(path, Buffer.from(arrayBuffer), { contentType: audio.type || 'audio/wav' }); if(upErr) return NextResponse.json({ error:upErr.message},{status:500});
  const { data: pub } = storage.getPublicUrl(path); const audio_url = pub.publicUrl;
  const { data: trackRow, error: tErr } = await client.from('tracks').insert({ title, audio_path: path, audio_url, cover_url: cover_url || null }).select('id').single(); if(tErr) return NextResponse.json({ error:tErr.message},{status:500});
  const track_id = trackRow.id; const { data: artistRow } = await client.from('artists').upsert({ name: artist }, { onConflict: 'name' }).select('id').single(); await client.from('track_artists').insert({ track_id, artist_id: artistRow.id });
  return NextResponse.json({ ok:true, track_id });
}
