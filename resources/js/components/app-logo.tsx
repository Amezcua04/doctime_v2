import AppLogoIcon from './app-logo-icon';
import { useSidebar } from "@/components/ui/sidebar";

export default function AppLogo() {
    const { state } = useSidebar();
    const logoSrc = state === "collapsed" ? "/favicon.ico" : "/logo_h.png";
    const logoClass =
        state === "collapsed"
            ? "h-8 w-auto rounded-md transition-all duration-300 ease-in-out"
            : "h-15 w-auto rounded-md transition-all duration-300 ease-in-out";
    return (
        <div className="flex justify-center items-center w-full">
            <img
                src={logoSrc}
                alt="Logo"
                loading="lazy"
                className={logoClass}
            />
        </div>
    );
}