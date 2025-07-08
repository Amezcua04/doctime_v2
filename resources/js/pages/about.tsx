import PageHead from '@/components/public/public-page-head';
import MainLayout from '@/layouts/public/public-navbar-layout';
import React from 'react';

export default function AboutPage() {
    return (
        <MainLayout>
            <PageHead title="Nosotros" />
            <section className="w-full bg-white py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
            Conoce a <span className="text-green-600">DocTime</span>
          </h1>

          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-12">
            Somos un equipo apasionado por transformar la manera en que se gestionan las citas médicas. En DocTime, combinamos tecnología, eficiencia y humanidad para brindar soluciones digitales que agilicen el trabajo de profesionales de la salud y mejoren la experiencia de los pacientes.
          </p>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full text-3xl font-bold">
                💡
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Nuestra Misión</h3>
              <p className="text-gray-600">
                Modernizar la gestión médica a través de soluciones digitales accesibles, intuitivas y seguras para todos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-green-100 text-green-800 rounded-full text-3xl font-bold">
                🌱
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Nuestra Visión</h3>
              <p className="text-gray-600">
                Ser líderes en innovación médica digital en Latinoamérica, mejorando la atención al paciente y facilitando el trabajo clínico.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-purple-100 text-purple-800 rounded-full text-3xl font-bold">
                🤝
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Nuestros Valores</h3>
              <p className="text-gray-600">
                Ética, empatía, compromiso, innovación y respeto. Creemos en una salud digital centrada en las personas.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Por qué elegir DocTime?</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">
              Porque entendemos las necesidades reales de clínicas, consultorios y hospitales. DocTime nace para hacer tu trabajo más simple y tu servicio más humano.
            </p>
            <a
              href="#"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
        </MainLayout>
    );
}
