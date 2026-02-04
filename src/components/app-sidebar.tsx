"use client"

import * as React from "react"
import {
  GraduationCap,
  LayoutDashboardIcon,
  BuildingIcon,
  UsersIcon,
  BookOpenIcon,
  CalendarIcon,
  ClipboardListIcon,
  SettingsIcon,
  HelpCircleIcon,
  DoorOpenIcon,
  UserIcon,
  WalletIcon,
  BellIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/authStore"

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Fakultas",
    url: "/fakultas",
    icon: BuildingIcon,
  },
  {
    title: "Program Studi",
    url: "/prodi",
    icon: BookOpenIcon,
  },
  {
    title: "Gedung & Ruangan",
    url: "/gedung",
    icon: DoorOpenIcon,
  },
  {
    title: "Semester",
    url: "/semester",
    icon: CalendarIcon,
  },
  {
    title: "Kurikulum",
    url: "/kurikulum",
    icon: ClipboardListIcon,
  },
]

const navAkademik = [
  {
    title: "Mahasiswa",
    url: "/mahasiswa",
    icon: UsersIcon,
  },
  {
    title: "Dosen",
    url: "/dosen",
    icon: UserIcon,
  },
  {
    title: "Keuangan",
    url: "/keuangan",
    icon: WalletIcon,
  },
]

const navSecondary = [
  {
    title: "Pengumuman",
    url: "/pengumuman",
    icon: BellIcon,
  },
  {
    title: "Pengaturan",
    url: "/pengaturan",
    icon: SettingsIcon,
  },
  {
    title: "Bantuan",
    url: "/bantuan",
    icon: HelpCircleIcon,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { profile } = useAuthStore()

  const user = {
    name: profile?.nama_lengkap || "Administrator",
    email: profile?.email || "admin@siakad.ac.id",
    avatar: profile?.foto_url || "",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="text-base font-semibold">SIAKAD</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} label="Master Data" />
        <NavMain items={navAkademik} label="Akademik" />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
