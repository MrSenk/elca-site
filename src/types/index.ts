export interface Stat {
    label: string;
    value: string;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface Profile {
    name: string;
    role: string;
    location: string;
    stats: Stat[];
}

export interface UI {
    blogLink: string;
    aboutMeTitle: string;
    beyondCodeTitle: string;
    experienceTitle: string;
    certificationsTitle: string;
    techStackTitle: string;
}

export interface CertificationSection {
    title: string;
    items: string[];
}

export interface Certifications {
    sections: CertificationSection[];
}

export interface Content {
    greeting: string;
    footer: string;
    profile: Profile;
    aboutMe: string;
    beyondCode: string;
    ui: UI;
    tech: string[];
    certifications: Certifications;
    experience: Experience[];
}

export interface ContentData {
    en: Content;
    es: Content;
}

// Blog types
export type BlogContentBlock =
    | { type: 'text'; value: string }
    | { type: 'heading'; value: string }
    | { type: 'code'; value: string; language: string }
    | { type: 'image'; src: string; alt?: string }
    | { type: 'sources'; links: { title: string; url: string }[] };

export interface BlogArticle {
    id: string;
    title: string;
    date: string;
    summary: string;
    content: BlogContentBlock[];
}

export interface BlogData {
    en: { articles: BlogArticle[] };
    es: { articles: BlogArticle[] };
}
