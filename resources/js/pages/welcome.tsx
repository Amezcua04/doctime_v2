import MainLayout from '@/layouts/public/public-navbar-layout';
import PageHead from '@/components/public/public-page-head';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Landing() {
  return (
    <MainLayout>
      <PageHead title="DocTime - Tu plataforma de gestión médica" />

      {/* Main Content */}
      <main className="w-full grow bg-gradient-to-b from-white to-blue-50 px-6 py-12 text-gray-900 dark:text-white">
        {/* Hero Section */}
        <motion.h1
          className="text-4xl sm:text-6xl font-bold text-blue-800 dark:text-blue-300 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bienvenido a DocTime
        </motion.h1>

        <section className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 px-4 py-12">
          {/* Text Section */}
          <div className="w-full md:w-1/2 space-y-6 text-justify">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center md:text-left">
              Salud de calidad al alcance de tu mano, todo el año.
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui similique dolorum voluptates laudantium, tenetur, a officia temporibus iusto, odit earum omnis architecto magni harum laboriosam suscipit placeat non assumenda animi?
            </p>

            {/* <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 text-center md:text-left">
              ¡Atención médica y servicios todo el año para ti y tu familia!
            </h3>
            <p className="text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque tempora possimus doloremque blanditiis, ipsa explicabo accusantium error enim repellendus ea voluptates velit sed dicta! Nemo numquam placeat illo exercitationem laboriosam!
            </p> */}
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 relative flex justify-center">
            <div className="absolute inset-0 rounded-bl-[80px] bg-green-400 opacity-20 z-0" />
            <img
              src="/path/to/your/family-image.png"
              alt="Imagen familia"
              className="relative z-10 max-w-full h-auto object-cover"
            />
          </div>
        </section>

        <Separator className="my-12" />

        {/* Médicos */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-center text-blue-800 dark:text-blue-300 mb-8">
            Catálogo de Médicos Especialistas
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Dra. Ana Pérez", specialty: "Cardióloga" },
              { name: "Dr. Luis Gómez", specialty: "Pediatra" },
              { name: "Dra. María Ruiz", specialty: "Ginecóloga" },
            ].map((medico, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="space-y-2 p-6">
                  <CardTitle>{medico.name}</CardTitle>
                  <CardDescription>{medico.specialty}</CardDescription>
                  <Badge className="w-fit bg-green-100 text-green-700">Disponible</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href={route('public.directorio')}>
              <Button className=" cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
                Ver todo el catálogo
              </Button>
            </Link>
          </div>
        </section>

        {/* Servicios */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-semibold text-center text-blue-800 dark:text-blue-300 mb-8">
            Servicios Médicos Disponibles
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Laboratorio Clínico", description: "Análisis y estudios completos." },
              { name: "Rayos X", description: "Diagnóstico por imagen de alta precisión." },
              { name: "Ultrasonido", description: "Ecografías con equipos de última tecnología." },
            ].map((servicio, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="space-y-2 p-6">
                  <CardTitle>{servicio.name}</CardTitle>
                  <CardDescription>{servicio.description}</CardDescription>
                  <Badge className="w-fit bg-yellow-100 text-yellow-700">Incluido</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href={route('public.catalogo')}>
              <Button className=" cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
                Ver todos los servicios
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center">
          <h3 className="text-2xl font-medium mb-4">Únete a DocTime</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Atención médica y servicios todo el año para ti y tu familia.
          </p>
          <Link href={route('home')}>
            <Button className=" cursor-pointer bg-blue-600 text-white hover:bg-blue-700">
              Ver todos los servicios
            </Button>
          </Link>
        </section>
      </main>
    </MainLayout>
  );
}
