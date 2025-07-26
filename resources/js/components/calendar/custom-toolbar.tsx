import React, { useEffect, useRef } from 'react';
import {
  ChevronLeft, ChevronRight, Filter, List, Grid,
  LayoutGrid, Calendar, Plus, Settings,
  RefreshCcw,
  LayoutList, Columns2, Grid2X2, Grid3X3,
  User,
  Layers,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

interface Medico {
  id: number;
  user: {
    id: number;
    name: string;
  };
}

interface Props {
  onPrev?: () => void;
  onNext?: () => void;
  onToday?: () => void;
  visibleStart?: Date;
  visibleEnd?: Date;
  fechaActual?: Date;
  totalEventos?: number;
  selectedStatuses?: string[];
  onChangeStatus?: (statuses: string[]) => void;
  activeView?: string;
  onChangeView?: (view: string) => void;
  medicos?: Medico[];
  selectedTipo?: 'todos' | 'medico' | 'servicio';
  selectedId?: number | null;
  onChangeTipo?: (tipo: 'todos' | 'medico' | 'servicio', id: number | null) => void;
  onCrearEvento?: () => void;
}

const ESTATUS_OPCIONES = [
  { value: 'pendiente', label: 'Pendiente', color: 'bg-yellow-400' },
  { value: 'confirmada', label: 'Confirmada', color: 'bg-blue-500' },
  { value: 'en_curso', label: 'En curso', color: 'bg-purple-500' },
  { value: 'completada', label: 'Completada', color: 'bg-green-500' },
  { value: 'cancelada', label: 'Cancelada', color: 'bg-red-500' },
];

export default function CustomToolbar({
  onPrev,
  onNext,
  onToday,
  visibleStart,
  visibleEnd,
  fechaActual = new Date(),
  totalEventos,
  selectedStatuses = [],
  onChangeStatus = () => { },
  activeView = '',
  onChangeView = () => { },
  medicos = [],
  selectedTipo = 'todos',
  selectedId = null,
  onChangeTipo = () => { },
  onCrearEvento = () => { },
}: Props) {
  const badgeRef = useRef<HTMLSpanElement | null>(null);

  const realVisibleEnd = visibleEnd
    ? new Date(visibleEnd.getTime() - 86400000)
    : new Date();

  const monthShort = fechaActual.toLocaleString('es-MX', { month: 'short' }).toUpperCase();
  const monthLong = realVisibleEnd.toLocaleString('es-MX', { month: 'long' });
  const year = realVisibleEnd.getFullYear();
  const day = fechaActual.getDate();

  const formatRange = (start?: Date, end?: Date) => {
    if (!start || !end) return '';
    const endAdjusted = new Date(end.getTime() - 86400000);
    const startStr = start.toLocaleDateString('es-MX', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const endStr = endAdjusted.toLocaleDateString('es-MX', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return `${startStr} – ${endStr}`;
  };

  useEffect(() => {
    const badge = badgeRef.current;
    if (badge) {
      badge.classList.remove('fade-in-scale');
      void badge.offsetWidth;
      badge.classList.add('fade-in-scale');
    }
  }, [totalEventos]);

  const toggleStatus = (status: string) => {
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    onChangeStatus(updated);
  };

  const selectedNombre = selectedTipo === 'medico'
    ? medicos.find(m => m.id === selectedId)?.user.name
    : selectedTipo === 'servicio'
      ? 'Servicios'
      : 'Todos';

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full px-2 py-2">
      {/* IZQUIERDA */}
      <div className="flex items-center gap-2 min-w-max">
        <div
          className="w-14 h-16 rounded-b-lg overflow-hidden border shadow-sm flex flex-col cursor-pointer hover:shadow-md focus:outline-none"
          onClick={onToday}
          role="button"
          tabIndex={0}
          title="Ir a hoy"
        >
          <div className="bg-primary text-white text-xs font-semibold text-center py-1 uppercase tracking-wide">
            {monthShort}
          </div>
          <div className="flex-1 flex items-center justify-center text-black font-bold text-xl">
            {day}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              {monthLong.charAt(0).toUpperCase() + monthLong.slice(1)} {year}
            </h2>
            <span
              ref={badgeRef}
              className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              {totalEventos ?? 0} eventos
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Button className='cursor-pointer' variant="outline" size="icon" onClick={onPrev}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span>{formatRange(visibleStart, visibleEnd)}</span>
            <Button className='cursor-pointer' variant="outline" size="icon" onClick={onNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* CENTRO */}
      <div className="flex items-center gap-3 justify-center flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='cursor-pointer' variant="outline" size="icon" title="Filtrar por estatus">
              <Filter className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className='w-auto'>
            {ESTATUS_OPCIONES.map((status) => (
              <DropdownMenuCheckboxItem
                key={status.value}
                checked={selectedStatuses.includes(status.value)}
                onCheckedChange={() => toggleStatus(status.value)}
                onSelect={(e) => e.preventDefault()}
                className='capitalize cursor-pointer'
              >
                <span className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
                {status.label}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                if (selectedStatuses.length > 0) {
                  onChangeStatus([]);
                }
              }}
              disabled={selectedStatuses.length === 0}
              className={`justify-between text-sm font-medium cursor-pointer ${selectedStatuses.length === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-red-600 hover:text-red-700'
                }`}
            >
              <RefreshCcw className='w-4 h-4' />
              Limpiar filtros
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Vistas del calendario */}
        <div className="inline-flex rounded-md border overflow-hidden">
          {/* <Button
            variant="ghost"
            size="icon"
            title='Vista de semana en lista'
            className={`rounded-none cursor-pointer ${activeView === 'listWeek' ? 'bg-neutral-900 text-white' : ''}`}
            onClick={() => onChangeView('listWeek')}
          >
            <LayoutList className="w-4 h-4" />
          </Button> */}
          <Button
            variant="ghost"
            size="icon"
            title='Vista semanal con horario'
            className={`rounded-none cursor-pointer ${activeView === 'timeGridWeek' ? 'bg-primary text-white' : ''}`}
            onClick={() => onChangeView('timeGridWeek')}
          >
            <Columns2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title='Vista mensual'
            className={`rounded-none cursor-pointer ${activeView === 'dayGridMonth' ? 'bg-primary text-white' : ''}`}
            onClick={() => onChangeView('dayGridMonth')}
          >
            <Grid2X2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title='Vista multi mensual'
            className={`rounded-none cursor-pointer ${activeView === 'multiMonthYear' ? 'bg-primary text-white' : ''}`}
            onClick={() => onChangeView('multiMonthYear')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
        </div>

        {/* Dropdown de selección de médico o servicios */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-3 px-3 py-2 cursor-pointer">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback className="text-sm font-semibold">
                  {selectedTipo === 'medico' && selectedId !== null
                    ? medicos.find(m => m.id === selectedId)?.user.name.charAt(0).toUpperCase() ?? 'M'
                    : selectedTipo === 'servicio'
                      ? 'S'
                      : 'T'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-xs text-muted-foreground">Filtrar por</span>
                <span className="text-sm font-medium">
                  {selectedTipo === 'medico'
                    ? medicos.find(m => m.id === selectedId)?.user.name
                    : selectedTipo === 'servicio'
                      ? 'Servicios'
                      : 'Todos'}
                </span>
              </div>
              {selectedTipo === 'medico' ? (
                <Stethoscope className="w-4 h-4 text-blue-500" />
              ) : selectedTipo === 'servicio' ? (
                <Layers className="w-4 h-4 text-teal-500" />
              ) : (
                <User className="w-4 h-4 text-gray-500" />
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="min-w-[200px]">
            {medicos.map((medico) => (
              <DropdownMenuItem
                key={medico.id}
                onSelect={(e) => {
                  e.preventDefault();
                  onChangeTipo('medico', medico.id);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-blue-500" />
                {medico.user.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onChangeTipo('servicio', null);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-teal-500" />
              Servicios
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                onChangeTipo('todos', null);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <User className="w-4 h-4 text-gray-500" />
              Todos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      {/* DERECHA */}
      <div className="flex items-center gap-2 min-w-max">
        <Button className="cursor-pointer bg-primary text-white" onClick={onCrearEvento}>
          <Plus className="w-4 h-4 mr-1" /> Crear cita
        </Button>
      </div>
    </div>
  );
}
