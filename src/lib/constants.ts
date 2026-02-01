export const APP_NAME = 'SIAKAD'
export const APP_DESCRIPTION = 'Sistem Informasi Akademik Kampus'

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN_FAKULTAS: 'admin_fakultas',
  ADMIN_PRODI: 'admin_prodi',
  DOSEN: 'dosen',
  MAHASISWA: 'mahasiswa',
  KEUANGAN: 'keuangan',
} as const

export const GRADING_SCALE = {
  A: { min: 80, max: 100, point: 4.0 },
  'A-': { min: 75, max: 79, point: 3.75 },
  'B+': { min: 70, max: 74, point: 3.5 },
  B: { min: 65, max: 69, point: 3.0 },
  'B-': { min: 60, max: 64, point: 2.75 },
  'C+': { min: 55, max: 59, point: 2.5 },
  C: { min: 50, max: 54, point: 2.0 },
  D: { min: 40, max: 49, point: 1.0 },
  E: { min: 0, max: 39, point: 0.0 },
} as const

export const MAX_SKS_BY_IPS = {
  EXCELLENT: { minIPS: 3.0, maxSKS: 24 },
  GOOD: { minIPS: 2.5, maxSKS: 21 },
  AVERAGE: { minIPS: 2.0, maxSKS: 18 },
  BELOW_AVERAGE: { minIPS: 0, maxSKS: 15 },
} as const
