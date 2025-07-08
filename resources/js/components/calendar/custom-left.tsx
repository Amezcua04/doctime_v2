import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CalendarHeader() {
  const fecha = new Date();
  const monthShort = fecha.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // JUL
  const monthLong = fecha.toLocaleString('en-US', { month: 'long' }); // July
  const day = fecha.getDate(); // 3
  const year = fecha.getFullYear();

  const firstDay = new Date(year, fecha.getMonth(), 1).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const lastDay = new Date(year, fecha.getMonth() + 1, 0).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex items-start gap-4 w-full px-2">
      {/* Fecha destacada a la izquierda */}
      <div className="w-14 h-16 rounded-b-lg overflow-hidden border shadow-sm flex flex-col">
        <div className="bg-neutral-900 text-white text-xs font-semibold text-center py-1 uppercase tracking-wide">
          {monthShort}
        </div>
        <div className="flex-1 flex items-center justify-center text-black font-bold text-xl">
          {day}
        </div>
      </div>

      {/* Info y navegación a la derecha */}
      <div className="flex flex-col w-full">
        {/* Título y contador */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">
            {monthLong} {year}
          </h2>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
            33 events
          </span>
        </div>

        {/* Navegación */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="mx-1">
            {firstDay} – {lastDay}
          </span>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
