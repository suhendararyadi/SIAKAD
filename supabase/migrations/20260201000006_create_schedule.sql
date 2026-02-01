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
