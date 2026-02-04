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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tables } from '@/types/supabase';
import { useCreateProdi, useUpdateProdi } from '../hooks/useProdi';
import { useFakultas } from '../hooks/useFakultas';

const formSchema = z.object({
  kode: z.string().min(1, 'Kode wajib diisi').max(20, 'Maksimal 20 karakter'),
  nama: z.string().min(1, 'Nama wajib diisi'),
  jenjang: z.enum(['D3', 'D4', 'S1', 'S2', 'S3'], {
    required_error: 'Jenjang wajib dipilih',
  }),
  fakultas_id: z.string().min(1, 'Fakultas wajib dipilih'),
  akreditasi: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Extended type to include fakultas relation
type ProdiWithRelations = Tables<'program_studi'> & {
  fakultas?: { id: string; nama: string } | null;
};

interface ProdiFormProps {
  initialData?: ProdiWithRelations | null;
  onSuccess: () => void;
}

export function ProdiForm({ initialData, onSuccess }: ProdiFormProps) {
  const createProdi = useCreateProdi();
  const updateProdi = useUpdateProdi();
  const { data: fakultasList, isLoading: isLoadingFakultas } = useFakultas();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kode: initialData?.kode || '',
      nama: initialData?.nama || '',
      jenjang: (initialData?.jenjang as FormValues['jenjang']) || undefined,
      fakultas_id: initialData?.fakultas_id || '',
      akreditasi: initialData?.akreditasi || '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (initialData) {
        await updateProdi.mutateAsync({
          id: initialData.id,
          data: values,
        });
      } else {
        await createProdi.mutateAsync(values);
      }
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const isLoading = createProdi.isPending || updateProdi.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fakultas_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fakultas</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoadingFakultas}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Fakultas" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fakultasList?.map((fak) => (
                    <SelectItem key={fak.id} value={fak.id}>
                      {fak.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="kode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Prodi</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: TI, SI, TM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jenjang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenjang</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenjang" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="D3">D3 (Diploma)</SelectItem>
                    <SelectItem value="D4">D4 (Sarjana Terapan)</SelectItem>
                    <SelectItem value="S1">S1 (Sarjana)</SelectItem>
                    <SelectItem value="S2">S2 (Magister)</SelectItem>
                    <SelectItem value="S3">S3 (Doktor)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Program Studi</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Teknik Informatika" {...field} />
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
                <Input placeholder="A, B, Unggul, Baik Sekali" {...field} />
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
