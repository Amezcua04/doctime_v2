import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowDown, ArrowUp, EditIcon, PlusIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import DeleteButton from '@/components/delete-button';
import RestoreButton from '@/components/restore-button';
import EditButton from '@/components/edit-button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Médicos',
    href: '/medicos',
  },
];

interface Usuario {
  id: number;
  name: string;
  email: string;
}

interface Medico {
  id: number;
  user: Usuario;
  cedula_cpe: string;
  especialidad?: string;
  deleted_at: string | null;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface MedicosPagination {
  data: Medico[];
  links: PaginationLink[];
}

interface Filters {
  search?: string;
  sort?: string;
  direction?: string;
}

export default function Medicos({ medicos, filters }: { medicos: MedicosPagination; filters: Filters }) {
  const { data, setData } = useForm({
    search: filters?.search || '',
    sort: filters?.sort || 'created_at',
    direction: filters?.direction || 'desc',
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      router.get('/medicos', data, {
        preserveState: true,
        replace: true,
      });
    }, 300);
    return () => clearTimeout(delay);
  }, [data.search]);

  const handleSort = (key: keyof Medico | 'user.name') => {
    const isSame = data.sort === key;
    const newDirection = isSame && data.direction === 'asc' ? 'desc' : 'asc';

    setData((prev) => ({
      ...prev,
      sort: key,
      direction: newDirection,
    }));

    router.get('/medicos', {
      ...data,
      sort: key,
      direction: newDirection,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const getSortIcon = (key: string) => {
    if (filters?.sort !== key) return null;
    return filters?.direction === 'asc' ? (
      <ArrowUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1" />
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Médicos" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Médicos</h1>
          <Link href='/medicos/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Agregar Médico
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Listado de Médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Input
                placeholder="Buscar por Nombre o Especialidad..."
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de médicos registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('user.name')}>
                      Nombre {getSortIcon('user.name')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('cedula_cpe')}>
                      Cédula {getSortIcon('cedula_cpe')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('especialidad')}>
                      Especialidad {getSortIcon('especialidad')}
                    </TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicos.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No hay médicos registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    medicos.data.map((medico) => {
                      const activo = medico.deleted_at === null;
                      return (
                        <TableRow key={medico.id}>
                          <TableCell className="font-medium">{medico.id}</TableCell>
                          <TableCell>{medico.user?.name}</TableCell>
                          <TableCell>{medico.cedula_cpe}</TableCell>
                          <TableCell>{medico.especialidad}</TableCell>
                          <TableCell className={activo ? 'text-green-600' : 'text-red-600'}>
                            {activo ? 'Activo' : 'Inactivo'}
                          </TableCell>
                          <TableCell className="text-right">
                            {activo ? (
                              <div className="flex gap-2 justify-end flex-wrap">
                                <EditButton href={`/medicos/${medico.id}/edit`} />
                                <DeleteButton resourceName="medico" deleteUrl={`/medicos/${medico.id}`} />
                              </div>
                            ) : (
                              <RestoreButton resourceName="medico" restoreUrl={`/medicos/${medico.id}/restore`} />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={medicos.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
