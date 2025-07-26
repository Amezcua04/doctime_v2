import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import clsx from 'clsx';
import axios from 'axios';
import ComboboxPaciente from '../combobox';

interface Paciente {
    id: number;
    nombre: string;
}

interface CrearEventoModalProps {
    open: boolean;
    onClose: () => void;
    calendarRef: React.RefObject<FullCalendar>;
    fechaSeleccionada?: string;
    horaSeleccionada?: string;
    medicos: { id: number; user: { name: string } }[];
    servicios: { id: number; nombre: string }[];
    pacientes: Paciente[];
}

const estatusOptions = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'confirmada', label: 'Confirmada' },
    { value: 'en_curso', label: 'En curso' },
    { value: 'completada', label: 'Completada' },
    { value: 'cancelada', label: 'Cancelada' },
];

export default function CrearEventoModal({
    open,
    onClose,
    calendarRef,
    fechaSeleccionada = '',
    horaSeleccionada = '',
    medicos,
    servicios,
    pacientes
}: CrearEventoModalProps) {
    const [pacienteId, setPacienteId] = useState<number | null>(null);
    const [pacienteNombre, setPacienteNombre] = useState('');
    const [fecha, setFecha] = useState(fechaSeleccionada);
    const [hora, setHora] = useState(horaSeleccionada);
    const [estatus, setEstatus] = useState('pendiente');
    const [notas, setNotas] = useState('');
    const [tipoAsignado, setTipoAsignado] = useState<'medico' | 'servicio' | ''>('');
    const [asignadoId, setAsignadoId] = useState<number | null>(null);

    const handleClose = () => {
        setPacienteId(null);
        setPacienteNombre('');
        setFecha(fechaSeleccionada);
        setHora(horaSeleccionada);
        setEstatus('pendiente');
        setNotas('');
        setTipoAsignado('');
        setAsignadoId(null);
        onClose();
    };

    useEffect(() => {
        if (open) {
            setFecha(fechaSeleccionada);
            setHora(horaSeleccionada);
            setPacienteId(null);
            setPacienteNombre('');
        }
    }, [open, fechaSeleccionada, horaSeleccionada]);

    const handleCreate = async () => {
        if (!pacienteId || !pacienteNombre || !fecha || !hora || !tipoAsignado || asignadoId === null) {
            toast.error('Completa todos los campos requeridos');
            return;
        }

        try {
            const res = await axios.post('/citas', {
                paciente_id: pacienteId,
                fecha,
                hora,
                estatus,
                notas,
                medico_id: tipoAsignado === 'medico' ? asignadoId : null,
                servicio_id: tipoAsignado === 'servicio' ? asignadoId : null,
            });

            const calendarApi = calendarRef.current?.getApi();
            if (calendarApi && res.data) {
                calendarApi.addEvent({
                    id: res.data.id,
                    title: pacienteNombre,
                    start: `${fecha}T${hora}`,
                    extendedProps: {
                        estatus,
                        paciente: { nombre: pacienteNombre },
                        asignado:
                            tipoAsignado === 'medico'
                                ? medicos.find(m => m.id === asignadoId)?.user.name
                                : servicios.find(s => s.id === asignadoId)?.nombre,
                        tipo: tipoAsignado,
                        notas,
                    }
                });
            }

            toast.success('Cita creada exitosamente');
            onClose();
        } catch (error) {
            toast.error('Error al crear la cita');
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                <h2 className="text-lg font-bold mb-4">Crear nueva cita</h2>

                <div className="space-y-3 text-sm max-h-[70vh] overflow-y-auto pr-1">
                    <div>
                        <Label>Paciente <span className='text-red-600'>*</span></Label>
                        <ComboboxPaciente
                            pacientes={pacientes}
                            value={pacienteId}
                            onChange={(p) => {
                                setPacienteId(p.id);
                                setPacienteNombre(p.nombre);
                            }}
                        />

                    </div>

                    <div>
                        <Label>Tipo de asignación <span className='text-red-600'>*</span></Label>
                        <Select value={tipoAsignado} onValueChange={(val) => {
                            setTipoAsignado(val as 'medico' | 'servicio');
                            setAsignadoId(null);
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="medico">Médico</SelectItem>
                                <SelectItem value="servicio">Servicio</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {tipoAsignado && (
                        <div>
                            <Label>{tipoAsignado === 'medico' ? 'Selecciona médico' : 'Selecciona servicio'} <span className='text-red-600'>*</span></Label>
                            <Select value={asignadoId?.toString() || ''} onValueChange={(val) => setAsignadoId(Number(val))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona uno" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(tipoAsignado === 'medico' ? medicos : servicios).map(item => (
                                        <SelectItem key={item.id} value={item.id.toString()}>
                                            {tipoAsignado === 'medico' ? item.user.name : item.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label>Fecha <span className='text-red-600'>*</span></Label>
                            <Input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                        </div>
                        <div>
                            <Label>Hora <span className='text-red-600'>*</span></Label>
                            <Input type="time" value={hora} onChange={e => setHora(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <Label>Estatus</Label>
                        <Select value={estatus} onValueChange={setEstatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona estatus" />
                            </SelectTrigger>
                            <SelectContent>
                                {estatusOptions.map(e => (
                                    <SelectItem key={e.value} value={e.value}>
                                        {e.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Notas</Label>
                        <Textarea value={notas} onChange={(e) => setNotas(e.target.value)} />
                    </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="destructive" className='cursor-pointer' onClick={handleClose}>Cancelar</Button>
                    <Button className='cursor-pointer' onClick={handleCreate}>Crear</Button>
                </div>
            </div>
        </div>
    );
}
