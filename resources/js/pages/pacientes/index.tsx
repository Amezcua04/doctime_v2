import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArchiveRestoreIcon, ArrowDown, ArrowUp, EditIcon, PlusIcon, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteButton from '@/components/delete-button';
import Pagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import RestoreButton from '@/components/restore-button';
import EditButton from '@/components/edit-button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pacientes',
    href: '/pacientes',
  },
];

interface Paciente {
  id: number;
  nombre: string;
  curp: string;
  fecha_nacimiento: string;
  sexo: string;
  telefono: string;
  email: string;
  direccion?: string;
  deleted_at: string | null;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PacientesPagination {
  data: Paciente[];
  links: PaginationLink[];
}

interface Filters {
  search?: string;
  sort?: string;
  direction?: string;
}

export default function Pacientes({ pacientes, filters }: { pacientes: PacientesPagination; filters: Filters }) {
  const { data, setData } = useForm({
    search: filters?.search || '',
    sort: filters?.sort || 'created_at',
    direction: filters?.direction || 'desc',
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      router.get('/pacientes', data, {
        preserveState: true,
        replace: true,
      });
    }, 300);
    return () => clearTimeout(delay);
  }, [data.search]);

  const handleSort = (key: keyof Paciente) => {
    const isSame = data.sort === key;
    const newDirection = isSame && data.direction === 'asc' ? 'desc' : 'asc';

    setData((prev) => ({
      ...prev,
      sort: key,
      direction: newDirection,
    }));

    router.get('/pacientes', {
      ...data,
      sort: key,
      direction: newDirection,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const getSortIcon = (key: keyof Paciente) => {
    if (filters?.sort !== key) return null;
    return filters?.direction === 'asc' ? (
      <ArrowUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1" />
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pacientes" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
          <h1 className='text-2xl font-bold'>Pacientes</h1>
          <Link href='/pacientes/create'>
            <Button className='cursor-pointer'>
              <PlusIcon className='w-4 h-4 mr-2' />
              Agregar Paciente
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Input
                placeholder="Buscar por Nombre o CURP..."
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption>Lista de pacientes registrados</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('nombre')}>
                      Nombre {getSortIcon('nombre')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('curp')}>
                      CURP {getSortIcon('curp')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('telefono')}>
                      Teléfono {getSortIcon('telefono')}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
                      Email {getSortIcon('email')}
                    </TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pacientes.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No hay pacientes registrados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pacientes.data.map((paciente) => {
                      const activo = paciente.deleted_at === null;
                      return (
                        <TableRow key={paciente.id}>
                          <TableCell className="font-medium">{paciente.id}</TableCell>
                          <TableCell>{paciente.nombre}</TableCell>
                          <TableCell>{paciente.curp}</TableCell>
                          <TableCell>{paciente.telefono}</TableCell>
                          <TableCell>{paciente.email}</TableCell>
                          <TableCell className={activo ? 'text-green-600' : 'text-red-600'}>
                            {activo ? 'Activo' : 'Inactivo'}
                          </TableCell>
                          <TableCell className="text-right">
                            {activo ? (
                              <div className="flex gap-2 justify-end flex-wrap">
                                <EditButton href={`/pacientes/${paciente.id}/edit`} />
                                <DeleteButton resourceName="paciente" deleteUrl={`/pacientes/${paciente.id}`} />
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <RestoreButton resourceName="paciente" restoreUrl={`/pacientes/${paciente.id}/restore`} />
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            <Pagination links={pacientes.links} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
