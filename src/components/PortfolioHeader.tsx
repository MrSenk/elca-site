import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

const PortfolioHeader = () => {
    const { content, setLanguage, language, toggleTheme, theme } = useApp();
    const [displayedName, setDisplayedName] = useState('');
    const [hasTyped, setHasTyped] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { label: 'experience', href: '#experience' },
        { label: 'certs', href: '#certifications' },
        { label: 'tech', href: '#tech' },
    ];

    const fullName = content.profile.name.toLowerCase().replace(' ', '_');
    const isBlogPage = location.pathname.startsWith('/blog');
    const isPortfolioPage = location.pathname === '/';

    useEffect(() => {
        if (!isPortfolioPage) {
            setDisplayedName(fullName);
            setHasTyped(true);
            return;
        }

        if (hasTyped) return;

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullName.length) {
                setDisplayedName(fullName.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
                setHasTyped(true);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [fullName, hasTyped, isPortfolioPage]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center py-4 mb-8 bg-theme-base backdrop-blur-sm bg-opacity-95 transition-colors duration-300 relative">
            <div className="flex items-center gap-4 z-50">
                <Link to="/">
                    <h1 className="text-xl font-bold bg-clip-text text-theme-text hover:text-theme-peach transition-colors cursor-pointer select-none">
                        {displayedName}
                        {isPortfolioPage && <span className="animate-blink">|</span>}
                    </h1>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden z-50 text-theme-text p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-theme-overlay">
                {!isBlogPage && (
                    <>
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="hover:text-theme-text transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="w-[1px] h-4 bg-theme-overlay opacity-50 mx-2"></div>
                    </>
                )}
                <button
                    onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                    className="hover:text-theme-text transition-colors"
                >
                    {language === 'en' ? 'EN' : 'ES'}
                </button>
                <button onClick={toggleTheme} className="hover:text-theme-text transition-colors">
                    {theme === 'dark' ? 'dark' : 'light'}
                </button>
            </nav>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && createPortal(
                <div className="fixed inset-0 bg-theme-base/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 md:hidden z-[100] animate-fade-in">
                    <button
                        className="absolute top-6 right-4 text-theme-text p-2"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {!isBlogPage && navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-2xl text-theme-text hover:text-theme-peach font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}

                    <div className="flex gap-8 mt-4">
                        <button
                            onClick={() => {
                                setLanguage(language === 'en' ? 'es' : 'en');
                                setIsMenuOpen(false);
                            }}
                            className="text-xl text-theme-overlay hover:text-theme-text"
                        >
                            {language === 'en' ? 'EN' : 'ES'}
                        </button>
                        <button
                            onClick={() => {
                                toggleTheme();
                                setIsMenuOpen(false);
                            }}
                            className="text-xl text-theme-overlay hover:text-theme-text"
                        >
                            {theme === 'dark' ? 'dark' : 'light'}
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
};

export default PortfolioHeader;
