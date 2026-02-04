import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { TablesInsert, TablesUpdate } from '@/types/supabase';
import { toast } from 'sonner';

// Keys untuk React Query cache
export const prodiKeys = {
  all: ['prodi'] as const,
  lists: () => [...prodiKeys.all, 'list'] as const,
  byFakultas: (fakultasId: string) => [...prodiKeys.lists(), { fakultasId }] as const,
  detail: (id: string) => [...prodiKeys.all, 'detail', id] as const,
};

// Fetch semua prodi (opsional: filter by fakultas)
export function useProdi(fakultasId?: string) {
  return useQuery({
    queryKey: fakultasId ? prodiKeys.byFakultas(fakultasId) : prodiKeys.lists(),
    queryFn: async () => {
      let query = supabase
        .from('program_studi')
        .select(`
          *,
          fakultas:fakultas_id (
            id,
            nama
          ),
          dosen:kaprodi_id (
            id,
            profiles:user_id (
              nama_lengkap
            )
          )
        `)
        .order('nama', { ascending: true });

      if (fakultasId) {
        query = query.eq('fakultas_id', fakultasId);
      }

      const { data, error } = await query;

      if (error) {
        // toast.error('Gagal mengambil data program studi: ' + error.message);
        throw error;
      }
      return data;
    },
  });
}

// Create Prodi
export function useCreateProdi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProdi: TablesInsert<'program_studi'>) => {
      const { data, error } = await supabase
        .from('program_studi')
        .insert(newProdi)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prodiKeys.lists() });
      toast.success('Program Studi berhasil ditambahkan');
    },
    onError: (error: Error) => {
      toast.error('Gagal menambahkan program studi: ' + error.message);
    },
  });
}

// Update Prodi
export function useUpdateProdi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<'program_studi'> }) => {
      const { data: updated, error } = await supabase
        .from('program_studi')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prodiKeys.lists() });
      toast.success('Program Studi berhasil diperbarui');
    },
    onError: (error: Error) => {
      toast.error('Gagal memperbarui program studi: ' + error.message);
    },
  });
}

// Delete Prodi
export function useDeleteProdi() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('program_studi')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prodiKeys.lists() });
      toast.success('Program Studi berhasil dihapus');
    },
    onError: (error: Error) => {
      toast.error('Gagal menghapus program studi: ' + error.message);
    },
  });
}
