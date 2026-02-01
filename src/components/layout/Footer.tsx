export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-4">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SIAKAD - Sistem Informasi Akademik
          Kampus. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
