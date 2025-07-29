import { CheckCircle, User, Clipboard, Plus, PhoneCall, Calendar } from 'lucide-react';

interface DoctorCardProps {
  avatar: string;
  name: string;
  cedula: string;
  especialidad: string;
  subespecialidad: string;
  telefono?: string;
}

export default function DoctorCard({
  avatar,
  name,
  cedula,
  especialidad,
  subespecialidad,
  telefono
}: DoctorCardProps) {
  return (
    <div className="group w-full max-w-sm rounded-[2rem] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-2 transition-all">
      <div className="relative overflow-hidden rounded-[1.5rem]">
        {/* Imagen */}
        <img
          src={avatar}
          alt={name}
          className="w-full h-90 object-cover transition-all duration-300"
        />

        {/* Información con fondo blanco, blur y border radius inferior */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white/80 transition-all duration-300 group-hover:bg-transparent rounded-t-[1.5rem]">
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-md font-semibold transition">
              {name}
            </h2>
          </div>

          <p className="text-sm text-gray-600 group-hover:text-black transition mb-3">
            Cédula profesional: <span className="font-medium">{cedula}</span>
          </p>

          <div className="flex flex-col text-sm text-gray-700 group-hover:text-black transition mb-4">
            <div className="">
              <span className="font-semibold">Especialidad:</span> {especialidad}
            </div>
            {subespecialidad && (

              <div className="">
                <span className="font-semibold">Subespecialidad:</span> {subespecialidad}
              </div>
            )}
          </div>

          {/* Botones en fila */}
          <div className="flex gap-2">
            {!telefono && (
              <a
                href={`tel:${telefono}`}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 rounded-full py-2 text-sm font-medium shadow-sm transition hover:bg-gray-200 group-hover:bg-white group-hover:text-black"
              >
                <PhoneCall className="w-4 h-4" />
                Llamar
              </a>
            )}
            <button className="cursor-pointer px-1 w-full flex items-center justify-center gap-2 bg-gray-100 text-black rounded-full py-2 text-sm font-medium shadow-sm transition hover:bg-gray-200 group-hover:bg-white group-hover:text-black">
              <Calendar className="w-4 h-4" />
              Agendar cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
