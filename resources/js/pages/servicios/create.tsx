import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FormEventHandler } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Servicios', href: '/servicios' },
  { title: 'Crear', href: '/servicios/create' },
];

export default function CreateServicio() {
  const { data, setData, post, processing, errors, reset } = useForm({
    nombre: '',
    descripcion: '',
    costo: '',
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    post('/servicios', {
      onSuccess: () => {
        toast.success('Servicio registrado correctamente');
        reset();
        router.visit('/servicios');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Agregar Servicio" />
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Registrar Servicio</h1>
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
