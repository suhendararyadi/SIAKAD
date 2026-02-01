-- Pengumuman
CREATE TABLE pengumuman (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul VARCHAR(255) NOT NULL,
  konten TEXT NOT NULL,
  target VARCHAR(50),
  target_id UUID,
  prioritas VARCHAR(20) DEFAULT 'normal' CHECK (prioritas IN ('normal', 'penting', 'urgent')),
  published_at TIMESTAMPTZ,
  expired_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifikasi
CREATE TABLE notifikasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  judul VARCHAR(255) NOT NULL,
  pesan TEXT NOT NULL,
  tipe VARCHAR(50),
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_pengumuman_target ON pengumuman(target, target_id);
CREATE INDEX idx_notifikasi_user ON notifikasi(user_id);
CREATE INDEX idx_notifikasi_unread ON notifikasi(user_id, is_read);

-- Enable RLS
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifikasi ENABLE ROW LEVEL SECURITY;
