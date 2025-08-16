
'use client';
import Link from 'next/link';
import LogoBee from './LogoBee';
import clsx from 'clsx';
import { useAuth } from '@/lib/useAuth';

export default function Sidebar() {
  const auth = useAuth();
  const isAdmin = auth.user && (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(s=>s.trim().toLowerCase()).includes(auth.user.email || '');

  return (
    <aside className="w-64 shrink-0 h-full border-r border-neutral-800 p-4 hidden md:flex md:flex-col gap-4">
      <div className="flex items-center gap-2">
        <LogoBee size={28}/>
        <span className="font-bold text-xl">Bee</span>
      </div>
      <nav className="flex flex-col gap-1">
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-neutral-800">Home</Link>
        <Link href="/library" className="block px-4 py-2 rounded-md hover:bg-neutral-800">Library</Link>
        <Link href="/playlists" className="block px-4 py-2 rounded-md hover:bg-neutral-800">Playlists</Link>
        <Link href="/upload" className={"block px-4 py-2 rounded-md " + (isAdmin ? 'bg-[color:var(--accent)] text-black' : 'hover:bg-neutral-800')}>Upload</Link>
      </nav>
      <div className="mt-auto text-xs text-neutral-400">
        {auth.user ? <div><div className='text-sm'>{auth.user.email}</div><button onClick={()=>auth.signOut()} className='mt-2 rounded bg-neutral-800 px-3 py-1'>Logout</button></div> : <Link href='/login' className='rounded bg-[color:var(--accent)] text-black px-3 py-1'>Login</Link>}
      </div>
    </aside>
  );
}
