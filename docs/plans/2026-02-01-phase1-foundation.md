# Phase 1: Foundation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Setup complete project foundation for SIAKAD including project structure, database schema, authentication, core layouts, and CI/CD pipeline.

**Architecture:** React 18 + Vite frontend with ShadcnUI components, Supabase backend for database/auth/storage, TanStack Query for server state, Zustand for client state, and GitHub Actions for CI/CD.

**Tech Stack:** React 18, TypeScript, Vite, TailwindCSS, ShadcnUI, Supabase, TanStack Query, Zustand, React Hook Form, Zod, React Router v6

---

## Task 1: Project Setup & Dependencies

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `.gitignore`
- Create: `.env.example`

**Step 1: Initialize Vite project with React + TypeScript**

Run:
```bash
npm create vite@latest . -- --template react-ts
```

Expected: Vite project scaffolding created

**Step 2: Install core dependencies**

Run:
```bash
npm install react-router-dom @supabase/supabase-js @tanstack/react-query zustand react-hook-form zod @hookform/resolvers date-fns lucide-react sonner recharts
```

Expected: Dependencies installed successfully

**Step 3: Install dev dependencies**

Run:
```bash
npm install -D tailwindcss postcss autoprefixer @types/node vitest @testing-library/react @testing-library/jest-dom jsdom
```

Expected: Dev dependencies installed successfully

**Step 4: Initialize Tailwind CSS**

Run:
```bash
npx tailwindcss init -p
```

Expected: `tailwind.config.js` and `postcss.config.js` created

**Step 5: Configure Tailwind config**

Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
```

**Step 6: Install ShadcnUI dependencies**

Run:
```bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
```

Expected: ShadcnUI dependencies installed

**Step 7: Create environment file template**

Create `.env.example`:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Step 8: Update .gitignore**

Add to `.gitignore`:
```
# Environment variables
.env
.env.local

# Dependencies
node_modules

# Build
dist
dist-ssr
*.local

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

**Step 9: Configure TypeScript for path aliases**

Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 10: Update Vite config for path aliases**

Update `vite.config.ts`:
```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

**Step 11: Commit project setup**

Run:
```bash
git add .
git commit -m "feat: initialize project with Vite, React, TypeScript, and Tailwind

