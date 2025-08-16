
'use client';
import React from 'react';
import { usePlayer } from '@/lib/playerStore';
import { fetchWithAuth } from '@/lib/fetchWithAuth';

export default function TrackCard({ track }: { track: any }) {
  const setQueue = usePlayer(s => s.setQueue);
  const [liked, setLiked] = React.useState(false);

  const playNow = ()=> setQueue([{ id: track.id, title: track.title, artist: track.artist_name || track.artist, audio_url: track.audio_url, cover_url: track.cover_url }], 0);

  const like = async ()=>{
    const res = await fetchWithAuth('/api/like', { method: liked? 'DELETE' : 'POST', headers: { 'Content-Type':'application/json'}, body: JSON.stringify({ track_id: track.id }) });
    if(res.ok) setLiked(v=>!v);
    else if(res.status===401) alert('Log in to like songs');
  };

  const addToPlaylist = async ()=>{
    const name = prompt('Playlist name'); if(!name) return;
    await fetchWithAuth('/api/playlists/item', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name, track_id: track.id }) });
    alert('Added');
  };

  return (
    <div className="rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition">
      <img src={track.cover_url || '/covers/default.png'} alt={track.title} className="w-full aspect-square object-cover" />
      <div className="p-3">
        <div className="font-medium truncate">{track.title}</div>
        <div className="text-sm text-neutral-400 truncate">{track.artist_name || track.artist}</div>
        <div className="flex gap-2 mt-2">
          <button onClick={playNow} className="flex-1 rounded bg-[color:var(--accent)] text-black py-1">Play</button>
          <button onClick={like} className="px-2 rounded border border-neutral-700 hover:bg-neutral-800">{liked? '♥':'♡'}</button>
          <button onClick={addToPlaylist} className="px-2 rounded border border-neutral-700 hover:bg-neutral-800">＋</button>
        </div>
      </div>
    </div>
  );
}
