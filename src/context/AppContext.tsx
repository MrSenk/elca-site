import { createContext, useState, type ReactNode } from 'react';
import contentData from '../data/content.json';
import type { Content, ContentData } from '../types';

type Language = 'en' | 'es';

interface AppContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    content: Content;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('language');
            return (saved === 'en' || saved === 'es') ? saved : 'en';
        }
        return 'en';
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
    };

    const fullContent = contentData as ContentData;
    const content = fullContent[language];

    return (
        <AppContext.Provider value={{ language, setLanguage, content }}>
            {children}
        </AppContext.Provider>
    );
};
