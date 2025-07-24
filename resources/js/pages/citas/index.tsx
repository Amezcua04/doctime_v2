import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import {
  DatesSetArg
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import axios from 'axios';
import { toast } from 'sonner';
import CustomToolbar from '@/components/calendar/custom-toolbar';
import { BreadcrumbItem } from '@/types';

// 🧭 Breadcrumb
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Citas', href: '/citas' },
];

// 📌 Interfaces
interface Medico {
  id: number;
  user: { id: number; name: string };
}
interface Servicio {
  id: number;
  nombre: string;
}

// 🧠 Componente Principal
export default function CitasIndex({
  medicos,
  servicios,
}: {
  medicos: Medico[];
  servicios: Servicio[];
}) {
  // 📌 Refs y estados
  const calendarRef = useRef<FullCalendar | null>(null);
  const [eventos, setEventos] = useState<any[]>([]);
  const [visibleRange, setVisibleRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(),
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [activeView, setActiveView] = useState('timeGridWeek');
  const [tipo, setTipo] = useState<'medico' | 'servicio' | 'todos'>('todos');
  const [tipoId, setTipoId] = useState<number | null>(null);

  // 📅 Eventos visibles para contador
  const eventosVisibles = eventos.filter((evento) => {
    const start = new Date(evento.start);
    const end = new Date(evento.end ?? evento.start);
    return start < visibleRange.end && end >= visibleRange.start;
  });

  // 📡 Cargar eventos desde backend
  const fetchEventos = async (
    start: Date,
    end: Date,
    estatus: string[],
    tipo: 'medico' | 'servicio' | 'todos',
    id: number | null
  ) => {
    try {
      const res = await axios.post('/citas/fetch', {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
        estado: estatus,
        tipo,
        id,
      });
      setEventos(res.data);
    } catch (err) {
      toast.error('No se pudieron cargar las citas');
    }
  };

  // 🔁 Manejadores
  const handleDatesSet = (arg: DatesSetArg) => {
    setVisibleRange({ start: arg.start, end: arg.end });
    fetchEventos(arg.start, arg.end, selectedStatuses, tipo, tipoId);
  };

  const handleFilterChange = (estatus: string[]) => {
    setSelectedStatuses(estatus);
    fetchEventos(visibleRange.start, visibleRange.end, estatus, tipo, tipoId);
  };

  const handleChangeView = (view: string) => {
    calendarRef.current?.getApi().changeView(view);
    setActiveView(view);
  };

  const handleChangeTipo = (nuevoTipo: 'todos' | 'medico' | 'servicio', id: number | null) => {
    setTipo(nuevoTipo);
    setTipoId(id);
    fetchEventos(visibleRange.start, visibleRange.end, selectedStatuses, nuevoTipo, id);
  };

  const handleEventDrop = async (info: any) => {
    const fecha = info.event.startStr.split('T')[0];
    const hora = info.event.startStr.split('T')[1].slice(0, 8);
    try {
      await axios.put(`/citas/${info.event.id}/actualizar-fecha`, { fecha, hora });
      toast.success('Cita actualizada exitosamente');
    } catch (error) {
      toast.error('No se pudo actualizar la cita');
      info.revert();
    }
  };

  const getDayHeaderFormat = (view: string) => {
    return view === 'timeGridWeek'
      ? { weekday: 'short', day: 'numeric' }
      : { weekday: 'short' };
  };

  const handleEventRender = (info: any) => {
    const estatus = info.event.extendedProps.estatus;

    // Aplicar clases base
    info.el.classList.add(`evento-${estatus}`, `txt-${estatus}`);

    // Dot en vista dayGrid
    const dot = info.el.querySelector('.fc-daygrid-event-dot');
    if (dot) {
      dot.classList.add(`dot-${estatus}`);
    }

    // Hora del evento
    const timeEl = info.el.querySelector('.fc-event-time');
    if (timeEl) {
      timeEl.classList.add(`txt-${estatus}`);
    }

    // Título del evento
    const titleEl = info.el.querySelector('.fc-event-title');
    if (titleEl) {
      titleEl.classList.add(`txt-${estatus}`);
    }
  };


  // 📦 Plugins de calendario
  const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Agenda de Citas" />

      <div className="flex flex-col gap-4 p-4">
        <CustomToolbar
          onPrev={() => calendarRef.current?.getApi().prev()}
          onNext={() => calendarRef.current?.getApi().next()}
          onToday={() => calendarRef.current?.getApi().today()}
          visibleStart={visibleRange.start}
          visibleEnd={visibleRange.end}
          fechaActual={new Date()}
          totalEventos={eventosVisibles.length}
          selectedStatuses={selectedStatuses}
          onChangeStatus={handleFilterChange}
          onChangeView={handleChangeView}
          activeView={activeView}
          medicos={medicos}
          selectedTipo={tipo}
          selectedId={tipoId}
          onChangeTipo={handleChangeTipo}
        />

        <FullCalendar
          className={activeView === 'multiMonthYear' ? 'fc-multimonth-custom' : ''}
          plugins={plugins}
          editable
          eventDrop={handleEventDrop}
          ref={calendarRef}
          initialView="timeGridWeek"
          headerToolbar={false}
          events={eventos}
          eventDidMount={handleEventRender}
          height="auto"
          locale="es"
          eventClick={(info) => toast(`Cita: ${info.event.title}`)}
          dateClick={(info) => toast(`Día seleccionado: ${info.dateStr}`)}
          datesSet={handleDatesSet}
          fixedWeekCount
          showNonCurrentDates={false}
          dayHeaderFormat={getDayHeaderFormat(activeView)}
          slotLabelFormat={{ hour: 'numeric', hour12: true }}
          slotMinTime="01:00:00"
          slotMaxTime="23:59:59"
          allDaySlot={false}
        />
      </div>
    </AppLayout>
  );
}
