import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import type { Role } from '@/types'

interface RoleGuardProps {
  roles: Role[]
  children: React.ReactNode
}

export function RoleGuard({ roles, children }: RoleGuardProps) {
  const profile = useAuthStore((state) => state.profile)

  if (!profile || !roles.includes(profile.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
