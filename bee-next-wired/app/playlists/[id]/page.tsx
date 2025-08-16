
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import TrackCard from '@/components/TrackCard';
import { usePlayer } from '@/lib/playerStore';

export default function PlaylistDetail(){
  const params = useParams();
  const id = params?.id;
  const [tracks, setTracks] = React.useState<any[]>([]);
  const setQueue = usePlayer(s=>s.setQueue);

  React.useEffect(()=>{ async function load(){ const res = await fetch('/api/playlists/'+id); if(res.ok) setTracks(await res.json()); } load(); },[id]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Playlist</h1>
      <div className="flex gap-2 mb-4">
        <button onClick={()=> setQueue(tracks.map(t=>({id:t.id,title:t.title,artist:t.artist_name,audio_url:t.audio_url,cover_url:t.cover_url})),0)} className="rounded bg-[color:var(--accent)] text-black px-4 py-2">Play All</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tracks.map(t => <TrackCard key={t.id} track={t} />)}
      </div>
    </div>
  );
}
