import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { LoginForm } from '@/features/auth/components/LoginForm'
import App from '@/App'
import FakultasPage from '@/features/akademik/pages/FakultasPage'
import ProdiPage from '@/features/akademik/pages/ProdiPage'
import TestPage from '@/pages/TestPage'
import DebugPage from '@/pages/DebugPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground">
              Selamat datang di SIAKAD - Sistem Informasi Akademik Kampus
            </p>
          </div>
        ),
      },
      {
        path: 'fakultas',
        element: <FakultasPage />,
      },
      {
        path: 'prodi',
        element: <ProdiPage />,
      },
      {
        path: 'test',
        element: <TestPage />,
      },
      {
        path: 'debug',
        element: <DebugPage />,
      },
    ],
  },
])
