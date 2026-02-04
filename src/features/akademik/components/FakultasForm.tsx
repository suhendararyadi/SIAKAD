import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tables } from '@/types/supabase';
import { useCreateFakultas, useUpdateFakultas } from '../hooks/useFakultas';

const formSchema = z.object({
  kode: z.string().min(1, 'Kode wajib diisi').max(10, 'Maksimal 10 karakter'),
  nama: z.string().min(1, 'Nama wajib diisi'),
  akreditasi: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface FakultasFormProps {
  initialData?: Tables<'fakultas'> | null;
  onSuccess: () => void;
}

export function FakultasForm({ initialData, onSuccess }: FakultasFormProps) {
  const createFakultas = useCreateFakultas();
  const updateFakultas = useUpdateFakultas();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kode: initialData?.kode || '',
      nama: initialData?.nama || '',
      akreditasi: initialData?.akreditasi || '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Clean up the data: convert empty string to null for optional fields
      const submitData = {
        kode: values.kode.trim(),
        nama: values.nama.trim(),
        akreditasi: values.akreditasi?.trim() || null,
      };

      if (initialData) {
        await updateFakultas.mutateAsync({
          id: initialData.id,
          data: submitData,
        });
      } else {
        await createFakultas.mutateAsync(submitData);
      }
      form.reset();
      onSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const isLoading = createFakultas.isPending || updateFakultas.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="kode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Fakultas</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: FT, FEB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Fakultas</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Fakultas Teknik" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="akreditasi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Akreditasi</FormLabel>
              <FormControl>
                <Input placeholder="A, B, Unggul" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