- Setup Vite with React 18 and TypeScript
- Configure Tailwind CSS with ShadcnUI
- Install core dependencies (React Router, Supabase, TanStack Query, Zustand)
- Configure path aliases (@/* imports)
- Add environment variables template

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Project Structure & Core Files

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `src/lib/utils.ts`
- Create: `src/lib/constants.ts`
- Create: `src/types/index.ts`
- Create: `src/types/database.types.ts`
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Create: `src/index.css`

**Step 1: Create project directory structure**

Run:
```bash
mkdir -p src/{components/{ui,layout,forms,shared},features/{auth,dashboard}/{components,hooks,services,types},hooks,lib,routes,store,types,assets}
```

Expected: Directory structure created

**Step 2: Setup Tailwind CSS in index.css**

Create `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 3: Create Supabase client**

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

**Step 4: Create utility functions**

Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
```

**Step 5: Create constants file**

Create `src/lib/constants.ts`:
```typescript
export const APP_NAME = 'SIAKAD'
export const APP_DESCRIPTION = 'Sistem Informasi Akademik Kampus'

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN_FAKULTAS: 'admin_fakultas',
  ADMIN_PRODI: 'admin_prodi',
  DOSEN: 'dosen',
  MAHASISWA: 'mahasiswa',
  KEUANGAN: 'keuangan',
} as const

export const GRADING_SCALE = {
  A: { min: 80, max: 100, point: 4.0 },
  'A-': { min: 75, max: 79, point: 3.75 },
  'B+': { min: 70, max: 74, point: 3.5 },
  B: { min: 65, max: 69, point: 3.0 },
  'B-': { min: 60, max: 64, point: 2.75 },
  'C+': { min: 55, max: 59, point: 2.5 },
  C: { min: 50, max: 54, point: 2.0 },
  D: { min: 40, max: 49, point: 1.0 },
  E: { min: 0, max: 39, point: 0.0 },
} as const

export const MAX_SKS_BY_IPS = {
  EXCELLENT: { minIPS: 3.0, maxSKS: 24 },
  GOOD: { minIPS: 2.5, maxSKS: 21 },
  AVERAGE: { minIPS: 2.0, maxSKS: 18 },
  BELOW_AVERAGE: { minIPS: 0, maxSKS: 15 },
} as const
```

**Step 6: Create base TypeScript types**

Create `src/types/index.ts`:
```typescript
export type Role =
  | 'super_admin'
  | 'admin_fakultas'
  | 'admin_prodi'
  | 'dosen'
  | 'mahasiswa'
  | 'keuangan'

export interface Profile {
  id: string
  role: Role
  nama_lengkap: string
  email: string
  phone?: string
  foto_url?: string
  created_at: string
  updated_at: string
}

export interface Mahasiswa {
  id: string
  user_id: string
  nim: string
  prodi_id: string
  angkatan: number
  status: 'aktif' | 'cuti' | 'lulus' | 'do' | 'mengundurkan_diri'
  kategori_ukt?: string
  dosen_pa_id?: string
  nik?: string
  tempat_lahir?: string
  tanggal_lahir?: string
  jenis_kelamin?: 'L' | 'P'
  created_at: string
  updated_at: string
}

export interface Dosen {
  id: string
  user_id: string
  nidn?: string
  nidk?: string
  prodi_id: string
  status_kepegawaian?: string
  jabatan_akademik?: string
  created_at: string
  updated_at: string
}
```

**Step 7: Create placeholder for database types**

Create `src/types/database.types.ts`:
```typescript
// This file will be auto-generated from Supabase schema
// For now, we'll use a placeholder type

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      [key: string]: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
```

**Step 8: Update main.tsx**

Create `src/main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Step 9: Create initial App component**

Create `src/App.tsx`:
```tsx
function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-foreground">
          SIAKAD - Sistem Informasi Akademik Kampus
        </h1>
        <p className="mt-4 text-muted-foreground">
          Foundation setup complete. Ready for development.
        </p>
      </div>
    </div>
  )
}

export default App
```

**Step 10: Test the setup**

Run:
```bash
npm run dev
```

Expected: Development server starts at http://localhost:5173 with welcome message

**Step 11: Commit project structure**

Run:
```bash
git add .
git commit -m "feat: setup project structure and core files

- Create organized directory structure (features, components, lib, etc)
- Setup Supabase client with TypeScript types
- Add utility functions (cn, formatDate, formatDateTime)
- Define application constants (roles, grading scale, max SKS rules)
- Create base TypeScript types (Profile, Mahasiswa, Dosen)
- Setup Tailwind CSS with ShadcnUI design tokens
- Create initial App component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Supabase Database Schema Setup

**Files:**
- Create: `supabase/migrations/20260201000001_create_profiles.sql`
- Create: `supabase/migrations/20260201000002_create_academic_structure.sql`
- Create: `supabase/migrations/20260201000003_create_users.sql`
- Create: `supabase/migrations/20260201000004_create_curriculum.sql`
- Create: `supabase/migrations/20260201000005_create_facilities.sql`
- Create: `supabase/migrations/20260201000006_create_schedule.sql`
- Create: `supabase/migrations/20260201000007_create_krs.sql`
- Create: `supabase/migrations/20260201000008_create_attendance.sql`
- Create: `supabase/migrations/20260201000009_create_grades.sql`
- Create: `supabase/migrations/20260201000010_create_finance.sql`
- Create: `supabase/migrations/20260201000011_create_notifications.sql`
- Create: `supabase/migrations/20260201000012_create_rls_policies.sql`
- Create: `supabase/migrations/20260201000013_create_functions.sql`

**Step 1: Create migrations directory**

Run:
```bash
mkdir -p supabase/migrations
```

Expected: Migrations directory created

**Step 2: Create profiles table migration**

Create `supabase/migrations/20260201000001_create_profiles.sql`:
```sql
-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'admin_fakultas', 'admin_prodi', 'dosen', 'mahasiswa', 'keuangan')),
  nama_lengkap VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  foto_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

**Step 3: Create academic structure migration**

Create `supabase/migrations/20260201000002_create_academic_structure.sql`:
```sql
-- Fakultas
CREATE TABLE fakultas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode VARCHAR(10) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  dekan_id UUID REFERENCES dosen(id),
  akreditasi VARCHAR(5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Program Studi
CREATE TABLE program_studi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fakultas_id UUID REFERENCES fakultas(id) ON DELETE CASCADE,
  kode VARCHAR(10) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  jenjang VARCHAR(10) CHECK (jenjang IN ('D3', 'D4', 'S1', 'S2', 'S3')),
  kaprodi_id UUID REFERENCES dosen(id),
  akreditasi VARCHAR(5),
  gelar VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Semester
CREATE TABLE semester (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(50) NOT NULL,
  tahun_ajaran VARCHAR(10) NOT NULL,
  jenis VARCHAR(20) CHECK (jenis IN ('ganjil', 'genap', 'pendek')),
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'aktif' CHECK (status IN ('draft', 'aktif', 'selesai')),
  krs_mulai DATE,
  krs_selesai DATE,
  perubahan_krs_mulai DATE,
  perubahan_krs_selesai DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_program_studi_fakultas ON program_studi(fakultas_id);
CREATE INDEX idx_semester_status ON semester(status);

-- Enable RLS
ALTER TABLE fakultas ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_studi ENABLE ROW LEVEL SECURITY;
ALTER TABLE semester ENABLE ROW LEVEL SECURITY;
```

**Step 4: Create users (mahasiswa & dosen) migration**

Create `supabase/migrations/20260201000003_create_users.sql`:
```sql
-- Mahasiswa
CREATE TABLE mahasiswa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  nim VARCHAR(20) UNIQUE NOT NULL,
  prodi_id UUID REFERENCES program_studi(id),
  angkatan INTEGER NOT NULL,
  semester_masuk_id UUID REFERENCES semester(id),
  status VARCHAR(50) DEFAULT 'aktif' CHECK (status IN ('aktif', 'cuti', 'lulus', 'do', 'mengundurkan_diri')),
  kategori_ukt VARCHAR(10),
  dosen_pa_id UUID REFERENCES dosen(id),

  -- Personal data
  nik VARCHAR(16),
  tempat_lahir VARCHAR(100),
  tanggal_lahir DATE,
  jenis_kelamin VARCHAR(10) CHECK (jenis_kelamin IN ('L', 'P')),
  agama VARCHAR(50),
  alamat TEXT,
  kota VARCHAR(100),
  provinsi VARCHAR(100),
  kode_pos VARCHAR(10),

  -- Parent/Guardian data
  nama_ayah VARCHAR(255),
  nama_ibu VARCHAR(255),
  phone_ortu VARCHAR(20),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dosen
CREATE TABLE dosen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  nidn VARCHAR(20) UNIQUE,
  nidk VARCHAR(20),
  prodi_id UUID REFERENCES program_studi(id),

  -- Employment data
  status_kepegawaian VARCHAR(50),
  jabatan_akademik VARCHAR(50),
  golongan VARCHAR(10),

  -- Education
  pendidikan_terakhir VARCHAR(10),
  bidang_keahlian TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_mahasiswa_nim ON mahasiswa(nim);
CREATE INDEX idx_mahasiswa_prodi ON mahasiswa(prodi_id);
CREATE INDEX idx_mahasiswa_status ON mahasiswa(status);
CREATE INDEX idx_dosen_nidn ON dosen(nidn);
CREATE INDEX idx_dosen_prodi ON dosen(prodi_id);

-- Enable RLS
ALTER TABLE mahasiswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE dosen ENABLE ROW LEVEL SECURITY;
```

**Step 5: Create curriculum migration**

Create `supabase/migrations/20260201000004_create_curriculum.sql`:
```sql
-- Kurikulum
CREATE TABLE kurikulum (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prodi_id UUID REFERENCES program_studi(id) ON DELETE CASCADE,
  nama VARCHAR(255) NOT NULL,
  tahun_mulai INTEGER NOT NULL,
  tahun_akhir INTEGER,
  total_sks_wajib INTEGER NOT NULL,
  total_sks_pilihan INTEGER NOT NULL,
  total_sks_minimal INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'aktif' CHECK (status IN ('aktif', 'non-aktif')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mata Kuliah
CREATE TABLE mata_kuliah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kurikulum_id UUID REFERENCES kurikulum(id) ON DELETE CASCADE,
  kode VARCHAR(20) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  nama_en VARCHAR(255),
  sks_teori INTEGER DEFAULT 0,
  sks_praktikum INTEGER DEFAULT 0,
  semester_rekomendasi INTEGER,
  jenis VARCHAR(20) CHECK (jenis IN ('wajib', 'pilihan', 'mbkm')),
  deskripsi TEXT,
  capaian_pembelajaran TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prerequisite mata kuliah
CREATE TABLE mata_kuliah_prasyarat (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mata_kuliah_id UUID REFERENCES mata_kuliah(id) ON DELETE CASCADE,
  prasyarat_id UUID REFERENCES mata_kuliah(id) ON DELETE CASCADE,
  UNIQUE(mata_kuliah_id, prasyarat_id)
);

-- Indexes
CREATE INDEX idx_kurikulum_prodi ON kurikulum(prodi_id);
CREATE INDEX idx_mata_kuliah_kode ON mata_kuliah(kode);
CREATE INDEX idx_mata_kuliah_kurikulum ON mata_kuliah(kurikulum_id);

-- Enable RLS
ALTER TABLE kurikulum ENABLE ROW LEVEL SECURITY;
ALTER TABLE mata_kuliah ENABLE ROW LEVEL SECURITY;
ALTER TABLE mata_kuliah_prasyarat ENABLE ROW LEVEL SECURITY;
```

**Step 6: Create facilities migration**

Create `supabase/migrations/20260201000005_create_facilities.sql`:
```sql
-- Gedung
CREATE TABLE gedung (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode VARCHAR(10) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  jumlah_lantai INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ruangan
CREATE TABLE ruangan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gedung_id UUID REFERENCES gedung(id) ON DELETE CASCADE,
  kode VARCHAR(20) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  lantai INTEGER,
  kapasitas INTEGER NOT NULL,
  jenis VARCHAR(50),
  fasilitas TEXT[],
  status VARCHAR(20) DEFAULT 'tersedia' CHECK (status IN ('tersedia', 'maintenance', 'tidak_tersedia')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ruangan_gedung ON ruangan(gedung_id);
CREATE INDEX idx_ruangan_status ON ruangan(status);

-- Enable RLS
ALTER TABLE gedung ENABLE ROW LEVEL SECURITY;
ALTER TABLE ruangan ENABLE ROW LEVEL SECURITY;
```

**Step 7: Create schedule migration**

Create `supabase/migrations/20260201000006_create_schedule.sql`:
```sql
-- Jadwal Kuliah
CREATE TABLE jadwal_kuliah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mata_kuliah_id UUID REFERENCES mata_kuliah(id),
  semester_id UUID REFERENCES semester(id),
  kelas VARCHAR(5) NOT NULL,
  ruangan_id UUID REFERENCES ruangan(id),
  hari VARCHAR(10) CHECK (hari IN ('senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu')),
  jam_mulai TIME NOT NULL,
  jam_selesai TIME NOT NULL,
  kuota INTEGER NOT NULL,
  terisi INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(semester_id, mata_kuliah_id, kelas)
);

-- Dosen pengampu (support multiple dosen per class)
CREATE TABLE jadwal_dosen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jadwal_id UUID REFERENCES jadwal_kuliah(id) ON DELETE CASCADE,
  dosen_id UUID REFERENCES dosen(id),
  is_koordinator BOOLEAN DEFAULT false,
  UNIQUE(jadwal_id, dosen_id)
);

-- Indexes
CREATE INDEX idx_jadwal_semester ON jadwal_kuliah(semester_id);
CREATE INDEX idx_jadwal_mata_kuliah ON jadwal_kuliah(mata_kuliah_id);
CREATE INDEX idx_jadwal_dosen_jadwal ON jadwal_dosen(jadwal_id);

-- Enable RLS
ALTER TABLE jadwal_kuliah ENABLE ROW LEVEL SECURITY;
ALTER TABLE jadwal_dosen ENABLE ROW LEVEL SECURITY;
```

**Step 8: Create KRS migration**

Create `supabase/migrations/20260201000007_create_krs.sql`:
```sql
-- KRS
CREATE TABLE krs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  semester_id UUID REFERENCES semester(id),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  total_sks INTEGER DEFAULT 0,
  approved_by UUID REFERENCES dosen(id),
  approved_at TIMESTAMPTZ,
  catatan_approval TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(mahasiswa_id, semester_id)
);

-- KRS Detail
CREATE TABLE krs_detail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  krs_id UUID REFERENCES krs(id) ON DELETE CASCADE,
  jadwal_id UUID REFERENCES jadwal_kuliah(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(krs_id, jadwal_id)
);

-- Indexes
CREATE INDEX idx_krs_mahasiswa_semester ON krs(mahasiswa_id, semester_id);
CREATE INDEX idx_krs_status ON krs(status);
CREATE INDEX idx_krs_detail_krs ON krs_detail(krs_id);

-- Enable RLS
ALTER TABLE krs ENABLE ROW LEVEL SECURITY;
ALTER TABLE krs_detail ENABLE ROW LEVEL SECURITY;
```

**Step 9: Create attendance migration**

Create `supabase/migrations/20260201000008_create_attendance.sql`:
```sql
-- Pertemuan
CREATE TABLE pertemuan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jadwal_id UUID REFERENCES jadwal_kuliah(id) ON DELETE CASCADE,
  pertemuan_ke INTEGER NOT NULL,
  tanggal DATE NOT NULL,
  topik TEXT,
  materi_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(jadwal_id, pertemuan_ke)
);

-- Presensi
CREATE TABLE presensi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pertemuan_id UUID REFERENCES pertemuan(id) ON DELETE CASCADE,
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('hadir', 'izin', 'sakit', 'alpa')),
  keterangan TEXT,
  waktu_presensi TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(pertemuan_id, mahasiswa_id)
);

-- Indexes
CREATE INDEX idx_pertemuan_jadwal ON pertemuan(jadwal_id);
CREATE INDEX idx_presensi_pertemuan ON presensi(pertemuan_id);
CREATE INDEX idx_presensi_mahasiswa ON presensi(mahasiswa_id);

-- Enable RLS
ALTER TABLE pertemuan ENABLE ROW LEVEL SECURITY;
ALTER TABLE presensi ENABLE ROW LEVEL SECURITY;
```

**Step 10: Create grades migration**

Create `supabase/migrations/20260201000009_create_grades.sql`:
```sql
-- Komponen Nilai
CREATE TABLE komponen_nilai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jadwal_id UUID REFERENCES jadwal_kuliah(id) ON DELETE CASCADE,
  nama VARCHAR(100) NOT NULL,
  bobot DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nilai Mahasiswa (per komponen)
CREATE TABLE nilai_mahasiswa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  komponen_nilai_id UUID REFERENCES komponen_nilai(id) ON DELETE CASCADE,
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  nilai DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(komponen_nilai_id, mahasiswa_id)
);

-- Nilai Akhir
CREATE TABLE nilai_akhir (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  krs_detail_id UUID REFERENCES krs_detail(id) ON DELETE CASCADE,
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  jadwal_id UUID REFERENCES jadwal_kuliah(id),

  nilai_angka DECIMAL(5,2),
  nilai_huruf VARCHAR(2),
  nilai_indeks DECIMAL(3,2),

  is_locked BOOLEAN DEFAULT false,
  locked_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(mahasiswa_id, jadwal_id)
);

-- Indexes
CREATE INDEX idx_komponen_nilai_jadwal ON komponen_nilai(jadwal_id);
CREATE INDEX idx_nilai_mahasiswa_komponen ON nilai_mahasiswa(komponen_nilai_id);
CREATE INDEX idx_nilai_akhir_mahasiswa ON nilai_akhir(mahasiswa_id);

-- Enable RLS
ALTER TABLE komponen_nilai ENABLE ROW LEVEL SECURITY;
ALTER TABLE nilai_mahasiswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE nilai_akhir ENABLE ROW LEVEL SECURITY;
```

**Step 11: Create finance migration**

Create `supabase/migrations/20260201000010_create_finance.sql`:
```sql
-- Tagihan
CREATE TABLE tagihan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  semester_id UUID REFERENCES semester(id),
  jenis_tagihan VARCHAR(50),
  jumlah DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'belum_bayar' CHECK (status IN ('belum_bayar', 'cicil', 'lunas')),
  deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pembayaran
CREATE TABLE pembayaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tagihan_id UUID REFERENCES tagihan(id) ON DELETE CASCADE,
  jumlah DECIMAL(12,2) NOT NULL,
  metode VARCHAR(50),
  bukti_url TEXT,
  tanggal_bayar TIMESTAMPTZ DEFAULT NOW(),
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tagihan_mahasiswa ON tagihan(mahasiswa_id);
CREATE INDEX idx_tagihan_status ON tagihan(status);
CREATE INDEX idx_pembayaran_tagihan ON pembayaran(tagihan_id);

-- Enable RLS
ALTER TABLE tagihan ENABLE ROW LEVEL SECURITY;
ALTER TABLE pembayaran ENABLE ROW LEVEL SECURITY;
```

**Step 12: Create notifications migration**

Create `supabase/migrations/20260201000011_create_notifications.sql`:
```sql
-- Pengumuman
CREATE TABLE pengumuman (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(255) NOT NULL,
  konten TEXT NOT NULL,
  target VARCHAR(50),
  target_id UUID,
  prioritas VARCHAR(20) DEFAULT 'normal' CHECK (prioritas IN ('normal', 'penting', 'urgent')),
  published_at TIMESTAMPTZ,
  expired_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifikasi
CREATE TABLE notifikasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  judul VARCHAR(255) NOT NULL,
  pesan TEXT NOT NULL,
  tipe VARCHAR(50),
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_pengumuman_target ON pengumuman(target, target_id);
CREATE INDEX idx_notifikasi_user ON notifikasi(user_id);
CREATE INDEX idx_notifikasi_unread ON notifikasi(user_id, is_read);

-- Enable RLS
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifikasi ENABLE ROW LEVEL SECURITY;
```

**Step 13: Commit database schema**

Run:
```bash
git add supabase/
git commit -m "feat: create complete database schema migrations

Create all database tables:
- Profiles and user roles (mahasiswa, dosen)
- Academic structure (fakultas, prodi, semester)
- Curriculum (kurikulum, mata kuliah, prasyarat)
- Facilities (gedung, ruangan)
- Schedule (jadwal kuliah, jadwal dosen)
- KRS (krs, krs_detail)
- Attendance (pertemuan, presensi)
- Grades (komponen nilai, nilai mahasiswa, nilai akhir)
- Finance (tagihan, pembayaran)
- Notifications (pengumuman, notifikasi)

All tables have RLS enabled and appropriate indexes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Authentication System

**Files:**
- Create: `src/features/auth/services/authService.ts`
- Create: `src/features/auth/hooks/useAuth.ts`
- Create: `src/features/auth/components/LoginForm.tsx`
- Create: `src/features/auth/components/ProtectedRoute.tsx`
- Create: `src/features/auth/components/RoleGuard.tsx`
- Create: `src/features/auth/types/index.ts`
- Create: `src/store/authStore.ts`
- Create: `src/routes/index.tsx`

**Step 1: Create auth service**

Create `src/features/auth/services/authService.ts`:
```typescript
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types'

export const authService = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    // Get user profile
    const profile = await this.getProfile(data.user.id)

    return { user: data.user, profile }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const profile = await this.getProfile(user.id)

    return { user, profile }
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  },

  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw error
  },
}
```

**Step 2: Create auth store**

Create `src/store/authStore.ts`:
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types'

interface AuthState {
  user: User | null
  profile: Profile | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      logout: () => set({ user: null, profile: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

**Step 3: Create useAuth hook**

Create `src/features/auth/hooks/useAuth.ts`:
```typescript
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { authService } from '../services/authService'

export function useAuth() {
  const navigate = useNavigate()
  const { user, profile, isAuthenticated, setUser, setProfile, logout } = useAuthStore()

  useEffect(() => {
    // Check active session
    authService.getCurrentUser().then(({ user, profile }) => {
      if (user && profile) {
        setUser(user)
        setProfile(profile)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const profile = await authService.getProfile(session.user.id)
          setUser(session.user)
          setProfile(profile)
        } else if (event === 'SIGNED_OUT') {
          logout()
          navigate('/login')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { user, profile } = await authService.signIn(email, password)
    setUser(user)
    setProfile(profile)
    navigate('/')
  }

  const signOut = async () => {
    await authService.signOut()
    logout()
    navigate('/login')
  }

  return {
    user,
    profile,
    isAuthenticated,
    signIn,
    signOut,
  }
}
```

**Step 4: Create LoginForm component**

Create `src/features/auth/components/LoginForm.tsx`:
```tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const { signIn } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null)
      setLoading(true)
      await signIn(data.email, data.password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">SIAKAD</h1>
        <p className="text-muted-foreground mt-2">
          Sistem Informasi Akademik Kampus
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Email / NIM / NIP
          </label>
          <input
            {...register('email')}
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan email, NIM, atau NIP"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Masukkan password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
```

**Step 5: Create ProtectedRoute component**

Create `src/features/auth/components/ProtectedRoute.tsx`:
```tsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
```

**Step 6: Create RoleGuard component**

Create `src/features/auth/components/RoleGuard.tsx`:
```tsx
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
```

**Step 7: Create routes configuration**

Create `src/routes/index.tsx`:
```tsx
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { LoginForm } from '@/features/auth/components/LoginForm'
import App from '@/App'

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
  },
])
```

**Step 8: Update main.tsx to use router**

Update `src/main.tsx`:
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

**Step 9: Test authentication flow**

Run:
```bash
npm run dev
```

Expected: App redirects to /login, login form is displayed

**Step 10: Commit authentication system**

Run:
```bash
git add .
git commit -m "feat: implement authentication system

- Create auth service (signIn, signOut, getProfile, resetPassword)
- Setup auth store with Zustand (persistent auth state)
- Create useAuth hook for auth operations
- Build LoginForm component with validation (React Hook Form + Zod)
- Implement ProtectedRoute for route guards
- Add RoleGuard for role-based access control
- Configure React Router with auth routes
- Setup auth state listener for session changes

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Core Layout Components

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Sidebar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/MainLayout.tsx`
- Create: `src/components/layout/Navigation.tsx`
- Update: `src/App.tsx`

**Step 1: Create Header component**

Create `src/components/layout/Header.tsx`:
```tsx
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
```

**Step 2: Create Sidebar component**

Create `src/components/layout/Sidebar.tsx`:
```tsx
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
```

**Step 3: Create Footer component**

Create `src/components/layout/Footer.tsx`:
```tsx
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
```

**Step 4: Create MainLayout component**

Create `src/components/layout/MainLayout.tsx`:
```tsx
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
```

**Step 5: Update App.tsx to use MainLayout**

Update `src/App.tsx`:
```tsx
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
```

**Step 6: Test layout**

Run:
```bash
npm run dev
```

Expected: App displays with header, sidebar, and footer. Navigation items are visible.

**Step 7: Commit layout components**

Run:
```bash
git add .
git commit -m "feat: create core layout components

- Build Header with user profile and logout button
- Create Sidebar with role-based navigation
- Add Footer component
- Implement MainLayout wrapper component
- Update App to use MainLayout
- Setup navigation with icons (lucide-react)
- Add role-based menu filtering

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: CI/CD Pipeline Setup

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/deploy.yml`
- Create: `vitest.config.ts`
- Create: `.eslintrc.cjs`
- Update: `package.json` (add scripts)

**Step 1: Create Vitest config**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Step 2: Create test setup file**

Run:
```bash
mkdir -p src/test
```

Create `src/test/setup.ts`:
```typescript
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

**Step 3: Create ESLint config**

Create `.eslintrc.cjs`:
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
}
```

**Step 4: Update package.json scripts**

Add to `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "type-check": "tsc --noEmit"
  }
}
```

**Step 5: Create CI workflow**

Create `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build
        run: npm run build
```

**Step 6: Create deploy workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Step 7: Install ESLint**

Run:
```bash
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-refresh
```

Expected: ESLint installed successfully

**Step 8: Test CI locally**

Run:
```bash
npm run type-check && npm run lint && npm run build
```

Expected: All checks pass successfully

**Step 9: Create README for CI/CD**

Create `docs/CI-CD.md`:
```markdown
# CI/CD Pipeline

## Overview
This project uses GitHub Actions for continuous integration and deployment.

## Workflows

### CI Workflow (.github/workflows/ci.yml)
Runs on every push and pull request to `main` and `develop` branches.

**Steps:**
1. Type checking (TypeScript)
2. Linting (ESLint)
3. Tests (Vitest)
4. Build

### Deploy Workflow (.github/workflows/deploy.yml)
Runs on every push to `main` branch.

**Steps:**
1. Type checking
2. Linting
3. Tests
4. Build (with production env vars)
5. Deploy to Vercel

## Required Secrets

Add these secrets in GitHub repository settings:

- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

## Local Testing

Run CI checks locally:

```bash
npm run type-check
npm run lint
npm run test
npm run build
```
```

**Step 10: Commit CI/CD setup**

Run:
```bash
git add .
git commit -m "feat: setup CI/CD pipeline with GitHub Actions

- Create CI workflow (type-check, lint, test, build)
- Add deployment workflow for Vercel
- Configure Vitest for testing
- Setup ESLint for code quality
- Add npm scripts for development workflow
- Document CI/CD process in docs/CI-CD.md

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Summary

This plan implements **Phase 1: Foundation** with 6 main tasks:

1. **Project Setup** - Vite, React, TypeScript, Tailwind, dependencies
2. **Project Structure** - Directory organization, core files, utilities
3. **Database Schema** - Complete Supabase migrations for all tables
4. **Authentication** - Login, auth guards, role-based access
5. **Layout Components** - Header, sidebar, footer, navigation
6. **CI/CD Pipeline** - GitHub Actions, testing, linting, deployment

**Total Steps:** 63 steps across 6 tasks
**Estimated Time:** 2-3 days for full implementation
**Testing:** Each task includes testing steps
**Commits:** Frequent commits after each major task

**Next Phase:** Phase 2 - Master Data Management
