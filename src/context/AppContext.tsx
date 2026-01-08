import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import contentData from '../data/content.json';
import type { Content, ContentData } from '../types';

type Language = 'en' | 'es';
type Theme = 'dark' | 'light';

interface AppContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    theme: Theme;
    toggleTheme: () => void;
    content: Content;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('language') as Language;
            return (saved === 'en' || saved === 'es') ? saved : 'en';
        }
        return 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as Theme;
            return saved || 'dark';
        }
        return 'dark';
    });

    const fullContent = contentData as ContentData;
    const content = fullContent[language];

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'light') {
            root.classList.add('light');
            root.classList.remove('dark');
        } else {
            root.classList.remove('light');
            root.classList.add('dark');
        }
    }, [theme]);

    // Update Tailwind config strategy later if full theme switching needed.
    // For now, I'll focus on the data providing aspect.

    return (
        <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, content }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
