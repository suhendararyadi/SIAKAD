# Product Requirements Document (PRD)
# Sistem Informasi Akademik Kampus (SIAKAD)

## 1. Executive Summary

### 1.1 Tujuan Dokumen
Dokumen ini menjelaskan spesifikasi lengkap untuk pengembangan Sistem Informasi Akademik Kampus (SIAKAD) berbasis web yang disesuaikan dengan kebutuhan universitas di Indonesia.

### 1.2 Overview Produk
SIAKAD adalah platform manajemen akademik terintegrasi yang memfasilitasi proses administrasi akademik, mulai dari pendaftaran mahasiswa, pengelolaan mata kuliah, KRS, penilaian, hingga pelaporan akademik.

### 1.3 Tech Stack
- **Frontend**: React 18+ with Vite, ShadcnUI, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage, Real-time)
- **State Management**: Zustand / TanStack Query
- **Form Management**: React Hook Form + Zod
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library

---

## 2. Stakeholders & User Personas

### 2.1 User Roles

#### 1. **Super Admin**
- Mengelola seluruh sistem
- Konfigurasi universitas dan semester
- Manajemen user dan permissions

#### 2. **Admin Fakultas**
- Mengelola data fakultas
- Mengelola program studi
- Approve jadwal dan mata kuliah

#### 3. **Admin Prodi**
- Mengelola kurikulum
- Mengelola mata kuliah
- Monitoring mahasiswa prodi

#### 4. **Dosen**
- Mengelola kelas
- Input nilai
- Bimbingan akademik
- Upload materi

#### 5. **Mahasiswa**
- Mengisi KRS
- Melihat jadwal kuliah
- Melihat nilai
- Mengunduh transkrip
- Evaluasi dosen

#### 6. **Bagian Keuangan**
- Manajemen pembayaran
- Monitoring tunggakan
- Generate laporan keuangan

---

## 3. Core Features

### 3.1 Authentication & Authorization

#### Features:
- Login dengan email/NIM/NIP
- Multi-factor authentication (optional)
- Role-based access control (RBAC)
- Session management
- Password reset via email
- SSO integration (optional untuk future)

#### User Stories:
```
- Sebagai mahasiswa, saya ingin login dengan NIM agar dapat mengakses sistem
- Sebagai admin, saya ingin mengatur permissions agar user hanya akses fitur sesuai role
- Sebagai user, saya ingin reset password via email jika lupa
```

---

### 3.2 Dashboard

#### Features Per Role:

**Mahasiswa:**
- Overview IPK dan IPS terakhir
- Jadwal kuliah hari ini
- Notifikasi deadline KRS, UTS, UAS
- Kalender akademik
- Status pembayaran
- Pengumuman kampus

**Dosen:**
- Jadwal mengajar hari ini
- Daftar kelas aktif
- Notifikasi tugas/deadline
- Statistik kehadiran mahasiswa
- Quick access input nilai

**Admin:**
- Statistik mahasiswa aktif
- Statistik dosen
- Monitoring KRS
- Laporan akademik
- Alert & notifications

---

### 3.3 Manajemen Master Data

#### 3.3.1 Universitas & Struktur Organisasi
- Data universitas (nama, logo, alamat, akreditasi)
- Fakultas
- Program Studi (S1, S2, S3, D3, D4)
- Jurusan/Departemen

#### 3.3.2 Semester & Tahun Akademik
- Tahun akademik (2024/2025)
- Semester (Ganjil/Genap/Pendek)
- Periode KRS
- Periode perkuliahan
- Periode UTS/UAS
- Kalender akademik

#### 3.3.3 Gedung & Ruangan
- Data gedung
- Ruang kelas (kapasitas, fasilitas)
- Laboratorium
- Status ketersediaan

---

### 3.4 Manajemen Kurikulum

#### Features:
- Desain kurikulum per prodi
- Mata kuliah (kode, nama, SKS, semester)
- Prasyarat mata kuliah
- Mata kuliah wajib/pilihan
- Kurikulum berbasis MBKM (Merdeka Belajar Kampus Merdeka)
- Konversi kurikulum lama ke baru

#### Data Structure:
```typescript
interface Kurikulum {
  id: string;
  nama: string; // "Kurikulum 2020"
  prodi_id: string;
  tahun_mulai: number;
  tahun_akhir: number;
  total_sks_wajib: number;
  total_sks_pilihan: number;
  total_sks_minimal: number;
  status: 'aktif' | 'non-aktif';
  mata_kuliah: MataKuliah[];
}

interface MataKuliah {
  id: string;
  kode: string; // "TIF101"
  nama: string;
  sks_teori: number;
  sks_praktikum: number;
  semester: number; // semester berapa
  jenis: 'wajib' | 'pilihan' | 'mbkm';
  prasyarat: string[]; // array of mata_kuliah_id
  deskripsi: string;
  capaian_pembelajaran: string[];
}
```

