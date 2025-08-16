
'use client';
import React from 'react';
import { usePlayer } from '@/lib/playerStore';

function Waveform({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement | null> }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(()=>{
    const c = canvasRef.current; if(!c) return;
    const ctx = c.getContext('2d')!;
    let raf: number;
    function draw(){
      if(!audioRef.current) return;
      const audio = audioRef.current;
      const p = audio.duration ? audio.currentTime / audio.duration : 0;
      const dpr = devicePixelRatio || 1;
      const w = c.clientWidth * dpr; const h = c.clientHeight * dpr;
      if(c.width !== w || c.height !== h){ c.width = w; c.height = h; }
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = '#222'; ctx.fillRect(0,0,w,h);
      ctx.fillStyle = '#ff8c00'; ctx.fillRect(0,0,w*p,h);
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return ()=> cancelAnimationFrame(raf);
  }, [audioRef]);

  const onClick = (e: React.MouseEvent) => {
    const c = canvasRef.current; const audio = audioRef.current; if(!c || !audio) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left; const pct = x / rect.width;
    audio.currentTime = pct * (audio.duration || 0);
  }

  return <canvas onClick={onClick} ref={canvasRef} className="w-full h-6 rounded cursor-pointer" />
}

export default function PlayerBar() {
  const { queue, index, playing, next, prev, play, pause, toggleShuffle, cycleRepeat, shuffle, repeat } = usePlayer();
  const track = queue[index];
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(()=>{
    if(!audioRef.current) return;
    if(!track){ audioRef.current.pause(); return; }
    audioRef.current.src = track.audio_url;
    if(playing) audioRef.current.play().catch(()=>{});
  }, [track?.id]);

  React.useEffect(()=>{
    if(!audioRef.current) return;
    playing ? audioRef.current.play().catch(()=>{}) : audioRef.current.pause();
  }, [playing]);

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-800 bg-black/80 backdrop-blur p-3">
      <div className="max-w-5xl mx-auto flex items-center gap-4">
        <img src={track?.cover_url||'/covers/default.png'} alt="cover" className="w-12 h-12 rounded object-cover border"/>
        <div className="min-w-0">
          <div className="truncate font-medium">{track?.title || '—'}</div>
          <div className="truncate text-sm text-neutral-400">{track?.artist || '—'}</div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={prev} className="px-2 py-1 rounded hover:bg-neutral-800">⏮</button>
          <button onClick={()=> playing ? pause() : play()} className="px-3 py-1 rounded bg-[color:var(--accent)] text-black">{playing? 'Pause' : 'Play'}</button>
          <button onClick={next} className="px-2 py-1 rounded hover:bg-neutral-800">⏭</button>
          <button onClick={toggleShuffle} className={"px-2 py-1 rounded "+(shuffle? 'bg-neutral-700':'hover:bg-neutral-800')}>🔀</button>
          <button onClick={cycleRepeat} className="px-2 py-1 rounded hover:bg-neutral-800">{repeat==='off'?'🔁': repeat==='one'?'🔂':'🔁∞'}</button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-2"><Waveform audioRef={audioRef} /></div>
      <audio ref={audioRef} onEnded={next} />
    </div>
  );
}
