
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
export async function GET(req: NextRequest){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const auth = req.headers.get('authorization'); const token = auth?.startsWith('Bearer ')?auth.split(' ')[1]:'';
  const { data: u } = await anon.auth.getUser(token); const user_id = u?.user?.id || null;
  if(!user_id) return NextResponse.json([], { status: 200 });
  const svc = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data } = await svc.from('likes').select('track:tracks(*)').eq('user_id', user_id);
  const tracks = (data || []).map((r:any)=> r.track);
  return NextResponse.json(tracks);
}
