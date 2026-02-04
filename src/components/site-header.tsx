import { useLocation } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/fakultas": "Fakultas",
  "/prodi": "Program Studi",
  "/gedung": "Gedung & Ruangan",
  "/semester": "Semester",
  "/kurikulum": "Kurikulum",
  "/mahasiswa": "Mahasiswa",
  "/dosen": "Dosen",
  "/keuangan": "Keuangan",
  "/pengumuman": "Pengumuman",
  "/pengaturan": "Pengaturan",
  "/bantuan": "Bantuan",
}

export function SiteHeader() {
  const location = useLocation()
  const currentPage = pageTitles[location.pathname] || "Halaman"

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">SIAKAD</BreadcrumbLink>
            </BreadcrumbItem>
            {location.pathname !== "/" && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
