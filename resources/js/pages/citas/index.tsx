import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from "@fullcalendar/list"
import multiMonthPlugin from "@fullcalendar/multimonth";
import axios from 'axios';
import { toast } from 'sonner';
import CustomToolbar from '@/components/calendar/custom-toolbar';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Citas',
    href: '/citas',
  },
];

interface Medico {
  id: number;
  user: {
    id: number;
    name: string;
  };
}

interface Servicio {
  id: number;
  nombre: string;
}

export default function CitasIndex({
  medicos,
  servicios,
}: {
  medicos: Medico[];
  servicios: Servicio[];
}) {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [eventos, setEventos] = useState<any[]>([]);
  const [visibleRange, setVisibleRange] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(),
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [activeView, setActiveView] = useState('timeGridWeek');
  const [tipo, setTipo] = useState<'medico' | 'servicio' | 'todos' | null>('todos');
  const [tipoId, setTipoId] = useState<number | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<{ tipo: 'todos' | 'medico' | 'servicio'; id: number | null }>({
    tipo: 'todos',
    id: null,
  });

  const fechaActual = new Date();

  const eventosVisibles = eventos.filter((evento) => {
    const start = new Date(evento.start);
    const end = new Date(evento.end ?? evento.start);
    return start < visibleRange.end && end >= visibleRange.start;
  });

  const fetchEventos = async (
    start: Date,
    end: Date,
    estatus: string[],
    tipo: 'medico' | 'servicio' | 'todos' | null,
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

  const handleChangeTipo = (tipo: 'todos' | 'medico' | 'servicio', id: number | null) => {
    setSelectedTipo({ tipo, id });
    fetchEventos(visibleRange.start, visibleRange.end, selectedStatuses, tipo, id);
  };

  const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin];

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
          fechaActual={fechaActual}
          totalEventos={eventosVisibles.length}
          selectedStatuses={selectedStatuses}
          onChangeStatus={handleFilterChange}
          onChangeView={handleChangeView}
          activeView={activeView}
          medicos={medicos}
          selectedTipo={tipo}
          selectedId={tipoId}
          onChangeTipo={(nuevoTipo, id) => {
            setTipo(nuevoTipo);
            setTipoId(id);
            fetchEventos(visibleRange.start, visibleRange.end, selectedStatuses, nuevoTipo, id);
          }}
        />

        <FullCalendar
          plugins={plugins}
          editable
          ref={calendarRef}
          initialView="timeGridWeek"
          headerToolbar={false}
          events={eventos}
          eventDidMount={(info) => {
            const estatus = info.event.extendedProps.estatus;
            info.el.classList.add(`evento-${estatus}`);
            info.el.classList.add(`txt-${estatus}`)
          }}
          height="auto"
          locale="es"
          eventClick={(info) => toast(`Cita: ${info.event.title}`)}
          dateClick={(info) => toast(`Día seleccionado: ${info.dateStr}`)}
          datesSet={handleDatesSet}
          fixedWeekCount
          showNonCurrentDates={false}
          dayHeaderFormat={{
            weekday: 'short',
            day: 'numeric'
          }}
          slotLabelFormat={{
            hour: 'numeric',
            hour12: true,
          }}
          slotMinTime="04:00:00"
          slotMaxTime="23:59:59"
          allDaySlot={false}
        />
      </div>
    </AppLayout>
  );
}
