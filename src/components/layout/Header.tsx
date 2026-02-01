import { useAuthStore } from '@/store/authStore'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { LogOut, User } from 'lucide-react'

export function Header() {
  const profile = useAuthStore((state) => state.profile)
  const { signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">SIAKAD</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <div className="text-sm">
              <p className="font-medium">{profile?.nama_lengkap}</p>
              <p className="text-muted-foreground capitalize">
                {profile?.role.replace('_', ' ')}
              </p>
            </div>
          </div>

          <button
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
