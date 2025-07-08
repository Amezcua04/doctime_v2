import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';
import { toast } from 'sonner';

interface Medico {
  id: number;
  cedula_cpe: string;
  especialidad: string | null;
  dgp_especialidad: string | null;
  subespecialidad: string | null;
  dgp_subespecialidad: string | null;
  avatar: string | null;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Médicos', href: '/medicos' },
  { title: 'Editar médico', href: '#' },
];

export default function EditMedico({ medico }: { medico: Medico }) {
  const { data, setData, put, processing, errors } = useForm({
    name: medico.user.name,
    email: medico.user.email,
    password: '',
    password_confirmation: '',

    cedula_cpe: medico.cedula_cpe,
    especialidad: medico.especialidad || '',
    dgp_especialidad: medico.dgp_especialidad || '',
    subespecialidad: medico.subespecialidad || '',
    dgp_subespecialidad: medico.dgp_subespecialidad || '',
    avatar: medico.avatar || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/medicos/${medico.id}`, {
            onSuccess: () => {
                toast.info('Médico modificado con éxito');
            }
        });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar Médico" />
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Editar Médico</h1>
        <Card>
          <CardHeader>
            <CardTitle>Formulario de edición</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                  <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                  {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
                <div>
                  <Label htmlFor="cedula_cpe">Cédula profesional</Label>
                  <Input id="cedula_cpe" value={data.cedula_cpe} onChange={(e) => setData('cedula_cpe', e.target.value)} />
                  {errors.cedula_cpe && <p className="text-sm text-red-500">{errors.cedula_cpe}</p>}
                </div>

                <div>
                  <Label htmlFor="avatar">URL de Avatar (opcional)</Label>
                  <Input id="avatar" value={data.avatar} onChange={(e) => setData('avatar', e.target.value)} />
                  {errors.avatar && <p className="text-sm text-red-500">{errors.avatar}</p>}
                </div>

                <div>
                  <Label htmlFor="especialidad">Especialidad</Label>
                  <Input id="especialidad" value={data.especialidad} onChange={(e) => setData('especialidad', e.target.value)} />
                  {errors.especialidad && <p className="text-sm text-red-500">{errors.especialidad}</p>}
                </div>

                <div>
                  <Label htmlFor="dgp_especialidad">DGP Especialidad</Label>
                  <Input id="dgp_especialidad" value={data.dgp_especialidad} onChange={(e) => setData('dgp_especialidad', e.target.value)} />
                  {errors.dgp_especialidad && <p className="text-sm text-red-500">{errors.dgp_especialidad}</p>}
                </div>

                <div>
                  <Label htmlFor="subespecialidad">Subespecialidad</Label>
                  <Input id="subespecialidad" value={data.subespecialidad} onChange={(e) => setData('subespecialidad', e.target.value)} />
                  {errors.subespecialidad && <p className="text-sm text-red-500">{errors.subespecialidad}</p>}
                </div>

                <div>
                  <Label htmlFor="dgp_subespecialidad">DGP Subespecialidad</Label>
                  <Input id="dgp_subespecialidad" value={data.dgp_subespecialidad} onChange={(e) => setData('dgp_subespecialidad', e.target.value)} />
                  {errors.dgp_subespecialidad && <p className="text-sm text-red-500">{errors.dgp_subespecialidad}</p>}
                </div>


              </div>

              <div className="flex justify-end gap-2">
                <Link href="/medicos">
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
