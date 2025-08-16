
'use client';
import React from 'react';
import { useAuth } from '@/lib/useAuth';

export default function LoginPage() {
  const auth = useAuth();
  const [email, setEmail] = React.useState('');

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    await auth.signIn(email);
    alert('Magic link sent (check email).');
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Log in</h1>
      <form onSubmit={send} className="space-y-3">
        <input className="w-full rounded bg-neutral-900 border border-neutral-800 p-2" placeholder="you@email.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="rounded bg-[color:var(--accent)] text-black px-4 py-2">Send magic link</button>
      </form>
    </div>
  )
}
