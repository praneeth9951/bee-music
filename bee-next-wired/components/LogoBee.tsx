
import React from 'react';
export default function LogoBee({ size = 28 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 128 128" aria-label="Bee logo">
      <defs><linearGradient id="beeGrad" x1="0" x2="1"><stop offset="0%" stopColor="#ffb347"/><stop offset="100%" stopColor="#ff8c00"/></linearGradient></defs>
      <rect x="20" y="30" rx="10" width="88" height="20" fill="#000"/><rect x="15" y="38" rx="8" width="16" height="32" fill="#000"/><rect x="97" y="38" rx="8" width="16" height="32" fill="#000"/>
      <ellipse cx="64" cy="70" rx="42" ry="36" fill="url(#beeGrad)" stroke="#000" strokeWidth="4"/>
      <rect x="36" y="44" width="56" height="8" fill="#000" opacity="0.9"/><rect x="36" y="62" width="56" height="8" fill="#000" opacity="0.9"/><rect x="36" y="80" width="56" height="8" fill="#000" opacity="0.9"/>
      <ellipse cx="44" cy="40" rx="20" ry="12" fill="#fff" opacity="0.85" stroke="#000" strokeWidth="2"/><ellipse cx="84" cy="40" rx="20" ry="12" fill="#fff" opacity="0.85" stroke="#000" strokeWidth="2"/>
      <circle cx="54" cy="72" r="4" fill="#000"/><circle cx="74" cy="72" r="4" fill="#000"/><path d="M52 82 Q64 90 76 82" stroke="#000" strokeWidth="3" fill="none"/>
    </svg>
  );
}
