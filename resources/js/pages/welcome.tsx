import MainLayout from '@/layouts/public/public-navbar-layout';
import PageHead from '@/components/public/public-page-head';

export default function Landing() {
  return (
    <MainLayout>
      <PageHead title="DocTime - Tu plataforma de gestión médica" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-primary leading-tight">
              Gestión médica moderna y eficiente
            </h1>
            <p className="mb-4 text-lg md:text-xl text-muted-foreground">
              Reserva, administra y consulta citas médicas e historiales clínicos en una sola plataforma segura y fácil de usar.
            </p>
            <p className="mb-8 text-lg md:text-xl text-muted-foreground">
              Ideal para clínicas, consultorios y hospitales que buscan optimizar sus procesos y brindar mejor atención.
            </p>

            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
              <a
                href="#"
                className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                Empezar ahora
              </a>
              <a
                href="#features"
                className="rounded-full border border-border px-8 py-3 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                Ver características
              </a>
            </div>
          </div>

          <div className="hidden md:block animate-fade-in">
            <img
              src="/img/landing-hero.svg"
              alt="Ilustración DocTime"
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/50 dark:bg-muted px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Funciones clave de DocTime
          </h2>
          <div className="grid gap-12 md:grid-cols-3 text-center">
            <div className="px-4">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-xl font-semibold text-primary">Reservas inteligentes</h3>
              <p className="mt-2 text-muted-foreground">
                Permite a los pacientes agendar sus citas de forma rápida desde cualquier dispositivo.
              </p>
            </div>
            <div className="px-4">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-xl font-semibold text-primary">Historial clínico seguro</h3>
              <p className="mt-2 text-muted-foreground">
                Consulta expedientes médicos protegidos y actualizados en tiempo real.
              </p>
            </div>
            <div className="px-4">
              <div className="text-4xl mb-3">🔔</div>
              <h3 className="text-xl font-semibold text-primary">Notificaciones automáticas</h3>
              <p className="mt-2 text-muted-foreground">
                Recordatorios inteligentes que mejoran la asistencia y reducen cancelaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="mb-6 text-3xl md:text-4xl font-bold text-primary">
          ¿Listo para transformar tu centro médico con DocTime?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Únete a cientos de profesionales que ya gestionan sus citas con eficiencia y confianza.
        </p>
        <a
          href="#"
          className="inline-block rounded-full bg-primary px-10 py-4 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
        >
          Crear cuenta gratis
        </a>
      </section>
    </MainLayout>
  );
}
