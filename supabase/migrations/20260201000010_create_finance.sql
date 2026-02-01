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
