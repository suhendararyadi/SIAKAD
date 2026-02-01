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
