
import ServicioCard from '@/components/public/card-servicio';
import MainLayout from '@/layouts/public/public-navbar-layout';
import { Head } from '@inertiajs/react';

interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  costo: number;
  icono?: string;
  // imagen: string;
}

export default function CatalogoPage({ servicios }: { servicios: Servicio[] }) {
  return (
    <MainLayout>
      <Head title="Servicios" />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {servicios.map((servicio) => (
            <ServicioCard
              nombre={servicio.nombre}
              precio={servicio.costo}
              descripcion={servicio.descripcion || 'Descripción no disponible'}
              imagen='/icons/servicio.webp'
              tipo="envio"
            />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
