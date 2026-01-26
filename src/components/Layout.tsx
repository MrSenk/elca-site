
import { useApp } from '../context/AppContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    useApp();

    return (
        <div className="min-h-screen w-full transition-colors duration-300 bg-theme-base text-theme-text">
            <div className="max-w-[1400px] mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default Layout;
