import { ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { Grid, Menu, X } from 'lucide-react';

interface Props {
    children: ReactNode;
}

export default function MainLayout({ children }: Props) {
    const { auth, ziggy } = usePage<SharedData>().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const currentRoute = ziggy.location;

    const navLinks = [
        { name: 'Inicio', href: route('home') },
        { name: 'Nosotros', href: route('public.about') },
        { name: 'Médicos', href: route('public.directorio') },
        { name: 'Servicios', href: route('public.catalogo') },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 py-3 md:rounded-full shadow-md flex items-center justify-between">

                    {/* Logo + Marca */}
                    <Link href={route('home')} className="flex items-center gap-2">
                        <img src="/logo_h.png" alt="Logo" className="h-8 w-auto" />
                        {/* <span className="font-semibold text-lg text-black">Elizacare</span> */}
                    </Link>

                    {/* Navegación principal (escritorio) */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => {
                            const isActive = currentRoute === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Idioma + CTA (escritorio) */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Selector de idioma */}
                        <div className="relative group">
                            <button className="flex items-center rounded-full hover:bg-gray-100 p-1">
                                <img src="/icons/flags/es.png" alt="ES" className="w-5 h-5 rounded-full" />
                                <svg className="ml-1 w-4 h-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.29l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                                </svg>
                            </button>
                        </div>

                        {/* Botón CTA */}
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="block rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 transition text-center"
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="block rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 transition text-center"
                                onClick={() => setMenuOpen(false)}
                            >
                                Iniciar sesión
                            </Link>
                        )}
                    </div>

                    {/* Botón menú móvil */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Menú móvil */}
                {menuOpen && (
                    <nav className="md:hidden px-6 pb-4 mt-2 flex flex-col gap-4">
                        {navLinks.map((link) => {
                            const isActive = currentRoute === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={
                                        isActive
                                            ? 'block px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm'
                                            : 'block text-sm font-medium text-black hover:text-blue-600'
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        {/* Idioma móvil */}
                        <div className="flex items-center gap-2">
                            <img src="/icons/flags/en.png" alt="EN" className="w-5 h-5 rounded-full" />
                            <span className="text-sm text-gray-700">Español</span>
                        </div>

                        {/* CTA móvil */}
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="block rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 transition text-center"
                                onClick={() => setMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="block rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 transition text-center"
                                onClick={() => setMenuOpen(false)}
                            >
                                Iniciar sesión
                            </Link>
                        )}
                    </nav>
                )}
            </header>


            <main className="flex-1">{children}</main>

            <footer className="border-t border-gray-200 py-6 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    {/* Redes */}
                    <div className="flex gap-4">
                        <a
                            href="https://instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            <img
                                src="/icons/instagram.png"
                                alt="Instagram"
                                className="w-5 h-5 object-contain"
                                loading="lazy"
                            />
                        </a>
                        <a
                            href="https://facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            <img
                                src="/icons/facebook.png"
                                alt="Facebook"
                                className="w-5 h-5 object-contain"
                                loading="lazy"
                            />
                        </a>
                        <a
                            href="https://wa.me/3114000218"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            <img
                                src="/icons/whatsapp_.png"
                                alt="Whatsapp"
                                className="w-5 h-5 object-contain"
                                loading="lazy"
                            />
                        </a>
                    </div>

                    {/* Derechos */}
                    <div className="text-center">
                        &copy; {new Date().getFullYear()} DocTime. Todos los derechos reservados.
                    </div>

                    {/* DevStudio */}
                    <div className="text-right">
                        Desarrollado por{' '}
                        <a
                            href="https://devstudiomx.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            DevStudioMx
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