---

### 3.5 Manajemen Jadwal Kuliah

#### Features:
- Penjadwalan mata kuliah per semester
- Assignment dosen pengampu
- Assignment ruangan
- Deteksi konflik jadwal (dosen, ruangan, mahasiswa)
- Multiple dosen per kelas (team teaching)
- Kelas paralel (A, B, C)
- Jadwal teori & praktikum

#### Validations:
- Tidak ada dosen mengajar di 2 tempat dalam waktu bersamaan
- Tidak ada ruangan digunakan 2 kelas dalam waktu bersamaan
- Kapasitas ruangan tidak melebihi jumlah mahasiswa

#### Data Structure:
```typescript
interface JadwalKuliah {
  id: string;
  mata_kuliah_id: string;
  semester_id: string;
  kelas: string; // "A", "B", "C"
  dosen_pengampu: string[]; // array of dosen_id
  ruangan_id: string;
  hari: 'senin' | 'selasa' | 'rabu' | 'kamis' | 'jumat' | 'sabtu';
  jam_mulai: string; // "08:00"
  jam_selesai: string; // "10:00"
  kuota: number;
  terisi: number;
  status: 'draft' | 'published';
}
```

---

### 3.6 Kartu Rencana Studi (KRS)

#### Features:

**Pengisian KRS (Mahasiswa):**
- Browse mata kuliah tersedia
- Filter by semester, jenis (wajib/pilihan)
- Lihat prasyarat mata kuliah
- Add/remove mata kuliah
- Lihat total SKS yang diambil
- Validasi max SKS berdasarkan IPS:
  - IPS ≥ 3.00: max 24 SKS
  - IPS 2.50-2.99: max 21 SKS
  - IPS 2.00-2.49: max 18 SKS
  - IPS < 2.00: max 15 SKS
- Submit KRS untuk approval
- Print KRS

**Approval KRS (Dosen PA):**
- Lihat daftar mahasiswa bimbingan
- Review KRS mahasiswa
- Approve/reject dengan catatan
- Monitoring progress mahasiswa

**Monitoring (Admin):**
- Dashboard pengisian KRS
- Statistik mahasiswa sudah/belum isi KRS
- Export data KRS

#### Business Rules:
- KRS hanya bisa diisi dalam periode yang ditentukan
- Mahasiswa harus sudah bayar UKT
- Mahasiswa baru semester 1 otomatis KRS mata kuliah wajib
- Mata kuliah dengan prasyarat hanya bisa diambil jika lulus prasyarat
- KRS yang sudah disetujui tidak bisa diubah (kecuali periode perubahan KRS)

---

### 3.7 Manajemen Perkuliahan

#### 3.7.1 Presensi
- Dosen melakukan presensi (manual atau QR code)
- Mahasiswa melihat riwayat presensi
- Status: Hadir, Izin, Sakit, Alpa
- Batas minimal kehadiran 75% untuk mengikuti UAS
- Notifikasi jika kehadiran < 75%

#### 3.7.2 Materi Kuliah
- Dosen upload materi (PDF, PPT, video)
- Mahasiswa download materi
- Versioning materi

#### 3.7.3 Tugas & Kuis
- Dosen buat tugas/kuis
- Set deadline
- Mahasiswa submit tugas
- Dosen beri nilai dan feedback

---

### 3.8 Manajemen Nilai

#### Features:

**Input Nilai (Dosen):**
- Input nilai per komponen:
  - Tugas (bobot %)
  - Kuis (bobot %)
  - UTS (bobot %)
  - UAS (bobot %)
  - Praktikum (bobot %)
- Auto-calculate nilai akhir
- Konversi ke nilai huruf (A, A-, B+, B, dst)
- Bulk input via Excel
- Lock nilai setelah deadline

**Lihat Nilai (Mahasiswa):**
- Nilai per mata kuliah
- Nilai per komponen
- KHS (Kartu Hasil Studi) per semester
- Transkrip nilai keseluruhan
- IPK dan IPS
- Download/print KHS dan transkrip

#### Grading System:
```
A:  80-100  (4.00)
A-: 75-79   (3.75)
B+: 70-74   (3.50)
B:  65-69   (3.00)
B-: 60-64   (2.75)
C+: 55-59   (2.50)
C:  50-54   (2.00)
D:  40-49   (1.00)
E:  0-39    (0.00)
```

#### Calculations:
```typescript
// IPS (Indeks Prestasi Semester)
IPS = Σ(Nilai × SKS) / Σ(SKS)

// IPK (Indeks Prestasi Kumulatif)
IPK = Σ(Nilai × SKS dari semua semester) / Σ(SKS dari semua semester)
```

