export type Role =
  | 'super_admin'
  | 'admin_fakultas'
  | 'admin_prodi'
  | 'dosen'
  | 'mahasiswa'
  | 'keuangan'

export interface Profile {
  id: string
  role: Role
  nama_lengkap: string
  email: string
  phone?: string
  foto_url?: string
  created_at: string
  updated_at: string
}

export interface Mahasiswa {
  id: string
  user_id: string
  nim: string
  prodi_id: string
  angkatan: number
  status: 'aktif' | 'cuti' | 'lulus' | 'do' | 'mengundurkan_diri'
  kategori_ukt?: string
  dosen_pa_id?: string
  nik?: string
  tempat_lahir?: string
  tanggal_lahir?: string
  jenis_kelamin?: 'L' | 'P'
  created_at: string
  updated_at: string
}

export interface Dosen {
  id: string
  user_id: string
  nidn?: string
  nidk?: string
  prodi_id: string
  status_kepegawaian?: string
  jabatan_akademik?: string
  created_at: string
  updated_at: string
}
