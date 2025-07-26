import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowDown, ArrowUp, EditIcon, PlusIcon, RotateCcwIcon } from 'lucide-react';
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
import RestoreButton from '@/components/restore-button';
import Pagination from '@/components/pagination';
import { Input } from '@/components/ui/input';
import type { BreadcrumbItem } from '@/types';
import EditButton from '@/components/edit-button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Servicios',
        href: '/servicios',
    },
];

interface Servicio {
    id: number;
    nombre: string;
    descripcion: string;
    costo: string;
    deleted_at: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface ServiciosPagination {
    data: Servicio[];
    links: PaginationLink[];
}

interface Filters {
    search?: string;
    sort?: string;
    direction?: string;
}

export default function Servicios({
    servicios,
    filters,
}: {
    servicios: ServiciosPagination;
    filters: Filters;
}) {
    const { data, setData } = useForm({
        search: filters?.search || '',
        sort: filters?.sort || 'created_at',
        direction: filters?.direction || 'desc',
    });

    useEffect(() => {
        const delay = setTimeout(() => {
            router.get('/servicios', data, {
                preserveState: true,
                replace: true,
            });
        }, 300);
        return () => clearTimeout(delay);
    }, [data.search]);

    const handleSort = (key: keyof Servicio) => {
        const isSame = data.sort === key;
        const newDirection = isSame && data.direction === 'asc' ? 'desc' : 'asc';

        setData((prev) => ({
            ...prev,
            sort: key,
            direction: newDirection,
        }));

        router.get('/servicios', { ...data, sort: key, direction: newDirection }, {
            preserveState: true,
            replace: true,
        });
    };

    const getSortIcon = (key: keyof Servicio) => {
        if (filters?.sort !== key) return null;
        return filters?.direction === 'asc' ? (
            <ArrowUp className="inline w-3 h-3 ml-1" />
        ) : (
            <ArrowDown className="inline w-3 h-3 ml-1" />
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h1 className="text-2xl font-bold">Servicios</h1>
                    <Link href="/servicios/create">
                        <Button className='cursor-pointer'>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Agregar Servicio
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Listado de Servicios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-end mb-4">
                            <Input
                                placeholder="Buscar por Nombre..."
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                className="max-w-sm"
                            />
                        </div>

                        <div className="overflow-x-auto w-full">
                            <Table>
                                <TableCaption>Servicios disponibles</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No.</TableHead>
                                        <TableHead className="cursor-pointer" onClick={() => handleSort('nombre')}>
                                            Nombre {getSortIcon('nombre')}
                                        </TableHead>
                                        <TableHead>Descripción</TableHead>
                                        <TableHead className="cursor-pointer" onClick={() => handleSort('costo')}>
                                            Costo {getSortIcon('costo')}
                                        </TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {servicios.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-6">
                                                No hay servicios registrados.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        servicios.data.map((servicio) => {
                                            const activo = servicio.deleted_at === null;
                                            return (
                                                <TableRow key={servicio.id}>
                                                    <TableCell>{servicio.id}</TableCell>
                                                    <TableCell>{servicio.nombre}</TableCell>
                                                    <TableCell className="max-w-xs truncate">{servicio.descripcion}</TableCell>
                                                    <TableCell>${parseFloat(servicio.costo).toFixed(2)}</TableCell>
                                                    <TableCell className={activo ? 'text-green-600' : 'text-red-600'}>
                                                        {activo ? 'Activo' : 'Inactivo'}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2 flex-wrap">
                                                            {activo ? (
                                                                <div className="flex gap-2 justify-end flex-wrap">
                                                                    <EditButton href={`/servicios/${servicio.id}/edit`} />
                                                                    <DeleteButton resourceName="servicio" deleteUrl={`/servicios/${servicio.id}`} />
                                                                </div>
                                                            ) : (
                                                                <RestoreButton resourceName='servicio' restoreUrl={`/servicios/${servicio.id}/restore`} />
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <Pagination links={servicios.links} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
