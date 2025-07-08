import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CalendarCheck, ContactRound, FileStack, Folder, LayoutGrid, MessagesSquare, UserRoundPlus, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const userRole = auth?.user?.role;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    const asistenteNavItems: NavItem[] = [
        {
            title: 'Citas',
            href: '/citas',
            icon: CalendarCheck,
        },
    ];

    const medicoNavItems: NavItem[] = [
        {
            title: 'Pacientes',
            href: '/pacientes',
            icon: ContactRound,
        },
    ];

    const adminNavItems: NavItem[] = [
        {
            title: 'Médicos',
            href: '/medicos',
            icon: UsersRound,
        },
        {
            title: 'Servicios',
            href: '/servicios',
            icon: FileStack,
        },
    ];

    let roleBaseNavItems = [...mainNavItems];
    if (userRole === 'asistente') {
        roleBaseNavItems = [...mainNavItems, ...asistenteNavItems];
    }
    if (userRole === 'medico') {
        roleBaseNavItems = [...mainNavItems, ...asistenteNavItems, ...medicoNavItems];
    }
    if (userRole === 'admin') {
        roleBaseNavItems = [...mainNavItems, ...asistenteNavItems, ...medicoNavItems, ...adminNavItems];
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Soporte',
            href: 'https://wa.me/3114000218',
            icon: MessagesSquare,
        },
    ];


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain title='General' items={roleBaseNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
