
import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import blogDataRaw from '../data/blog.json';
import type { BlogData } from '../types';
import CodeViewer from '../components/CodeViewer';

const blogData = blogDataRaw as BlogData;

const BlogArticle = () => {
    const { id } = useParams<{ id: string }>();
    const { language } = useApp();
    const article = blogData[language].articles.find(a => a.id === id);
    const [displayedTitle, setDisplayedTitle] = useState('');

    // Function to parse markdown bold (**text**), italic (*text*) syntax and newlines
    const parseTextContent = (text: string) => {
        // First split by newlines to handle list items
        const lines = text.split('\n');

        return lines.map((line, lineIndex) => {
            // Parse both bold and italic markdown
            // First, split by bold (**text**), then handle italic (*text*) in the remaining parts
            const boldParts = line.split(/(\*\*.*?\*\*)/g);

            const parsedLine = boldParts.map((part, partIndex) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    // Remove the ** markers and render as bold
                    const boldText = part.slice(2, -2);
                    return <strong key={`${lineIndex}-${partIndex}`} className="font-bold text-theme-text">{boldText}</strong>;
                }

                // For non-bold parts, check for italic (*text*)
                const italicParts = part.split(/(\*[^*]+\*)/g);
                return italicParts.map((italicPart, italicIndex) => {
                    if (italicPart.startsWith('*') && italicPart.endsWith('*') && italicPart.length > 2) {
                        // Remove the * markers and render as italic
                        const italicText = italicPart.slice(1, -1);
                        return <em key={`${lineIndex}-${partIndex}-${italicIndex}`} className="italic text-theme-text">{italicText}</em>;
                    }
                    return italicPart;
                });
            });

            // Add line break after each line except the last one
            if (lineIndex < lines.length - 1) {
                return (
                    <span key={lineIndex}>
                        {parsedLine}
                        <br />
                    </span>
                );
            }

            return <span key={lineIndex}>{parsedLine}</span>;
        });
    };

    useEffect(() => {
        if (!article) return;

        // Reset the animation when language changes
        setDisplayedTitle('');

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < article.title.length) {
                setDisplayedTitle(article.title.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [article, language]);

    if (!article) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="w-full px-4 py-12 md:py-20 max-w-[900px] mx-auto">
            {/* Back button */}
            <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-theme-overlay hover:text-theme-peach transition-colors text-sm mb-8 group"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{language === 'en' ? "back to blog" : "volver al blog"}</span>
            </Link>

            <article>
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-text mb-4">
                        {displayedTitle}
                        <span className="animate-blink">|</span>
                    </h1>
                    <div className="flex items-center gap-4 text-sm">
                        <time className="text-theme-overlay">
                            {new Date(article.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <span className="text-theme-overlay">•</span>
                        <span className="text-theme-mauve text-xs uppercase tracking-wide font-semibold">
                            {(() => {
                                // Calculate read time based on word count (200 words per minute)
                                const wordCount = article.content
                                    .filter(b => b.type === 'text')
                                    .reduce((total, block) => {
                                        const words = block.value.split(/\s+/).length;
                                        return total + words;
                                    }, 0);
                                const readTime = Math.max(1, Math.ceil(wordCount / 200));
                                return `${readTime} ${language === 'en' ? 'min read' : 'min de lectura'}`;
                            })()}
                        </span>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                    {article.content.map((block, index) => {
                        switch (block.type) {
                            case 'text':
                                return (
                                    <p key={index} className="text-theme-overlay leading-relaxed mb-6 text-base md:text-lg">
                                        {parseTextContent(block.value)}
                                    </p>
                                );
                            case 'heading':
                                return (
                                    <h2 key={index} className="text-2xl md:text-3xl font-bold text-theme-text mt-12 mb-6 flex items-center gap-3">
                                        <span className="text-theme-mauve">#</span>
                                        <span>{block.value}</span>
                                    </h2>
                                );
                            case 'code':
                                return (
                                    <div key={index} className="my-8">
                                        <CodeViewer
                                            code={block.value}
                                            language={block.language || 'text'}
                                        />
                                    </div>
                                );
                            case 'image':
                                return (
                                    <figure key={index} className="my-10">
                                        <div className="glass-tile p-4">
                                            <img
                                                src={block.src}
                                                alt={block.alt || ''}
                                                className="w-full rounded-lg"
                                            />
                                        </div>
                                        {block.alt && (
                                            <figcaption className="text-sm text-theme-overlay mt-3 text-center italic">
                                                {block.alt}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            case 'sources':
                                return (
                                    <div key={index} className="mt-16 pt-8 border-t border-theme-overlay/20">
                                        <h2 className="text-2xl md:text-3xl font-bold text-theme-text mb-6 flex items-center gap-3">
                                            <span className="text-theme-blue">📚</span>
                                            <span>{language === 'en' ? 'Sources & Further Reading' : 'Fuentes y Lectura Adicional'}</span>
                                        </h2>
                                        <ul className="space-y-3">
                                            {block.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="glass-tile p-4 inline-flex items-center gap-3 group hover:border-theme-blue/50"
                                                    >
                                                        <span className="text-theme-mauve group-hover:translate-x-1 transition-transform">→</span>
                                                        <span className="text-theme-text group-hover:text-theme-blue transition-colors">{link.title}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </article>

            {/* Bottom back button */}
            <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-theme-overlay hover:text-theme-peach transition-colors text-sm mt-12 group"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{language === 'en' ? "back to blog" : "volver al blog"}</span>
            </Link>
        </div>
    );
};

export default BlogArticle;
