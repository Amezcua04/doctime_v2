import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Servicios', href: '/servicios' },
  { title: 'Editar', href: '#' },
];

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  costo: string;
}

export default function EditServicio({ servicio }: { servicio: Servicio }) {
  const { data, setData, put, processing, errors } = useForm({
    nombre: servicio.nombre || '',
    descripcion: servicio.descripcion || '',
    costo: servicio.costo || '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    put(`/servicios/${servicio.id}`, {
      onSuccess: () => {
        toast.success('Servicio actualizado correctamente');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Agregar Servicio" />
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Editar Servicio</h1>
        <Card>
          <CardHeader>
            <CardTitle>Formulario de servicio</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={data.nombre}
                    onChange={(e) => setData('nombre', e.target.value)}
                  />
                  {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>}
                </div>

                <div className="flex flex-1 flex-col space-y-2">
                  <Label htmlFor="costo">Costo</Label>
                  <Input
                    id="costo"
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.costo}
                    onChange={(e) => setData('costo', e.target.value)}
                  />
                  {errors.costo && <p className="text-sm text-red-500 mt-1">{errors.costo}</p>}
                </div>

              </div>

              <div className="flex flex-1 flex-col space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={data.descripcion}
                  onChange={(e) => setData('descripcion', e.target.value)}
                />
                {errors.descripcion && <p className="text-sm text-red-500 mt-1">{errors.descripcion}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <Link href="/servicios">
                  <Button className='cursor-pointer' type="button" variant="outline">Cancelar</Button>
                </Link>
                <Button className='cursor-pointer' type="submit" disabled={processing}>Guardar cambios</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
