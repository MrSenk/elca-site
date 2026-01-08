
import { useApp } from '../context/AppContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    useApp();

    // If we really want to switch colors, we might need a more dynamic approach than static tailwind config colors.
    // But for the requested "Mocha" palette, we set defaults.
    // If "light" is selected, we could override classes, but let's stick to the static base for now 
    // as the user prioritized the Mocha look.
    // However, I will wrap the app in a div that applies the background to ensure it covers everything.

    return (
        <div className="min-h-screen w-full transition-colors duration-300 bg-theme-base text-theme-text">
            <div className="max-w-[1000px] mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col font-mono">
                {children}
            </div>
        </div>
    );
};

export default Layout;