---

### 3.9 Manajemen Mahasiswa

#### Features:
- Registrasi mahasiswa baru
- Data pribadi (NIK, nama, tempat/tanggal lahir, alamat, dll)
- Data orang tua/wali
- Upload dokumen (KTP, ijazah, foto)
- Status mahasiswa (aktif, cuti, lulus, DO, mengundurkan diri)
- Riwayat akademik
- Generate NIM otomatis (format: tahun + kode prodi + nomor urut)
- Kartu mahasiswa (digital)

#### Fitur Cuti:
- Mahasiswa mengajukan cuti akademik
- Upload surat keterangan
- Approval admin
- Max 2 semester berturut-turut

#### Fitur Wisuda:
- Syarat wisuda (min SKS, min IPK)
- Pengajuan wisuda
- Monitoring kelulusan
- Generate ijazah dan transkrip

---

### 3.10 Manajemen Dosen

#### Features:
- Data pribadi dosen (NIDN/NIDK, nama, email, phone)
- Data kepegawaian (status, jabatan akademik, golongan)
- Pendidikan (S1, S2, S3)
- Keahlian/bidang ilmu
- Riwayat mengajar
- Beban mengajar (SKS)
- Sertifikasi
- Publikasi dan penelitian

---

### 3.11 Bimbingan Akademik

#### Features:
- Assignment dosen PA (Penasihat Akademik) ke mahasiswa
- Konsultasi akademik
- Catatan bimbingan
- History konsultasi
- Monitoring progress mahasiswa
- Early warning system (mahasiswa dengan IPS rendah)

---

### 3.12 Evaluasi Dosen

#### Features:
- Mahasiswa mengisi kuesioner evaluasi dosen
- Pertanyaan evaluasi (kualitas pengajaran, materi, metode, dll)
- Skala penilaian (1-5)
- Komentar/saran
- Periode evaluasi (setiap akhir semester)
- Laporan hasil evaluasi untuk dosen dan admin
- Anonymized feedback

---

### 3.13 Manajemen Keuangan

#### Features:

**Pembayaran UKT:**
- Kategori UKT (UKT 1-8)
- Generate tagihan per semester
- Status pembayaran (lunas, belum bayar, cicil)
- Payment gateway integration (optional)
- Bukti pembayaran
- Riwayat pembayaran

**Biaya Lain:**
- SKS (untuk universitas dengan sistem per SKS)
- Praktikum
- Wisuda
- Sertifikat
- Legalisir

**Monitoring:**
- Dashboard tunggakan
- Laporan keuangan
- Export data

---

### 3.14 Pelaporan & Analytics

#### Features:
- Laporan mahasiswa aktif per prodi
- Laporan IPK/IPS per angkatan
- Laporan kelulusan
- Statistik penerimaan mahasiswa baru
- Analisis mata kuliah dengan nilai rendah
- Laporan dosen dan beban mengajar
- Laporan keuangan
- Export ke PDF/Excel
- Custom reports dengan filter

---

### 3.15 Notifikasi & Pengumuman

#### Features:
- Push notification (web push)
- Email notification
- In-app notification
- Pengumuman kampus
- Pengumuman per prodi/fakultas
- Notifikasi penting:
  - Periode KRS dibuka
  - KRS disetujui/ditolak
  - Nilai sudah keluar
  - Jadwal ujian
  - Deadline pembayaran
  - Status kehadiran < 75%

---

## 4. Database Schema (Supabase/PostgreSQL)

### 4.1 Core Tables

