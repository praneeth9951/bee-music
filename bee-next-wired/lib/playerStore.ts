
'use client';
import { create } from 'zustand';
export type Track = { id: string; title: string; artist: string; cover_url?: string; audio_url: string; duration?: number; };
type RepeatMode = 'off'|'one'|'all';
type PlayerState = {
  queue: Track[]; index: number; playing: boolean; shuffle: boolean; repeat: RepeatMode;
  setQueue: (q: Track[], startIndex?: number)=>void; play: ()=>void; pause: ()=>void; next: ()=>void; prev: ()=>void;
  toggleShuffle: ()=>void; cycleRepeat: ()=>void;
};
export const usePlayer = create<PlayerState>((set,get)=>({ queue:[],index:0,playing:false,shuffle:false,repeat:'off',
  setQueue:(q,start=0)=>set({queue:q,index:start,playing:true}), play:()=>set({playing:true}), pause:()=>set({playing:false}),
  next:()=>{ const {queue,index,repeat,shuffle}=get(); if(!queue.length) return; if(repeat==='one') return set({index,playing:true}); if(shuffle){const n=Math.floor(Math.random()*queue.length); return set({index:n,playing:true});} const next=index+1; if(next>=queue.length){ if(repeat==='all') return set({index:0,playing:true}); return set({playing:false}); } set({index:next,playing:true}); },
  prev:()=>{ const {queue,index}=get(); if(!queue.length) return; const prev=index-1; set({index: prev<0?0:prev, playing:true}); },
  toggleShuffle:()=>set(s=>({shuffle:!s.shuffle})), cycleRepeat:()=>set(s=>({repeat:s.repeat==='off'?'one': s.repeat==='one'?'all':'off'}))
}));
