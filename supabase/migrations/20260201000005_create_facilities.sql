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
