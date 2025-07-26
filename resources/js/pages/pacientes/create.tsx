import { useForm, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pacientes', href: '/pacientes' },
    { title: 'Registrar paciente', href: '/pacientes/create' },
];

export default function CreatePaciente() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        curp: '',
        fecha_nacimiento: '',
        sexo: '',
        telefono: '',
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pacientes', {
            onSuccess: () => {
                toast.success('Paciente creado con éxito');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar Paciente" />
            <div className="p-4 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Registrar Paciente</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Formulario de registro</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input id="nombre" value={data.nombre} onChange={(e) => setData('nombre', e.target.value)} />
                                    {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
                                </div>

                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="curp">CURP</Label>
                                    <Input id="curp" value={data.curp} onChange={(e) => setData('curp', e.target.value)} />
                                    {errors.curp && <p className="text-sm text-red-500">{errors.curp}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
                                    <Input
                                        id="fecha_nacimiento"
                                        type="date"
                                        value={data.fecha_nacimiento}
                                        onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                                    />
                                    {errors.fecha_nacimiento && <p className="text-sm text-red-500">{errors.fecha_nacimiento}</p>}
                                </div>

                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="sexo">Sexo</Label>
                                    <select
                                        id="sexo"
                                        value={data.sexo}
                                        onChange={(e) => setData('sexo', e.target.value)}
                                        className="w-full rounded border px-3 py-2"
                                    >
                                        <option value="">Selecciona</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    {errors.sexo && <p className="text-sm text-red-500">{errors.sexo}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6">

                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="telefono">Teléfono</Label>
                                    <Input id="telefono" value={data.telefono} onChange={(e) => setData('telefono', e.target.value)} />
                                    {errors.telefono && <p className="text-sm text-red-500">{errors.telefono}</p>}
                                </div>

                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>
                            </div>


                            <div className="flex justify-end gap-2">
                                <Link href="/pacientes">
                                    <Button className='cursor-pointer' type="button" variant="outline">Cancelar</Button>
                                </Link>
                                <Button className='cursor-pointer' type="submit" disabled={processing}>Guardar</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
