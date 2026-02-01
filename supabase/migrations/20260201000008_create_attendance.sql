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