#### Users & Authentication
```sql
-- Managed by Supabase Auth
-- auth.users table

-- Extended user profile
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

-- Mahasiswa specific data
CREATE TABLE mahasiswa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  nim VARCHAR(20) UNIQUE NOT NULL,
  prodi_id UUID REFERENCES program_studi(id),
  angkatan INTEGER NOT NULL,
  semester_masuk_id UUID REFERENCES semester(id),
  status VARCHAR(50) DEFAULT 'aktif' CHECK (status IN ('aktif', 'cuti', 'lulus', 'do', 'mengundurkan_diri')),
  kategori_ukt VARCHAR(10), -- "UKT-1", "UKT-2", dst
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

-- Dosen specific data
CREATE TABLE dosen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  nidn VARCHAR(20) UNIQUE,
  nidk VARCHAR(20),
  prodi_id UUID REFERENCES program_studi(id),

  -- Employment data
  status_kepegawaian VARCHAR(50), -- "PNS", "Dosen Tetap", "Dosen Tidak Tetap"
  jabatan_akademik VARCHAR(50), -- "Asisten Ahli", "Lektor", "Lektor Kepala", "Guru Besar"
  golongan VARCHAR(10),

  -- Education
  pendidikan_terakhir VARCHAR(10), -- "S1", "S2", "S3"
  bidang_keahlian TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Academic Structure
```sql
CREATE TABLE fakultas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode VARCHAR(10) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  dekan_id UUID REFERENCES dosen(id),
  akreditasi VARCHAR(5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE program_studi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fakultas_id UUID REFERENCES fakultas(id) ON DELETE CASCADE,
  kode VARCHAR(10) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  jenjang VARCHAR(10) CHECK (jenjang IN ('D3', 'D4', 'S1', 'S2', 'S3')),
  kaprodi_id UUID REFERENCES dosen(id),
  akreditasi VARCHAR(5),
  gelar VARCHAR(50), -- "S.Kom", "S.T.", dst
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE semester (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama VARCHAR(50) NOT NULL, -- "2024/2025 Ganjil"
  tahun_ajaran VARCHAR(10) NOT NULL, -- "2024/2025"
  jenis VARCHAR(20) CHECK (jenis IN ('ganjil', 'genap', 'pendek')),
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'aktif' CHECK (status IN ('draft', 'aktif', 'selesai')),

  -- KRS period
  krs_mulai DATE,
  krs_selesai DATE,
  perubahan_krs_mulai DATE,
  perubahan_krs_selesai DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Curriculum
```sql
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

CREATE TABLE mata_kuliah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kurikulum_id UUID REFERENCES kurikulum(id) ON DELETE CASCADE,
  kode VARCHAR(20) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  nama_en VARCHAR(255),
  sks_teori INTEGER DEFAULT 0,
  sks_praktikum INTEGER DEFAULT 0,
  semester_rekomendasi INTEGER, -- semester ke berapa
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
```

#### Facilities
```sql
CREATE TABLE gedung (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kode VARCHAR(10) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  jumlah_lantai INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ruangan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gedung_id UUID REFERENCES gedung(id) ON DELETE CASCADE,
  kode VARCHAR(20) UNIQUE NOT NULL,
  nama VARCHAR(255) NOT NULL,
  lantai INTEGER,
  kapasitas INTEGER NOT NULL,
  jenis VARCHAR(50), -- "Kelas", "Lab", "Auditorium"
  fasilitas TEXT[], -- ["Proyektor", "AC", "Wifi"]
  status VARCHAR(20) DEFAULT 'tersedia' CHECK (status IN ('tersedia', 'maintenance', 'tidak_tersedia')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Schedule
```sql
CREATE TABLE jadwal_kuliah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mata_kuliah_id UUID REFERENCES mata_kuliah(id),
  semester_id UUID REFERENCES semester(id),
  kelas VARCHAR(5) NOT NULL, -- "A", "B", "C"
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
```

#### KRS
```sql
CREATE TABLE krs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  semester_id UUID REFERENCES semester(id),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  total_sks INTEGER DEFAULT 0,
  approved_by UUID REFERENCES dosen(id), -- Dosen PA
  approved_at TIMESTAMPTZ,
  catatan_approval TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(mahasiswa_id, semester_id)
);

CREATE TABLE krs_detail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  krs_id UUID REFERENCES krs(id) ON DELETE CASCADE,
  jadwal_id UUID REFERENCES jadwal_kuliah(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(krs_id, jadwal_id)
);
```

#### Attendance
```sql
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
```

#### Grades
```sql
CREATE TABLE komponen_nilai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jadwal_id UUID REFERENCES jadwal_kuliah(id) ON DELETE CASCADE,
  nama VARCHAR(100) NOT NULL, -- "Tugas", "Kuis", "UTS", "UAS"
  bobot DECIMAL(5,2) NOT NULL, -- 0-100
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE nilai_mahasiswa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  komponen_nilai_id UUID REFERENCES komponen_nilai(id) ON DELETE CASCADE,
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  nilai DECIMAL(5,2), -- 0-100
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(komponen_nilai_id, mahasiswa_id)
);

