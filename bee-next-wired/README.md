
# Bee — Wired (Auth, Playlists, Likes, Search, Player Seeking)

This is a fully-wired Bee starter. Drop into a Next.js environment and run it locally.

## Quick start
1. npm i
2. Copy .env.local.example -> .env.local and fill keys.
3. npm run dev

## Supabase notes
Run the SQL in previous README plus the playlists/likes tables. Ensure storage bucket 'audio' is public or configure signed URLs.

## What changed
- AuthProvider: globally provides user & session (supabase magic link)
- fetchWithAuth: client helper that injects bearer token for protected APIs
- Playlist detail page and Playlists index
- Liked songs appear in Library (via /api/my-likes)
- TrackCard uses fetchWithAuth to like and add to playlists
- Player waveform is interactive (click to seek)
- Upload page requires either UPLOAD_SECRET or admin email access

## Security
- Keep SUPABASE_SERVICE_ROLE_KEY secret (server only).
- Protect who can upload in production (remove shared secret, use admin role checks).
