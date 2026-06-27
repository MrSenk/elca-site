import { useApp } from '../hooks/useApp';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTypingEffect } from '../hooks/useTypingEffect';

const PortfolioHeader = () => {
    const { content, setLanguage, language } = useApp();
    const [hasTyped, setHasTyped] = useState(false);
    const [displayedLang, setDisplayedLang] = useState(language === 'en' ? 'EN' : 'ES');
    const [isTypingLang, setIsTypingLang] = useState(false);
    const location = useLocation();

    const fullName = content.profile.name.toLowerCase().replace(' ', '_');
    const isPortfolioPage = location.pathname === '/';

    const animateText = isPortfolioPage && !hasTyped ? fullName : '';
    const typedName = useTypingEffect(animateText, 100, () => setHasTyped(true));
    const displayedName = isPortfolioPage && !hasTyped ? typedName : fullName;

    useEffect(() => {
        const targetLang = language === 'en' ? 'EN' : 'ES';
        if (displayedLang === targetLang || isTypingLang) return;

        setIsTypingLang(true);
        const backspaceSteps = displayedLang.length;
        let step = 0;

        const backspaceInterval = setInterval(() => {
            if (step < backspaceSteps) {
                setDisplayedLang(prev => prev.slice(0, prev.length - 1));
                step++;
            } else {
                clearInterval(backspaceInterval);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const handleLanguageToggle = () => {
        if (!isTypingLang) {
            setLanguage(language === 'en' ? 'es' : 'en');
        }
    };

    return (
        <header className="sticky top-0 z-50 panel-nav py-2 px-4 mb-6">
            <div className="flex justify-between items-center">
                {/* Logo / Name */}
                <div className="flex items-center gap-3">
                    <span className="text-[var(--bb-amber)] font-terminal text-lg leading-none select-none">⌞</span>
                    <Link to="/">
                        <span className="font-mono text-sm text-[var(--bb-text)] hover:text-[var(--bb-amber)] transition-colors tracking-widest uppercase select-none">
                            {displayedName}
                        </span>
                    </Link>
                    <span className="text-[var(--bb-amber)] font-terminal text-lg leading-none select-none">⌝</span>
                </div>

                {/* Right HUD */}
                <nav className="flex items-center gap-6">
                    {/* Signal indicator */}
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--bb-amber)] animate-glow-pulse inline-block" style={{ boxShadow: '0 0 6px var(--bb-amber)' }} />
                        <span className="font-terminal text-[var(--bb-dim)] text-sm tracking-widest">SIGNAL: OK</span>
                    </div>

                    {/* Separator */}
                    <span className="hidden sm:block text-[var(--bb-border)] font-terminal">|</span>

                    {/* Language toggle */}
                    <button
                        onClick={handleLanguageToggle}
                        disabled={isTypingLang}
                        aria-label="Toggle language"
                        className="border border-[var(--bb-border)] hover:border-[var(--bb-amber)] text-[var(--bb-dim)] hover:text-[var(--bb-amber)] font-terminal text-sm px-3 py-0.5 transition-colors tracking-widest min-w-[4ch] text-center"
                    >
                        {displayedLang}
                        {isTypingLang && <span className="animate-blink ml-0.5">_</span>}
                    </button>
                </nav>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--bb-amber) 30%, var(--bb-cyan) 70%, transparent)' }} />
        </header>
    );
};

export default PortfolioHeader;
