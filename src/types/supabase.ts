export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      dosen: {
        Row: {
          bidang_keahlian: string[] | null
          created_at: string | null
          golongan: string | null
          id: string
          jabatan_akademik: string | null
          nidk: string | null
          nidn: string | null
          pendidikan_terakhir: string | null
          prodi_id: string | null
          status_kepegawaian: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bidang_keahlian?: string[] | null
          created_at?: string | null
          golongan?: string | null
          id?: string
          jabatan_akademik?: string | null
          nidk?: string | null
          nidn?: string | null
          pendidikan_terakhir?: string | null
          prodi_id?: string | null
          status_kepegawaian?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bidang_keahlian?: string[] | null
          created_at?: string | null
          golongan?: string | null
          id?: string
          jabatan_akademik?: string | null
          nidk?: string | null
          nidn?: string | null
          pendidikan_terakhir?: string | null
          prodi_id?: string | null
          status_kepegawaian?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dosen_prodi_id_fkey"
            columns: ["prodi_id"]
            isOneToOne: false
            referencedRelation: "program_studi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dosen_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fakultas: {
        Row: {
          akreditasi: string | null
          created_at: string | null
          dekan_id: string | null
          id: string
          kode: string
          nama: string
          updated_at: string | null
        }
        Insert: {
          akreditasi?: string | null
          created_at?: string | null
          dekan_id?: string | null
          id?: string
          kode: string
          nama: string
          updated_at?: string | null
        }
        Update: {
          akreditasi?: string | null
          created_at?: string | null
          dekan_id?: string | null
          id?: string
          kode?: string
          nama?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fakultas_dekan_id_fkey"
            columns: ["dekan_id"]
            isOneToOne: false
            referencedRelation: "dosen"
            referencedColumns: ["id"]
          },
        ]
      }
      gedung: {
        Row: {
          created_at: string | null
          id: string
          jumlah_lantai: number | null
          kode: string
          nama: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          jumlah_lantai?: number | null
          kode: string
          nama: string
        }
        Update: {
          created_at?: string | null
          id?: string
          jumlah_lantai?: number | null
          kode?: string
          nama?: string
        }
        Relationships: []
      }
      jadwal_dosen: {
        Row: {
          dosen_id: string | null
          id: string
          is_koordinator: boolean | null
          jadwal_id: string | null
        }
        Insert: {
          dosen_id?: string | null
          id?: string
          is_koordinator?: boolean | null
          jadwal_id?: string | null
        }
        Update: {
          dosen_id?: string | null
          id?: string
          is_koordinator?: boolean | null
          jadwal_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jadwal_dosen_dosen_id_fkey"
            columns: ["dosen_id"]
            isOneToOne: false
            referencedRelation: "dosen"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jadwal_dosen_jadwal_id_fkey"
            columns: ["jadwal_id"]
            isOneToOne: false
            referencedRelation: "jadwal_kuliah"
            referencedColumns: ["id"]
          },
        ]
      }
      jadwal_kuliah: {
        Row: {
          created_at: string | null
          hari: string | null
          id: string
          jam_mulai: string
          jam_selesai: string
          kelas: string
          kuota: number
          mata_kuliah_id: string | null
          ruangan_id: string | null
          semester_id: string | null
          status: string | null
          terisi: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          hari?: string | null
          id?: string
          jam_mulai: string
          jam_selesai: string
          kelas: string
          kuota: number
          mata_kuliah_id?: string | null
          ruangan_id?: string | null
          semester_id?: string | null
          status?: string | null
          terisi?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          hari?: string | null
          id?: string
          jam_mulai?: string
          jam_selesai?: string
          kelas?: string
          kuota?: number
          mata_kuliah_id?: string | null
          ruangan_id?: string | null
          semester_id?: string | null
          status?: string | null
          terisi?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jadwal_kuliah_mata_kuliah_id_fkey"
            columns: ["mata_kuliah_id"]
            isOneToOne: false
            referencedRelation: "mata_kuliah"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jadwal_kuliah_ruangan_id_fkey"
            columns: ["ruangan_id"]
            isOneToOne: false
            referencedRelation: "ruangan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jadwal_kuliah_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semester"
            referencedColumns: ["id"]
          },
        ]
      }
      komponen_nilai: {
        Row: {
          bobot: number
          created_at: string | null
          id: string
          jadwal_id: string | null
          nama: string
        }
        Insert: {
          bobot: number
          created_at?: string | null
          id?: string
          jadwal_id?: string | null
          nama: string
        }
        Update: {
          bobot?: number
          created_at?: string | null
          id?: string
          jadwal_id?: string | null
          nama?: string
        }
        Relationships: [
          {
            foreignKeyName: "komponen_nilai_jadwal_id_fkey"
            columns: ["jadwal_id"]
            isOneToOne: false
            referencedRelation: "jadwal_kuliah"
            referencedColumns: ["id"]
          },
        ]
      }
      krs: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          catatan_approval: string | null
          created_at: string | null
          id: string
          mahasiswa_id: string | null
          semester_id: string | null
          status: string | null
          total_sks: number | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          catatan_approval?: string | null
          created_at?: string | null
          id?: string
          mahasiswa_id?: string | null
          semester_id?: string | null
          status?: string | null
          total_sks?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          catatan_approval?: string | null
          created_at?: string | null
          id?: string
          mahasiswa_id?: string | null
          semester_id?: string | null
          status?: string | null
          total_sks?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "krs_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "dosen"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "krs_mahasiswa_id_fkey"
            columns: ["mahasiswa_id"]
            isOneToOne: false
            referencedRelation: "mahasiswa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "krs_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semester"
            referencedColumns: ["id"]
          },
        ]
      }
      krs_detail: {
        Row: {
          created_at: string | null
          id: string
          jadwal_id: string | null
          krs_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          jadwal_id?: string | null
          krs_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          jadwal_id?: string | null
          krs_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "krs_detail_jadwal_id_fkey"
            columns: ["jadwal_id"]
            isOneToOne: false
            referencedRelation: "jadwal_kuliah"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "krs_detail_krs_id_fkey"
            columns: ["krs_id"]
            isOneToOne: false
            referencedRelation: "krs"
            referencedColumns: ["id"]
          },
        ]
      }
      kurikulum: {
        Row: {
          created_at: string | null
          id: string
          nama: string
          prodi_id: string | null
          status: string | null
          tahun_akhir: number | null
          tahun_mulai: number
          total_sks_minimal: number
          total_sks_pilihan: number
          total_sks_wajib: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nama: string
          prodi_id?: string | null
          status?: string | null
          tahun_akhir?: number | null
          tahun_mulai: number
          total_sks_minimal: number
          total_sks_pilihan: number
          total_sks_wajib: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nama?: string
          prodi_id?: string | null
          status?: string | null
          tahun_akhir?: number | null
          tahun_mulai?: number
          total_sks_minimal?: number
          total_sks_pilihan?: number
          total_sks_wajib?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kurikulum_prodi_id_fkey"
            columns: ["prodi_id"]
            isOneToOne: false
            referencedRelation: "program_studi"
            referencedColumns: ["id"]
          },
        ]
      }
      mahasiswa: {
        Row: {
          agama: string | null
          alamat: string | null
          angkatan: number
          created_at: string | null
          dosen_pa_id: string | null
          id: string
          jenis_kelamin: string | null
          kategori_ukt: string | null
          kode_pos: string | null
          kota: string | null
          nama_ayah: string | null
          nama_ibu: string | null
          nik: string | null
          nim: string
          phone_ortu: string | null
          prodi_id: string | null
          provinsi: string | null
          semester_masuk_id: string | null
          status: string | null
          tanggal_lahir: string | null
          tempat_lahir: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          agama?: string | null
          alamat?: string | null
          angkatan: number
          created_at?: string | null
          dosen_pa_id?: string | null
          id?: string
          jenis_kelamin?: string | null
          kategori_ukt?: string | null
          kode_pos?: string | null
          kota?: string | null
          nama_ayah?: string | null
          nama_ibu?: string | null
          nik?: string | null
          nim: string
          phone_ortu?: string | null
          prodi_id?: string | null
          provinsi?: string | null
          semester_masuk_id?: string | null
          status?: string | null
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          agama?: string | null
          alamat?: string | null
          angkatan?: number
          created_at?: string | null
          dosen_pa_id?: string | null
          id?: string
          jenis_kelamin?: string | null
          kategori_ukt?: string | null
          kode_pos?: string | null
          kota?: string | null
          nama_ayah?: string | null
          nama_ibu?: string | null
          nik?: string | null
          nim?: string
          phone_ortu?: string | null
          prodi_id?: string | null
          provinsi?: string | null
          semester_masuk_id?: string | null
          status?: string | null
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mahasiswa_dosen_pa_id_fkey"
            columns: ["dosen_pa_id"]
            isOneToOne: false
            referencedRelation: "dosen"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mahasiswa_prodi_id_fkey"
            columns: ["prodi_id"]
            isOneToOne: false
            referencedRelation: "program_studi"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mahasiswa_semester_masuk_id_fkey"
            columns: ["semester_masuk_id"]
            isOneToOne: false
            referencedRelation: "semester"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mahasiswa_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mata_kuliah: {
        Row: {
          capaian_pembelajaran: string[] | null
          created_at: string | null
          deskripsi: string | null
          id: string
          jenis: string | null
          kode: string
          kurikulum_id: string | null
          nama: string
          nama_en: string | null
          semester_rekomendasi: number | null
          sks_praktikum: number | null
          sks_teori: number | null
          updated_at: string | null
        }
        Insert: {
          capaian_pembelajaran?: string[] | null
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          jenis?: string | null
          kode: string
          kurikulum_id?: string | null
          nama: string
          nama_en?: string | null
          semester_rekomendasi?: number | null
          sks_praktikum?: number | null
          sks_teori?: number | null
          updated_at?: string | null
        }
        Update: {
          capaian_pembelajaran?: string[] | null
          created_at?: string | null
          deskripsi?: string | null
          id?: string
          jenis?: string | null
          kode?: string
          kurikulum_id?: string | null
          nama?: string
          nama_en?: string | null
          semester_rekomendasi?: number | null
          sks_praktikum?: number | null
          sks_teori?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mata_kuliah_kurikulum_id_fkey"
            columns: ["kurikulum_id"]
            isOneToOne: false
            referencedRelation: "kurikulum"
            referencedColumns: ["id"]
          },
        ]
      }
      mata_kuliah_prasyarat: {
        Row: {
          id: string
          mata_kuliah_id: string | null
          prasyarat_id: string | null
        }
        Insert: {
          id?: string
          mata_kuliah_id?: string | null
          prasyarat_id?: string | null
        }
        Update: {
          id?: string
          mata_kuliah_id?: string | null
          prasyarat_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mata_kuliah_prasyarat_mata_kuliah_id_fkey"
            columns: ["mata_kuliah_id"]
            isOneToOne: false
            referencedRelation: "mata_kuliah"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mata_kuliah_prasyarat_prasyarat_id_fkey"
            columns: ["prasyarat_id"]
            isOneToOne: false
            referencedRelation: "mata_kuliah"
            referencedColumns: ["id"]
          },
        ]
      }
      nilai_akhir: {
        Row: {
          created_at: string | null
          id: string
          is_locked: boolean | null
          jadwal_id: string | null
          krs_detail_id: string | null
          locked_at: string | null
          mahasiswa_id: string | null
          nilai_angka: number | null
          nilai_huruf: string | null
          nilai_indeks: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          jadwal_id?: string | null
          krs_detail_id?: string | null
          locked_at?: string | null
          mahasiswa_id?: string | null
          nilai_angka?: number | null
          nilai_huruf?: string | null
          nilai_indeks?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          jadwal_id?: string | null
          krs_detail_id?: string | null
          locked_at?: string | null
          mahasiswa_id?: string | null
          nilai_angka?: number | null
          nilai_huruf?: string | null
          nilai_indeks?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nilai_akhir_jadwal_id_fkey"
            columns: ["jadwal_id"]
            isOneToOne: false
            referencedRelation: "jadwal_kuliah"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nilai_akhir_krs_detail_id_fkey"
            columns: ["krs_detail_id"]
            isOneToOne: false
            referencedRelation: "krs_detail"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nilai_akhir_mahasiswa_id_fkey"
            columns: ["mahasiswa_id"]
            isOneToOne: false
            referencedRelation: "mahasiswa"
            referencedColumns: ["id"]
          },
        ]
      }
      nilai_mahasiswa: {
        Row: {
          created_at: string | null
          id: string
          komponen_nilai_id: string | null
          mahasiswa_id: string | null
          nilai: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          komponen_nilai_id?: string | null
          mahasiswa_id?: string | null
          nilai?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          komponen_nilai_id?: string | null
          mahasiswa_id?: string | null
          nilai?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nilai_mahasiswa_komponen_nilai_id_fkey"
            columns: ["komponen_nilai_id"]
            isOneToOne: false
            referencedRelation: "komponen_nilai"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nilai_mahasiswa_mahasiswa_id_fkey"
            columns: ["mahasiswa_id"]
            isOneToOne: false
            referencedRelation: "mahasiswa"
            referencedColumns: ["id"]
          },
        ]
      }
      notifikasi: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          judul: string
          link: string | null
          pesan: string
          tipe: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          judul: string
          link?: string | null
          pesan: string
          tipe?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          judul?: string
          link?: string | null
          pesan?: string
          tipe?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifikasi_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pembayaran: {
        Row: {
          bukti_url: string | null
          created_at: string | null
          id: string
          jumlah: number
          metode: string | null
          tagihan_id: string | null
          tanggal_bayar: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          bukti_url?: string | null
          created_at?: string | null
          id?: string
          jumlah: number
          metode?: string | null
          tagihan_id?: string | null
          tanggal_bayar?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          bukti_url?: string | null
          created_at?: string | null
          id?: string
          jumlah?: number
          metode?: string | null
          tagihan_id?: string | null
          tanggal_bayar?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pembayaran_tagihan_id_fkey"
            columns: ["tagihan_id"]
            isOneToOne: false
            referencedRelation: "tagihan"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pembayaran_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pengumuman: {
        Row: {
          created_at: string | null
          created_by: string | null
          expired_at: string | null
          id: string
          judul: string
          konten: string
          prioritas: string | null
          published_at: string | null
          target: string | null
          target_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          expired_at?: string | null
          id?: string
          judul: string
          konten: string
          prioritas?: string | null
          published_at?: string | null
          target?: string | null
          target_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          expired_at?: string | null
          id?: string
          judul?: string
          konten?: string
          prioritas?: string | null
          published_at?: string | null
          target?: string | null
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pengumuman_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pertemuan: {
        Row: {
          created_at: string | null
          id: string
          jadwal_id: string | null
          materi_url: string | null
          pertemuan_ke: number
          tanggal: string
          topik: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          jadwal_id?: string | null
          materi_url?: string | null
          pertemuan_ke: number
          tanggal: string
          topik?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          jadwal_id?: string | null
          materi_url?: string | null
          pertemuan_ke?: number
          tanggal?: string
          topik?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pertemuan_jadwal_id_fkey"
            columns: ["jadwal_id"]
            isOneToOne: false
            referencedRelation: "jadwal_kuliah"
            referencedColumns: ["id"]
          },
        ]
      }
      presensi: {
        Row: {
          created_at: string | null
          id: string
          keterangan: string | null
          mahasiswa_id: string | null
          pertemuan_id: string | null
          status: string | null
          waktu_presensi: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          keterangan?: string | null
          mahasiswa_id?: string | null
          pertemuan_id?: string | null
          status?: string | null
          waktu_presensi?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          keterangan?: string | null
          mahasiswa_id?: string | null
          pertemuan_id?: string | null
          status?: string | null
          waktu_presensi?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "presensi_mahasiswa_id_fkey"
            columns: ["mahasiswa_id"]
            isOneToOne: false
            referencedRelation: "mahasiswa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "presensi_pertemuan_id_fkey"
            columns: ["pertemuan_id"]
            isOneToOne: false
            referencedRelation: "pertemuan"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          foto_url: string | null
          id: string
          nama_lengkap: string
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          foto_url?: string | null
          id: string
          nama_lengkap: string
          phone?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          foto_url?: string | null
          id?: string
          nama_lengkap?: string
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      program_studi: {
        Row: {
          akreditasi: string | null
          created_at: string | null
          fakultas_id: string | null
          gelar: string | null
          id: string
          jenjang: string | null
          kaprodi_id: string | null
          kode: string
          nama: string
          updated_at: string | null
        }
        Insert: {
          akreditasi?: string | null
          created_at?: string | null
          fakultas_id?: string | null
          gelar?: string | null
          id?: string
          jenjang?: string | null
          kaprodi_id?: string | null
          kode: string
          nama: string
          updated_at?: string | null
        }
        Update: {
          akreditasi?: string | null
          created_at?: string | null
          fakultas_id?: string | null
          gelar?: string | null
          id?: string
          jenjang?: string | null
          kaprodi_id?: string | null
          kode?: string
          nama?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "program_studi_fakultas_id_fkey"
            columns: ["fakultas_id"]
            isOneToOne: false
            referencedRelation: "fakultas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_studi_kaprodi_id_fkey"
            columns: ["kaprodi_id"]
            isOneToOne: false
            referencedRelation: "dosen"
            referencedColumns: ["id"]
          },
        ]
      }
      ruangan: {
        Row: {
          created_at: string | null
          fasilitas: string[] | null
          gedung_id: string | null
          id: string
          jenis: string | null
          kapasitas: number
          kode: string
          lantai: number | null
          nama: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          fasilitas?: string[] | null
          gedung_id?: string | null
          id?: string
          jenis?: string | null
          kapasitas: number
          kode: string
          lantai?: number | null
          nama: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          fasilitas?: string[] | null
          gedung_id?: string | null
          id?: string
          jenis?: string | null
          kapasitas: number
          kode: string
          lantai?: number | null
          nama: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ruangan_gedung_id_fkey"
            columns: ["gedung_id"]
            isOneToOne: false
            referencedRelation: "gedung"
            referencedColumns: ["id"]
          },
        ]
      }
      semester: {
        Row: {
          created_at: string | null
          id: string
          jenis: string | null
          krs_mulai: string | null
          krs_selesai: string | null
          nama: string
          perubahan_krs_mulai: string | null
          perubahan_krs_selesai: string | null
          status: string | null
          tahun_ajaran: string
          tanggal_mulai: string
          tanggal_selesai: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          jenis?: string | null
          krs_mulai?: string | null
          krs_selesai?: string | null
          nama: string
          perubahan_krs_mulai?: string | null
          perubahan_krs_selesai?: string | null
          status?: string | null
          tahun_ajaran: string
          tanggal_mulai: string
          tanggal_selesai: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          jenis?: string | null
          krs_mulai?: string | null
          krs_selesai?: string | null
          nama: string
          perubahan_krs_mulai?: string | null
          perubahan_krs_selesai?: string | null
          status?: string | null
          tahun_ajaran: string
          tanggal_mulai: string
          tanggal_selesai: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tagihan: {
        Row: {
          created_at: string | null
          deadline: string | null
          id: string
          jenis_tagihan: string | null
          jumlah: number
          mahasiswa_id: string | null
          semester_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          deadline?: string | null
          id?: string
          jenis_tagihan?: string | null
          jumlah: number
          mahasiswa_id?: string | null
          semester_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          deadline?: string | null
          id?: string
          jenis_tagihan?: string | null
          jumlah?: number
          mahasiswa_id?: string | null
          semester_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tagihan_mahasiswa_id_fkey"
            columns: ["mahasiswa_id"]
            isOneToOne: false
            referencedRelation: "mahasiswa"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tagihan_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semester"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_ipk: { Args: { p_mahasiswa_id: string }; Returns: number }
      calculate_ips: {
        Args: { p_mahasiswa_id: string; p_semester_id: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
