
'use client';
import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { usePlayer } from '@/lib/playerStore';

export default function SearchBar() {
  const [q, setQ] = React.useState('');
  const [results, setResults] = React.useState<any[]>([]);
  const setQueue = usePlayer(s => s.setQueue);

  const run = async (value: string) => {
    setQ(value);
    if (!value) return setResults([]);
    const ilike = `%${value}%`;
    const { data } = await supabase
      .from('tracks_view')
      .select('*')
      .or(`title.ilike.${ilike},artist_name.ilike.${ilike}`)
      .limit(30);
    if (data) setResults(data);
  };

  return (
    <div className="relative">
      <input value={q} onChange={e=>run(e.target.value)} placeholder="Search songs or artists" className="w-full md:w-96 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 outline-none" />
      {!!results.length && (
        <div className="absolute mt-2 w-full max-h-64 overflow-auto rounded-lg border border-neutral-800 bg-black/90 z-20">
          {results.map(r => (
            <div key={r.id} className="p-2 hover:bg-neutral-800 cursor-pointer" onClick={()=> setQueue(results.map((x:any)=>({id:x.id,title:x.title,artist:x.artist_name,audio_url:x.audio_url,cover_url:x.cover_url})), results.findIndex((x:any)=>x.id===r.id))}>
              <div className="font-medium">{r.title}</div>
              <div className="text-sm text-neutral-400">{r.artist_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
