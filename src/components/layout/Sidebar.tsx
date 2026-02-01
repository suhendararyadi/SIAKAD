import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import {
  Home,
  Calendar,
  FileText,
  GraduationCap,
  Users,
  BookOpen,
  Settings,
} from 'lucide-react'

interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
  roles?: string[]
}

const navItems: NavItem[] = [
  {
    to: '/',
    label: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
  },
  {
    to: '/krs',
    label: 'KRS',
    icon: <FileText className="h-5 w-5" />,
    roles: ['mahasiswa'],
  },
  {
    to: '/jadwal',
    label: 'Jadwal Kuliah',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    to: '/nilai',
    label: 'Nilai',
    icon: <GraduationCap className="h-5 w-5" />,
    roles: ['mahasiswa', 'dosen'],
  },
  {
    to: '/mahasiswa',
    label: 'Mahasiswa',
    icon: <Users className="h-5 w-5" />,
    roles: ['super_admin', 'admin_fakultas', 'admin_prodi'],
  },
  {
    to: '/kurikulum',
    label: 'Kurikulum',
    icon: <BookOpen className="h-5 w-5" />,
    roles: ['super_admin', 'admin_prodi'],
  },
  {
    to: '/settings',
    label: 'Pengaturan',
    icon: <Settings className="h-5 w-5" />,
  },
]

export function Sidebar() {
  const profile = useAuthStore((state) => state.profile)

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(profile?.role || '')
  )

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r bg-background">
      <nav className="flex flex-col gap-1 p-4">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
