import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProdi, useDeleteProdi } from '../hooks/useProdi';
import { useFakultas } from '../hooks/useFakultas';
import { ProdiForm } from '../components/ProdiForm';
import { Tables } from '@/types/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

// Extended type to include fakultas relation
type ProdiWithRelations = Tables<'program_studi'> & {
  fakultas?: { id: string; nama: string } | null;
};

export default function ProdiPage() {
  const [filterFakultas, setFilterFakultas] = useState<string>('all');
  const { data: prodi, isLoading } = useProdi(
    filterFakultas === 'all' ? undefined : filterFakultas
  );
  const { data: fakultasList } = useFakultas();
  const deleteProdi = useDeleteProdi();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProdi, setSelectedProdi] = useState<ProdiWithRelations | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [prodiToDelete, setProdiToDelete] = useState<string | null>(null);

  const handleEdit = (prodi: ProdiWithRelations) => {
    setSelectedProdi(prodi);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedProdi(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProdiToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (prodiToDelete) {
      await deleteProdi.mutateAsync(prodiToDelete);
      setIsDeleteDialogOpen(false);
      setProdiToDelete(null);
    }
  };

  const getJenjangBadge = (jenjang: string | null) => {
    if (!jenjang) return null;
    const colors: Record<string, string> = {
      D3: 'bg-yellow-100 text-yellow-800',
      D4: 'bg-orange-100 text-orange-800',
      S1: 'bg-blue-100 text-blue-800',
      S2: 'bg-purple-100 text-purple-800',
      S3: 'bg-red-100 text-red-800',
    };
    return (
      <Badge variant="outline" className={colors[jenjang] || ''}>
        {jenjang}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Studi</h1>
          <p className="text-muted-foreground">
            Kelola data program studi di universitas.
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Prodi
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Select value={filterFakultas} onValueChange={setFilterFakultas}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Semua Fakultas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Fakultas</SelectItem>
              {fakultasList?.map((fak) => (
                <SelectItem key={fak.id} value={fak.id}>
                  {fak.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama Program Studi</TableHead>
              <TableHead>Jenjang</TableHead>
              <TableHead>Fakultas</TableHead>
              <TableHead>Akreditasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : prodi?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  Belum ada data program studi.
                </TableCell>
              </TableRow>
            ) : (
              prodi?.map((item) => {
                const prodiItem = item as ProdiWithRelations;
                return (
                  <TableRow key={prodiItem.id}>
                    <TableCell className="font-medium">
                      {prodiItem.kode}
                    </TableCell>
                    <TableCell>{prodiItem.nama}</TableCell>
                    <TableCell>{getJenjangBadge(prodiItem.jenjang)}</TableCell>
                    <TableCell>{prodiItem.fakultas?.nama || '-'}</TableCell>
                    <TableCell>{prodiItem.akreditasi || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(prodiItem)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(prodiItem.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Create/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedProdi ? 'Edit Program Studi' : 'Tambah Program Studi'}
            </DialogTitle>
          </DialogHeader>
          <ProdiForm
            initialData={selectedProdi}
            onSuccess={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Alert Delete */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data program studi akan
              dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={confirmDelete}
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