CREATE TABLE nilai_akhir (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  krs_detail_id UUID REFERENCES krs_detail(id) ON DELETE CASCADE,
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  jadwal_id UUID REFERENCES jadwal_kuliah(id),

  nilai_angka DECIMAL(5,2), -- 0-100
  nilai_huruf VARCHAR(2), -- A, A-, B+, dst
  nilai_indeks DECIMAL(3,2), -- 0.00-4.00

  is_locked BOOLEAN DEFAULT false,
  locked_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(mahasiswa_id, jadwal_id)
);
```

#### Finance
```sql
CREATE TABLE tagihan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mahasiswa_id UUID REFERENCES mahasiswa(id) ON DELETE CASCADE,
  semester_id UUID REFERENCES semester(id),
  jenis_tagihan VARCHAR(50), -- "UKT", "SKS", "Praktikum", "Wisuda"
  jumlah DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'belum_bayar' CHECK (status IN ('belum_bayar', 'cicil', 'lunas')),
  deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pembayaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tagihan_id UUID REFERENCES tagihan(id) ON DELETE CASCADE,
  jumlah DECIMAL(12,2) NOT NULL,
  metode VARCHAR(50), -- "Transfer", "Tunai", "VA"
  bukti_url TEXT,
  tanggal_bayar TIMESTAMPTZ DEFAULT NOW(),
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Notifications & Announcements
```sql
CREATE TABLE pengumuman (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(255) NOT NULL,
  konten TEXT NOT NULL,
  target VARCHAR(50), -- "all", "fakultas", "prodi", "mahasiswa", "dosen"
  target_id UUID, -- fakultas_id or prodi_id
  prioritas VARCHAR(20) DEFAULT 'normal' CHECK (prioritas IN ('normal', 'penting', 'urgent')),
  published_at TIMESTAMPTZ,
  expired_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifikasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  judul VARCHAR(255) NOT NULL,
  pesan TEXT NOT NULL,
  tipe VARCHAR(50), -- "krs", "nilai", "pembayaran", "pengumuman"
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 Row Level Security (RLS) Policies

Supabase mendukung RLS untuk security. Contoh policies:

```sql
-- Mahasiswa hanya bisa lihat data dirinya
ALTER TABLE mahasiswa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Mahasiswa can view own data"
  ON mahasiswa FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Mahasiswa can update own data"
  ON mahasiswa FOR UPDATE
  USING (auth.uid() = user_id);

-- Dosen bisa lihat mahasiswa yang dia bimbing
CREATE POLICY "Dosen can view advisee data"
  ON mahasiswa FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM dosen
      WHERE dosen.user_id = auth.uid()
      AND mahasiswa.dosen_pa_id = dosen.id
    )
  );

-- Admin prodi bisa lihat mahasiswa di prodinya
CREATE POLICY "Admin prodi can view students"
  ON mahasiswa FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin_prodi'
    )
  );
```

### 4.3 Database Functions & Triggers

```sql
-- Auto update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables
CREATE TRIGGER update_mahasiswa_updated_at BEFORE UPDATE ON mahasiswa
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate IPS
CREATE OR REPLACE FUNCTION calculate_ips(p_mahasiswa_id UUID, p_semester_id UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
  v_ips DECIMAL(3,2);
BEGIN
  SELECT
    ROUND(
      SUM(na.nilai_indeks * mk.sks_teori + mk.sks_praktikum) /
      SUM(mk.sks_teori + mk.sks_praktikum)
    , 2)
  INTO v_ips
  FROM nilai_akhir na
  JOIN krs_detail kd ON na.krs_detail_id = kd.id
  JOIN krs k ON kd.krs_id = k.id
  JOIN jadwal_kuliah jk ON kd.jadwal_id = jk.id
  JOIN mata_kuliah mk ON jk.mata_kuliah_id = mk.id
  WHERE k.mahasiswa_id = p_mahasiswa_id
    AND k.semester_id = p_semester_id;

  RETURN COALESCE(v_ips, 0);
END;
$$ LANGUAGE plpgsql;

-- Calculate IPK
CREATE OR REPLACE FUNCTION calculate_ipk(p_mahasiswa_id UUID)
RETURNS DECIMAL(3,2) AS $$
DECLARE
  v_ipk DECIMAL(3,2);
BEGIN
  SELECT
    ROUND(
      SUM(na.nilai_indeks * (mk.sks_teori + mk.sks_praktikum)) /
      SUM(mk.sks_teori + mk.sks_praktikum)
    , 2)
  INTO v_ipk
  FROM nilai_akhir na
  JOIN krs_detail kd ON na.krs_detail_id = kd.id
  JOIN krs k ON kd.krs_id = k.id
  JOIN jadwal_kuliah jk ON kd.jadwal_id = jk.id
  JOIN mata_kuliah mk ON jk.mata_kuliah_id = mk.id
  WHERE k.mahasiswa_id = p_mahasiswa_id;

  RETURN COALESCE(v_ipk, 0);
END;
$$ LANGUAGE plpgsql;
```

---

## 5. Technical Architecture

### 5.1 Frontend Architecture (React + Vite)

#### Project Structure:
```
src/
├── assets/              # Images, fonts, icons
├── components/          # Reusable components
│   ├── ui/             # ShadcnUI components
│   ├── layout/         # Layout components (Header, Sidebar, Footer)
│   ├── forms/          # Form components
│   └── shared/         # Shared components
├── features/           # Feature-based modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── dashboard/
│   ├── krs/
│   ├── jadwal/
│   ├── nilai/
│   └── ...
├── hooks/              # Global custom hooks
├── lib/                # Utilities and configurations
│   ├── supabase.ts
│   ├── utils.ts
│   └── constants.ts
├── routes/             # Route definitions
├── store/              # State management (Zustand)
├── types/              # TypeScript types
├── App.tsx
└── main.tsx
```

#### Key Dependencies:
```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.22.0",
    "@supabase/supabase-js": "^2.39.0",
    "@tanstack/react-query": "^5.28.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "date-fns": "^3.3.0",
    "lucide-react": "^0.344.0",
    "sonner": "^1.4.0",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.1.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vitest": "^1.3.0",
    "@testing-library/react": "^14.2.0"
  }
}
```

### 5.2 State Management Strategy

#### 1. Server State: TanStack Query (React Query)
Untuk data dari Supabase:
```typescript
// hooks/useKRS.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useKRS(mahasiswaId: string, semesterId: string) {
  return useQuery({
    queryKey: ['krs', mahasiswaId, semesterId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('krs')
        .select(`
          *,
          krs_detail (
            *,
            jadwal_kuliah (
              *,
              mata_kuliah (*)
            )
          )
        `)
        .eq('mahasiswa_id', mahasiswaId)
        .eq('semester_id', semesterId)
        .single();

      if (error) throw error;
      return data;
    }
  });
}

