import { MainLayout } from './components/layout/MainLayout'

function App() {
  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang di SIAKAD - Sistem Informasi Akademik Kampus
        </p>
      </div>
    </MainLayout>
  )
}

export default App
