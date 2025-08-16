
'use client';
import React from 'react';
import SearchBar from '@/components/SearchBar';
import TrackCard from '@/components/TrackCard';
import { supabase } from '@/lib/supabaseClient';

export default function HomePage(){
  const [tracks, setTracks] = React.useState<any[]>([]);

  React.useEffect(()=>{ async function load(){ const { data } = await supabase.from('tracks_view').select('*').order('created_at',{ascending:false}).limit(12); if(data) setTracks(data); } load(); },[]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Welcome to Bee</h1>
        <SearchBar />
      </div>
      <p className="text-neutral-400 mb-6">Royalty-free music. Connect Supabase for uploads & playlists.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tracks.map(t => <TrackCard key={t.id} track={t} />)}
      </div>
    </div>
  )
}
