import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
