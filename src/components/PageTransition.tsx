
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
    children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsVisible(false);
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 50);

        return () => clearTimeout(timeout);
    }, [location.pathname]);

    return (
        <div
            className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {children}
        </div>
    );
};

export default PageTransition;