export function useSubmitKRS() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (krsId: string) => {
      const { data, error } = await supabase
        .from('krs')
        .update({ status: 'submitted' })
        .eq('id', krsId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['krs'] });
    }
  });
}
```

#### 2. Client State: Zustand
Untuk UI state dan global state:
```typescript
// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      logout: () => set({ user: null, profile: null })
    }),
    {
      name: 'auth-storage'
    }
  )
);
```

### 5.3 Routing Strategy

```typescript
// routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'krs',
        element: <RoleGuard roles={['mahasiswa']}><KRSPage /></RoleGuard>
      },
      {
        path: 'jadwal',
        element: <JadwalPage />
      },
      {
        path: 'nilai',
        element: <RoleGuard roles={['mahasiswa', 'dosen']}><NilaiPage /></RoleGuard>
      },
      {
        path: 'admin',
        element: <RoleGuard roles={['super_admin', 'admin_fakultas', 'admin_prodi']}><AdminLayout /></RoleGuard>,
        children: [
          { path: 'mahasiswa', element: <MahasiswaManagementPage /> },
          { path: 'dosen', element: <DosenManagementPage /> },
          { path: 'kurikulum', element: <KurikulumPage /> }
        ]
      }
    ]
  }
]);
```

### 5.4 Form Handling

```typescript
// Example: KRS Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const krsSchema = z.object({
  jadwal_ids: z.array(z.string()).min(1, 'Pilih minimal 1 mata kuliah'),
  total_sks: z.number().max(24, 'Maksimal 24 SKS')
});

type KRSFormData = z.infer<typeof krsSchema>;

function KRSForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<KRSFormData>({
    resolver: zodResolver(krsSchema)
  });

  const onSubmit = (data: KRSFormData) => {
    // Handle submit
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

---

## 6. Best Practices

### 6.1 Frontend Best Practices

#### 1. **Component Design**
- Gunakan functional components dengan hooks
- Keep components small dan single-responsibility
- Extract reusable logic ke custom hooks
-Gunakan composition pattern
- Implement proper error boundaries

```typescript
// Good: Small, focused component
function StudentCard({ student }: { student: Student }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.nama_lengkap}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>NIM: {student.nim}</p>
        <p>IPK: {student.ipk}</p>
      </CardContent>
    </Card>
  );
}

// Bad: God component with too many responsibilities
function StudentPage() {
  // 500 lines of code handling everything
}
```

#### 2. **Performance Optimization**
- Lazy load routes dan components
- Implement virtualization untuk long lists (react-window)
- Memoize expensive calculations dengan useMemo
- Debounce search inputs
- Optimize images (WebP, lazy loading)
- Code splitting per route

```typescript
// Lazy loading routes
const KRSPage = lazy(() => import('@/features/krs/pages/KRSPage'));

// Virtualized list
import { FixedSizeList } from 'react-window';

function StudentList({ students }: { students: Student[] }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={students.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <StudentCard student={students[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

#### 3. **Type Safety**
- Gunakan TypeScript strict mode
- Define types untuk semua entities
- Avoid `any` type
- Generate types dari Supabase schema

```typescript
// Generate types from Supabase
import { Database } from '@/types/supabase';

type Mahasiswa = Database['public']['Tables']['mahasiswa']['Row'];
type MahasiswaInsert = Database['public']['Tables']['mahasiswa']['Insert'];
type MahasiswaUpdate = Database['public']['Tables']['mahasiswa']['Update'];
```

#### 4. **Error Handling**
- Implement global error boundary
- Handle loading dan error states
- Show user-friendly error messages
- Log errors untuk debugging

```typescript
// Error boundary
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback}>
  <App />
