
'use client';
import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import TrackCard from '@/components/TrackCard';

export default function LibraryPage(){
  const [liked, setLiked] = React.useState<any[]>([]);

  React.useEffect(()=>{
    async function load(){
      // if not logged in, you'll get empty; this expects client to send token via fetchWithAuth for /api/my-likes
      const res = await fetch('/api/my-likes');
      if(res.ok){ setLiked(await res.json()); }
      else { setLiked([]); }
    }
    load();
  },[]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Liked Songs</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {liked.map((t:any)=><TrackCard key={t.id} track={t} />)}
      </div>
    </div>
  );
}
