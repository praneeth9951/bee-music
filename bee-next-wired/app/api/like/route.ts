
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export async function POST(req: NextRequest){
  const body = await req.json(); const track_id = String(body.track_id||'');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const auth = req.headers.get('authorization'); const token = auth?.startsWith('Bearer ')?auth.split(' ')[1]:'';
  const { data: u } = await anon.auth.getUser(token); const user_id = u?.user?.id || null;
  if(!user_id) return NextResponse.json({ error: 'Auth required' }, { status: 401 });
  const svc = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { error } = await svc.from('likes').upsert({ user_id, track_id }, { onConflict: 'user_id,track_id' });
  if(error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok:true });
}
export async function DELETE(req: NextRequest){
  const body = await req.json(); const track_id = String(body.track_id||'');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const auth = req.headers.get('authorization'); const token = auth?.startsWith('Bearer ')?auth.split(' ')[1]:'';
  const { data: u } = await anon.auth.getUser(token); const user_id = u?.user?.id || null;
  if(!user_id) return NextResponse.json({ error: 'Auth required' }, { status: 401 });
  const svc = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { error } = await svc.from('likes').delete().eq('user_id', user_id).eq('track_id', track_id);
  if(error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok:true });
}