</ErrorBoundary>
```

#### 5. **Accessibility**
- Gunakan semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation
- Test dengan screen readers
- Maintain color contrast ratios

### 6.2 Backend Best Practices (Supabase)

#### 1. **Row Level Security (RLS)**
- ALWAYS enable RLS pada semua tables
- Define granular policies
- Test policies thoroughly
- Audit policies regularly

#### 2. **Database Design**
- Normalize data properly
- Use foreign keys dengan ON DELETE CASCADE/SET NULL
- Add indexes pada frequently queried columns
- Use composite indexes untuk complex queries

```sql
-- Add indexes
CREATE INDEX idx_mahasiswa_prodi ON mahasiswa(prodi_id);
CREATE INDEX idx_mahasiswa_nim ON mahasiswa(nim);
CREATE INDEX idx_krs_mahasiswa_semester ON krs(mahasiswa_id, semester_id);
CREATE INDEX idx_jadwal_semester ON jadwal_kuliah(semester_id);
```

#### 3. **Query Optimization**
- Use select() dengan specific columns
- Avoid N+1 queries dengan proper joins
- Implement pagination
- Use count queries dengan caution

```typescript
// Good: Specific columns + pagination
const { data } = await supabase
  .from('mahasiswa')
  .select('id, nim, nama_lengkap, prodi:program_studi(nama)')
  .range(0, 49); // Pagination

// Bad: Select all + no pagination
const { data } = await supabase
  .from('mahasiswa')
  .select('*');
