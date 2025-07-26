import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export function actualizarColoresEvento(eventEl: HTMLElement, nuevoEstatus: string) {
  if (!eventEl) return;

  // Eliminar clases de color previas
  eventEl.classList.forEach(cls => {
    if (cls.startsWith('evento-') || cls.startsWith('txt-')) {
      eventEl.classList.remove(cls);
    }
  });

  // Agregar nuevas clases
  eventEl.classList.add(`evento-${nuevoEstatus}`, `txt-${nuevoEstatus}`);

  // Dot (vista dayGrid o multiMonth)
  const dot = eventEl.querySelector('.fc-daygrid-event-dot');
  if (dot) {
    dot.classList.forEach(cls => {
      if (cls.startsWith('dot-')) {
        dot.classList.remove(cls);
      }
    });
    dot.classList.add(`dot-${nuevoEstatus}`);
  }

  // Hora del evento
  const timeEl = eventEl.querySelector('.fc-event-time');
  if (timeEl) {
    timeEl.className = `fc-event-time txt-${nuevoEstatus}`;
  }

  // Título del evento
  const titleEl = eventEl.querySelector('.fc-event-title');
  if (titleEl) {
    titleEl.className = `fc-event-title txt-${nuevoEstatus}`;
  }
}
