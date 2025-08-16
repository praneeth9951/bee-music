
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function PlaylistsPage(){
  const [pls, setPls] = React.useState<any[]>([]);
  const router = useRouter();
  React.useEffect(()=>{ async function load(){ const res = await fetch('/api/playlists'); if(res.ok) setPls(await res.json()); } load(); },[]);
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Playlists</h1>
      <div className="grid gap-3">
        {pls.map(p=>(<div key={p.id} className="p-3 border border-neutral-800 rounded flex justify-between"><div>{p.name}</div><div><a className="px-2 py-1 rounded bg-neutral-800" href={'/playlists/'+p.id}>Open</a></div></div>))}
      </div>
    </div>
  );
}