```

#### 4. **Realtime Subscriptions**
- Use untuk features yang memerlukan live updates
- Implement proper cleanup
- Handle reconnection

```typescript
// Subscribe to KRS updates
useEffect(() => {
  const channel = supabase
    .channel('krs-updates')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'krs',
        filter: `mahasiswa_id=eq.${mahasiswaId}`
      },
      (payload) => {
        // Handle update
        queryClient.invalidateQueries(['krs']);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [mahasiswaId]);
```

#### 5. **File Storage**
- Organize files dalam buckets
- Set proper storage policies
- Implement file size limits
- Generate signed URLs untuk private files

```typescript
// Upload foto mahasiswa
const uploadFoto = async (file: File, mahasiswaId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${mahasiswaId}.${fileExt}`;
  const filePath = `mahasiswa/${fileName}`;

  const { data, error } = await supabase.storage
    .from('photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('photos')
    .getPublicUrl(filePath);

  return publicUrl;
};
```

### 6.3 Security Best Practices

#### 1. **Authentication**
- Enforce strong passwords
- Implement session timeout
- Add rate limiting untuk login attempts
- Use refresh tokens

#### 2. **Authorization**
- Implement RBAC dengan RLS
- Validate permissions di frontend dan backend
- Never trust client-side checks alone

#### 3. **Input Validation**
- Validate di frontend (Zod) dan backend (RLS + triggers)
- Sanitize user inputs
- Prevent SQL injection (Supabase handles this)
- Prevent XSS attacks

#### 4. **Sensitive Data**
- Never expose API keys di frontend
- Use environment variables
- Encrypt sensitive data
- Implement audit logs

```typescript
// .env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

// Never commit actual keys to git!
// Use .env.example for template
```

### 6.4 Testing Strategy

#### 1. **Unit Tests**
- Test utility functions
- Test custom hooks
- Test business logic

```typescript
// Example: Test IPK calculation
import { describe, it, expect } from 'vitest';
import { calculateIPK } from '@/lib/utils';

describe('calculateIPK', () => {
  it('should calculate IPK correctly', () => {
    const grades = [
      { nilai_indeks: 4.0, sks: 3 },
      { nilai_indeks: 3.5, sks: 2 }
    ];

    const ipk = calculateIPK(grades);
    expect(ipk).toBe(3.8);
  });
});
```

#### 2. **Integration Tests**
- Test API calls
- Test Supabase queries
- Test form submissions

#### 3. **E2E Tests**
- Test critical user flows (login, KRS, nilai)
- Use Playwright atau Cypress
- Run di CI/CD pipeline

### 6.5 Deployment & DevOps

#### 1. **Environment Setup**
```
Development → Staging → Production

- dev.siakad.university.ac.id
- staging.siakad.university.ac.id
- siakad.university.ac.id
```

#### 2. **CI/CD Pipeline**
- Automated testing
- Linting dan type checking
- Build optimization
- Automated deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
      - name: Deploy to Vercel
        run: vercel --prod
```

#### 3. **Monitoring**
- Setup error tracking (Sentry)
- Monitor performance (Vercel Analytics)
- Track user analytics
- Database monitoring (Supabase dashboard)

#### 4. **Backup Strategy**
- Daily database backups
- Point-in-time recovery
- Disaster recovery plan

---

## 7. Development Roadmap

### Phase 1: Foundation (Month 1-2)
- [x] Setup project structure
- [ ] Design database schema
- [ ] Implement authentication
- [ ] Build core layouts dan navigation
- [ ] Setup CI/CD pipeline

### Phase 2: Master Data (Month 2-3)
- [ ] Fakultas & Program Studi management
- [ ] Kurikulum & Mata Kuliah management
- [ ] Gedung & Ruangan management
- [ ] Semester & Tahun Akademik management
- [ ] User management (Mahasiswa, Dosen, Admin)

### Phase 3: Academic Core (Month 3-5)
- [ ] Jadwal kuliah management
- [ ] KRS system (mahasiswa + approval)
- [ ] Presensi system
- [ ] Nilai system
- [ ] KHS & Transkrip

### Phase 4: Extended Features (Month 5-6)
- [ ] Bimbingan akademik
- [ ] Evaluasi dosen
- [ ] Keuangan & pembayaran
- [ ] Notifikasi & pengumuman
- [ ] Reporting & analytics

### Phase 5: Polish & Launch (Month 6-7)
- [ ] UI/UX improvements
- [ ] Performance optimization
- [ ] Security audit
- [ ] User acceptance testing
- [ ] Documentation
- [ ] Training materials
- [ ] Launch

### Phase 6: Post-Launch (Ongoing)
- [ ] Bug fixes
- [ ] Feature enhancements
- [ ] Mobile app (React Native)
- [ ] Integration dengan PDDIKTI
- [ ] AI features (recommendation system, chatbot)

---

## 8. Non-Functional Requirements

### 8.1 Performance
- Page load time < 3 seconds
- API response time < 500ms
- Support 1000+ concurrent users
- Mobile-responsive design

### 8.2 Security
- HTTPS only
- Data encryption at rest
- Regular security audits
- GDPR/privacy compliance

### 8.3 Scalability
- Horizontal scaling capability
- CDN untuk static assets
- Database optimization
- Caching strategy

### 8.4 Reliability
- 99.9% uptime SLA
- Automated backups
- Disaster recovery plan
- Error monitoring

### 8.5 Usability
- Intuitive UI/UX
- Accessibility (WCAG 2.1)
- Multi-language support (Indonesia/English)
- Mobile-friendly

---

## 9. Success Metrics (KPIs)

### 9.1 User Adoption
- Active users (daily/weekly/monthly)
- Feature adoption rate
- User satisfaction score (NPS)

### 9.2 Performance
- Page load time
- API response time
- Error rate
- Uptime percentage

### 9.3 Business Impact
- Time saved in admin processes
- Reduction in manual errors
- Student satisfaction
- Faculty satisfaction

---

## 10. Risks & Mitigation

### 10.1 Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Supabase downtime | High | Implement caching, backup provider |
| Data loss | Critical | Daily backups, point-in-time recovery |
| Security breach | Critical | Regular audits, penetration testing |
| Performance issues | Medium | Load testing, optimization |

### 10.2 Project Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Scope creep | High | Clear requirements, change management |
| Resource constraints | Medium | Phased approach, prioritization |
| User resistance | Medium | Training, change management |
| Integration challenges | Medium | Early testing, fallback plans |

---

## 11. Appendix

### 11.1 Glossary
- **KRS**: Kartu Rencana Studi (Course Registration Card)
- **KHS**: Kartu Hasil Studi (Grade Report Card)
- **IPK**: Indeks Prestasi Kumulatif (Cumulative GPA)
- **IPS**: Indeks Prestasi Semester (Semester GPA)
- **SKS**: Satuan Kredit Semester (Credit Unit)
- **UKT**: Uang Kuliah Tunggal (Tuition Fee)
- **NIDN**: Nomor Induk Dosen Nasional
- **NIM**: Nomor Induk Mahasiswa
- **PA**: Penasihat Akademik (Academic Advisor)
- **MBKM**: Merdeka Belajar Kampus Merdeka
- **PDDIKTI**: Pangkalan Data Pendidikan Tinggi

### 11.2 References
- Permenristekdikti tentang SNPT (Standar Nasional Pendidikan Tinggi)
- Panduan Merdeka Belajar Kampus Merdeka
- PDDIKTI Integration Documentation
- Supabase Documentation: https://supabase.com/docs
- React Best Practices: https://react.dev
- ShadcnUI Components: https://ui.shadcn.com

---

**Document Version**: 1.0
**Last Updated**: 2026-02-01
**Author**: Product Team
**Status**: Draft for Review
