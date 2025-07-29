import { PackageCheck, Droplets, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface ServicioCardProps {
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  tipo: 'envio' | 'agua';
}

export default function ServicioCard({
  nombre,
  precio,
  descripcion,
  imagen,
  tipo,
}: ServicioCardProps) {
  const isEnvio = tipo === 'agua';

  return (
    <div className="group relative bg-white rounded-[1.5rem] shadow-md w-full max-w-xs overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Banner superior tipo ícono */}
      <div
        className={cn(
          'absolute top-0 right-0 rounded-bl-2xl px-3 py-2 text-white text-xs font-medium z-10 transition-colors duration-300',
          isEnvio ? 'bg-orange-400' : 'bg-sky-500'
        )}
      >
        {isEnvio ? (
          <PackageCheck className="w-4 h-4" />
        ) : (
          <Droplets className="w-4 h-4" />
        )}
      </div>

      {/* Imagen con zoom al hover */}
      <div className="overflow-hidden">
        <img
          src={imagen}
          alt={nombre}
          className="w-full aspect-square object-cover rounded-t-2xl transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 pt-2 text-center bg-white transition duration-300 group-hover:bg-transparent">
        <span className="text-md font-semibold text-gray-900">{nombre}</span>

        <div className="flex justify-end mt-4">
          <span className="text-sm font-semibold text-gray-900">${precio}</span>
        </div>

        <p className="text-sm text-gray-500 mt-1 transition-opacity duration-300 group-hover:text-gray-800">
          {descripcion}
        </p>

        {/* Botón de agendar */}
        <Button
          className="cursor-pointer mt-4 inline-flex items-center gap-1 justify-center w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition duration-300"
        >
          <CalendarCheck className="w-4 h-4" />
          Agendar
        </Button>
      </div>
    </div>
  );
}
