
import './globals.css'
import Sidebar from '@/components/Sidebar'
import PlayerBar from '@/components/Player'
import { AuthProvider } from '@/components/AuthProvider'

export const metadata = { title: 'Bee — Wired', description: 'Bee with auth, playlists, likes' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex pb-24">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8">{children}</main>
            <PlayerBar />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
