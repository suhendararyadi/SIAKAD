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
