import { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/public/public-navbar-layout';
import DoctorCard from '@/components/public/card-doctor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

interface Medico {
  id: number;
  cedula_cpe: string;
  especialidad: string;
  subespecialidad: string;
  avatar: string;
  user: {
    name: string;
    email: string;
  };
}

interface PageProps {
  medicos: Medico[];
  especialidades: string[];
}

export default function DirectorioPage({ medicos, especialidades }: PageProps) {
  const [filtro, setFiltro] = useState('');

  const medicosFiltrados = filtro
    ? medicos.filter(m =>
      (m.especialidad && m.especialidad.toLowerCase().includes(filtro.toLowerCase())) ||
      (m.subespecialidad && m.subespecialidad.toLowerCase().includes(filtro.toLowerCase()))
    )
    : medicos;

  return (
    <MainLayout>
      <Head title="Médicos" />

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Nuestro equipo médico</h1>

        {/* Filtro de especialidad */}
        <div className="max-w-sm mx-auto mb-8">
          <Select onValueChange={(val) => setFiltro(val === 'all' ? '' : val)} value={filtro || 'all'}>
            <SelectTrigger className="w-full rounded-full cursor-pointer">
              <SelectValue placeholder="Todas las especialidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las especialidades</SelectItem>
              {especialidades.map((esp, i) => (
                <SelectItem className='cursor-pointer' key={i} value={esp}>
                  {esp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        {/* Cards de médicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicosFiltrados.length ? (
            <AnimatePresence mode="wait">
              {medicosFiltrados.map((medico) => (
                <motion.div
                  key={medico.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <DoctorCard
                    key={medico.id + medico.cedula_cpe}
                    avatar={medico.avatar || '/icons/profile.webp'}
                    name={medico.user.name}
                    cedula={medico.cedula_cpe}
                    especialidad={medico.especialidad}
                    subespecialidad={medico.subespecialidad}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

          ) : (
            <p className="col-span-full text-center text-gray-500">No hay médicos con esa especialidad.</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
