
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
    const [hasTyped, setHasTyped] = useState(false);

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
        if (!article || hasTyped) return;

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < article.title.length) {
                setDisplayedTitle(article.title.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
                setHasTyped(true);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [article, hasTyped]);

    if (!article) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="w-full px-6 py-20">
            <Link
                to="/blog"
                className="text-theme-overlay hover:text-theme-peach transition-colors text-sm mb-8 inline-block"
            >
                {language === 'en' ? "← back to blog" : "← volver al blog"}
            </Link>

            <article>
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-theme-text mb-4">
                        {displayedTitle}
                        <span className="animate-blink">|</span>
                    </h1>
                    <time className="text-theme-overlay text-sm">
                        {new Date(article.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </header>

                <div className="prose prose-invert max-w-none">
                    {article.content.map((block, index) => {
                        switch (block.type) {
                            case 'text':
                                return (
                                    <p key={index} className="text-theme-overlay leading-relaxed mb-6">
                                        {parseTextContent(block.value)}
                                    </p>
                                );
                            case 'heading':
                                return (
                                    <h2 key={index} className="text-2xl font-bold text-theme-blue mt-12 mb-4">
                                        {block.value}
                                    </h2>
                                );
                            case 'code':
                                return (
                                    <CodeViewer
                                        key={index}
                                        code={block.value}
                                        language={block.language || 'text'}
                                    />
                                );
                            case 'image':
                                return (
                                    <figure key={index} className="my-8">
                                        <img
                                            src={block.src}
                                            alt={block.alt || ''}
                                            className="w-full rounded-lg border border-theme-overlay/20"
                                        />
                                        {block.alt && (
                                            <figcaption className="text-sm text-theme-overlay/60 mt-2 text-center">
                                                {block.alt}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            case 'sources':
                                return (
                                    <div key={index} className="mt-12 pt-8 border-t border-theme-overlay/20">
                                        <h2 className="text-2xl font-bold text-theme-blue mb-4">
                                            {language === 'en' ? 'Sources & Further Reading' : 'Fuentes y Lectura Adicional'}
                                        </h2>
                                        <ul className="space-y-3">
                                            {block.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-theme-peach hover:text-theme-blue transition-colors inline-flex items-center gap-2"
                                                    >
                                                        <span>→</span>
                                                        <span>{link.title}</span>
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

            <Link
                to="/blog"
                className="text-theme-overlay hover:text-theme-peach transition-colors text-sm mt-8 inline-block"
            >
                {language === 'en' ? "← back to blog" : "← volver al blog"}
            </Link>
        </div>
    );
};

export default BlogArticle;
