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
