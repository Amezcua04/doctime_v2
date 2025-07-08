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

    // Ruta actual para resaltar pestaña activa
    const currentRoute = ziggy.location;

    const navLinks = [
        { name: 'Inicio', href: route('home') },
        { name: 'Nosotros', href: route('us') },
        // { name: 'Planes', href: route('plans') },
        // { name: 'Contacto', href: route('contact') },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-2">
                        <img src="/logo_h.png" alt="Logo" loading='lazy' className="h-12 w-auto rounded-md" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = currentRoute === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={
                                        isActive
                                            ? 'px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium text-sm'
                                            : 'text-sm font-medium text-black hover:text-blue-600'
                                    }
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA Right */}
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="hidden md:inline-block rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="hidden md:inline-block rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 transition"
                        >
                            Iniciar sesión
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {menuOpen && (
                    <nav className="md:hidden px-6 pb-4">
                        <div className="flex flex-col gap-4">
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
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            {/* Footer */}
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
                            <Grid className="w-5 h-5" />
                        </a>
                        <a
                            href="https://facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            <Grid className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.tiktok.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                        >
                            <Grid className="w-5 h-5 transform rotate-90" />
                        </a>
                    </div>

                    {/* Derechos reservados */}
                    <div className="text-center">
                        &copy; {new Date().getFullYear()} DocTime. Todos los derechos reservados.
                    </div>

                    {/* Desarrollado por */}
                    <div className="text-right">
                        Desarrollado por <a href="https://devstudiomx.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">DevStudioMx</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
