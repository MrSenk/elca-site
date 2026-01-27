import { useApp } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const PortfolioHeader = () => {
    const { content, setLanguage, language, toggleTheme, theme } = useApp();
    const [displayedName, setDisplayedName] = useState('');
    const [hasTyped, setHasTyped] = useState(false);
    const [displayedLang, setDisplayedLang] = useState(language === 'en' ? 'EN' : 'ES');
    const [isTypingLang, setIsTypingLang] = useState(false);
    const location = useLocation();

    const fullName = content.profile.name.toLowerCase().replace(' ', '_');
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

    // Language typing animation
    useEffect(() => {
        const targetLang = language === 'en' ? 'EN' : 'ES';
        if (displayedLang === targetLang || isTypingLang) return;

        setIsTypingLang(true);

        // Backspace animation
        const backspaceSteps = displayedLang.length;
        let step = 0;

        const backspaceInterval = setInterval(() => {
            if (step < backspaceSteps) {
                setDisplayedLang(displayedLang.slice(0, displayedLang.length - step - 1));
                step++;
            } else {
                clearInterval(backspaceInterval);

                // Type new language
                setTimeout(() => {
                    let typeStep = 0;
                    const typeInterval = setInterval(() => {
                        if (typeStep < targetLang.length) {
                            setDisplayedLang(targetLang.slice(0, typeStep + 1));
                            typeStep++;
                        } else {
                            clearInterval(typeInterval);
                            setIsTypingLang(false);
                        }
                    }, 80);
                }, 100);
            }
        }, 80);
    }, [language]);

    const handleLanguageToggle = () => {
        if (!isTypingLang) {
            setLanguage(language === 'en' ? 'es' : 'en');
        }
    };

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center py-4 mb-8 glass-nav transition-all duration-300 relative">
            <div className="flex items-center gap-4">
                <Link to="/">
                    <h1 className="text-xl font-bold bg-clip-text text-theme-text hover:text-theme-peach transition-colors cursor-pointer select-none">
                        {displayedName}
                    </h1>
                </Link>
            </div>

            {/* Controls - always visible */}
            <nav className="flex items-center gap-4 text-sm text-theme-overlay">
                <button
                    onClick={handleLanguageToggle}
                    className="hover:text-theme-text transition-colors font-medium font-mono w-[3ch] text-left"
                    aria-label="Toggle language"
                    disabled={isTypingLang}
                >
                    <span className="inline-block">
                        {displayedLang}
                        {isTypingLang && <span className="animate-blink">|</span>}
                    </span>
                </button>
                <button
                    onClick={toggleTheme}
                    className="hover:text-theme-text transition-all duration-300 p-2 group"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        // Moon icon for dark mode
                        <svg
                            className="w-5 h-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    ) : (
                        // Sun icon for light mode
                        <svg
                            className="w-5 h-5 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12,17.5A5.5,5.5,0,1,1,17.5,12,5.51,5.51,0,0,1,12,17.5ZM12,8.5A3.5,3.5,0,1,0,15.5,12,3.5,3.5,0,0,0,12,8.5Z" />
                            <path d="M12,6a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V5A1,1,0,0,0,12,6Z" />
                            <path d="M12,18a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Z" />
                            <path d="M6,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H5A1,1,0,0,0,6,12Z" />
                            <path d="M21,11H19a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z" />
                            <path d="M7.05,7.05a1,1,0,0,0,0-1.41L5.64,4.22A1,1,0,0,0,4.22,5.64L5.64,7.05A1,1,0,0,0,7.05,7.05Z" />
                            <path d="M18.36,16.95a1,1,0,0,0-1.41,1.41l1.41,1.41a1,1,0,0,0,1.41-1.41Z" />
                            <path d="M18.36,7.05l1.41-1.41a1,1,0,1,0-1.41-1.41L16.95,5.64a1,1,0,0,0,1.41,1.41Z" />
                            <path d="M5.64,18.36,4.22,19.78a1,1,0,0,0,1.41,1.41l1.41-1.41a1,1,0,0,0-1.41-1.41Z" />
                        </svg>
                    )}
                </button>
            </nav>
        </header>
    );
};

export default PortfolioHeader;
