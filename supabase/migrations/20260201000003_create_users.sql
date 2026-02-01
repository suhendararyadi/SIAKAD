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
