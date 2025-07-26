import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { EventApi } from "@fullcalendar/core";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import { actualizarColoresEvento } from '@/lib/utils';

interface EventoModalProps {
  open: boolean;
  onClose: () => void;
  evento: EventApi | null;
  calendarRef: React.RefObject<FullCalendar>;
}

const estatusOptions = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'confirmada', label: 'Confirmada' },
  { value: 'en_curso', label: 'En curso' },
  { value: 'completada', label: 'Completada' },
  { value: 'cancelada', label: 'Cancelada' },
];

export default function EventoModal({ open, onClose, evento, calendarRef }: EventoModalProps) {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [estatus, setEstatus] = useState('');
  const [notas, setNotas] = useState('');

  useEffect(() => {
    if (evento) {
      const fechaStr = evento.startStr.split('T')[0];
      const horaStr = evento.startStr.split('T')[1]?.slice(0, 5);
      setFecha(fechaStr);
      setHora(horaStr);
      setEstatus(evento.extendedProps.estatus);
      setNotas(evento.extendedProps.notas ?? '');
    }
  }, [evento]);

  const handleSave = async () => {
    if (!evento || !calendarRef.current) return;

    try {
      await axios.put(`/citas/${evento.id}`, {
        fecha,
        hora,
        estatus,
        notas,
      });

      const calendarApi = calendarRef.current.getApi();
      const oldEvent = calendarApi.getEventById(evento.id);

      if (oldEvent) {
        oldEvent.remove(); // Eliminar para volver a crear (forzar render)
        const newEvent = calendarApi.addEvent({
          id: evento.id,
          title: evento.title,
          start: `${fecha}T${hora}`,
          end: `${fecha}T${hora}`,
          extendedProps: {
            ...evento.extendedProps,
            estatus,
            notas,
          },
        });

        // Forzar render para aplicar colores
        setTimeout(() => {
          const el = calendarRef.current?.el.querySelector(`[data-event-id="${evento.id}"]`);
          if (el && newEvent) {
            actualizarColoresEvento(newEvent, el as HTMLElement);
          }
        }, 50);
      }

      toast.success('Cita actualizada correctamente');
      onClose();
    } catch (error) {
      toast.error('No se pudo actualizar la cita');
    }
  };

  if (!evento) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Editar cita</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div>
            <Label>Paciente</Label>
            <p className="text-base font-semibold">
              {evento.extendedProps.paciente?.nombre ?? 'Sin paciente'}
            </p>
          </div>

          <div>
            <Label>Asignado a</Label>
            <p className="text-base">{evento.extendedProps.asignado}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Fecha</Label>
              <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div>
              <Label>Hora</Label>
              <Input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Estatus</Label>
            <Select value={estatus} onValueChange={setEstatus}>
              <SelectTrigger className="cursor-pointer hover:bg-muted/70 transition">
                <SelectValue placeholder="Selecciona estatus" />
              </SelectTrigger>
              <SelectContent>
                {estatusOptions.map((e) => (
                  <SelectItem
                    className="cursor-pointer hover:bg-muted/50 transition"
                    key={e.value}
                    value={e.value}
                  >
                    {e.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Notas</Label>
            <Textarea
              className="cursor-text hover:bg-muted/40 transition"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="destructive" onClick={onClose} className="cursor-pointer">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="cursor-pointer">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
