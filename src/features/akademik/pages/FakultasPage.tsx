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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFakultas, useDeleteFakultas } from '../hooks/useFakultas';
import { FakultasForm } from '../components/FakultasForm';
import { Tables } from '@/types/supabase';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function FakultasPage() {
  const { data: fakultas, isLoading, error } = useFakultas();
  const deleteFakultas = useDeleteFakultas();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFakultas, setSelectedFakultas] = useState<Tables<'fakultas'> | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fakultasToDelete, setFakultasToDelete] = useState<string | null>(null);

  const handleEdit = (fakultas: Tables<'fakultas'>) => {
    setSelectedFakultas(fakultas);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedFakultas(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setFakultasToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (fakultasToDelete) {
      await deleteFakultas.mutateAsync(fakultasToDelete);
      setIsDeleteDialogOpen(false);
      setFakultasToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fakultas</h1>
          <p className="text-muted-foreground">
            Kelola data fakultas di universitas.
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Fakultas
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama Fakultas</TableHead>
              <TableHead>Akreditasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : fakultas?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  Belum ada data fakultas.
                </TableCell>
              </TableRow>
            ) : (
              fakultas?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.kode}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.akreditasi || '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Create/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedFakultas ? 'Edit Fakultas' : 'Tambah Fakultas'}
            </DialogTitle>
            <DialogDescription>
              {selectedFakultas
                ? 'Ubah data fakultas yang sudah ada.'
                : 'Isi form di bawah untuk menambahkan fakultas baru.'}
            </DialogDescription>
          </DialogHeader>
          <FakultasForm
            initialData={selectedFakultas}
            onSuccess={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Alert Delete */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data fakultas dan program studi terkait akan dihapus permanen.
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
