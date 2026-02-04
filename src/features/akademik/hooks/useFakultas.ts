import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { TablesInsert, TablesUpdate } from '@/types/supabase';
import { toast } from 'sonner';

// Keys untuk React Query cache
export const fakultasKeys = {
  all: ['fakultas'] as const,
  lists: () => [...fakultasKeys.all, 'list'] as const,
  detail: (id: string) => [...fakultasKeys.all, 'detail', id] as const,
};

// Fetch semua fakultas
export function useFakultas() {
  return useQuery({
    queryKey: fakultasKeys.lists(),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fakultas')
        .select('*')
        .order('nama', { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
}

// Create Fakultas
export function useCreateFakultas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newFakultas: TablesInsert<'fakultas'>) => {
      console.log('Creating fakultas:', newFakultas);

      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session:', session ? 'EXISTS' : 'NULL');
      console.log('Access token:', session?.access_token ? 'EXISTS' : 'MISSING');

      if (!session) {
        throw new Error('No active session. Please login again.');
      }

      const { data, error } = await supabase
        .from('fakultas')
        .insert(newFakultas)
        .select()
        .single();

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      return data;
    },
    onSuccess: (data) => {
      console.log('Mutation success:', data);
      queryClient.invalidateQueries({ queryKey: fakultasKeys.lists() });
      toast.success('Fakultas berhasil ditambahkan');
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
      toast.error('Gagal menambahkan fakultas: ' + error.message);
    },
  });
}

// Update Fakultas
export function useUpdateFakultas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TablesUpdate<'fakultas'> }) => {
      const { data: updated, error } = await supabase
        .from('fakultas')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fakultasKeys.lists() });
      toast.success('Fakultas berhasil diperbarui');
    },
    onError: (error: Error) => {
      toast.error('Gagal memperbarui fakultas: ' + error.message);
    },
  });
}

// Delete Fakultas
export function useDeleteFakultas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('fakultas')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fakultasKeys.lists() });
      toast.success('Fakultas berhasil dihapus');
    },
    onError: (error: Error) => {
      toast.error('Gagal menghapus fakultas: ' + error.message);
    },
  });
}
