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
