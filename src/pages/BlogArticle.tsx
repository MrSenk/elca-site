import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import blogDataRaw from '../data/blog.json';
import type { BlogData } from '../types';
import CodeViewer from '../components/CodeViewer';
import { useTypingEffect } from '../hooks/useTypingEffect';

const blogData = blogDataRaw as BlogData;

const BlogArticle = () => {
    const { id } = useParams<{ id: string }>();
    const { language, content } = useApp();
    const article = blogData[language].articles.find(a => a.id === id);
    const displayedTitle = useTypingEffect(article?.title ?? '', 50);

    const parseTextContent = (text: string) => {
        const lines = text.split('\n');
        return lines.map((line, lineIndex) => {
            const boldParts = line.split(/(\*\*.*?\*\*)/g);
            const parsedLine = boldParts.map((part, partIndex) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <strong key={`${lineIndex}-${partIndex}`}
                            style={{ color: 'var(--bb-amber)', fontWeight: 'bold' }}>
                            {part.slice(2, -2)}
                        </strong>
                    );
                }
                const italicParts = part.split(/(\*[^*]+\*)/g);
                return italicParts.map((italicPart, italicIndex) => {
                    if (italicPart.startsWith('*') && italicPart.endsWith('*') && italicPart.length > 2) {
                        return (
                            <em key={`${lineIndex}-${partIndex}-${italicIndex}`}
                                style={{ color: 'var(--bb-cyan)', fontStyle: 'italic' }}>
                                {italicPart.slice(1, -1)}
                            </em>
                        );
                    }
                    return italicPart;
                });
            });
            if (lineIndex < lines.length - 1) {
                return <span key={lineIndex}>{parsedLine}<br /></span>;
            }
            return <span key={lineIndex}>{parsedLine}</span>;
        });
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    if (!article) return <Navigate to="/blog" replace />;

    const wordCount = article.content
        .filter(b => b.type === 'text')
        .reduce((total, block) => total + block.value.split(/\s+/).length, 0);
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="w-full px-4 py-8 md:py-12 max-w-[900px] mx-auto">
            {/* Back */}
            <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-terminal text-sm text-[var(--bb-dim)] hover:text-[var(--bb-amber)] transition-colors mb-8 tracking-widest"
            >
                &lt; {content.ui.blogReturnToArchives}
            </Link>

            <article>
                {/* Article header */}
                <header className="mb-10 pb-6 border-b border-[var(--bb-border)]">
                    <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-3">
                        INTELLIGENCE REPORT // レポート
                    </p>
                    <h1 className="font-display font-black tracking-wider mb-4"
                        style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
                            color: 'var(--bb-amber)',
                            textShadow: '2px 0 0 rgba(223,32,32,0.7), -2px 0 0 rgba(0,240,255,0.7)',
                            filter: 'drop-shadow(0 0 8px rgba(255,176,0,0.35))',
                            lineHeight: 1.15,
                        }}>
                        {displayedTitle}
                        <span className="animate-blink" style={{ color: 'var(--bb-amber)' }}>_</span>
                    </h1>

                    <div className="flex items-center gap-4 flex-wrap">
                        <time className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest">
                            [{formatDate(article.date).toUpperCase()}]
                        </time>
                        <span className="font-terminal text-[var(--bb-border)]">|</span>
                        <span className="font-terminal text-xs tracking-widest"
                            style={{ color: 'var(--bb-cyan)' }}>
                            {readTime} {content.ui.minRead}
                        </span>
                    </div>
                </header>

                {/* Content blocks */}
                <div className="flex flex-col gap-6">
                    {article.content.map((block, index) => {
                        const key = `${block.type}-${index}`;
                        switch (block.type) {
                            case 'text':
                                return (
                                    <p key={key} className="font-mono text-sm md:text-base text-[var(--bb-text)] leading-relaxed">
                                        {parseTextContent(block.value)}
                                    </p>
                                );
                            case 'heading':
                                return (
                                    <h2 key={key} className="font-display font-bold tracking-widest mt-8 mb-2 flex items-center gap-3"
                                        style={{
                                            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                                            color: 'var(--bb-text)',
                                        }}>
                                        <span className="font-terminal" style={{ color: 'var(--bb-cyan)', filter: 'drop-shadow(0 0 4px rgba(0,240,255,0.5))' }}>##</span>
                                        <span>{block.value}</span>
                                    </h2>
                                );
                            case 'code':
                                return (
                                    <div key={key} className="my-4">
                                        <CodeViewer code={block.value} language={block.language || 'text'} />
                                    </div>
                                );
                            case 'image':
                                return (
                                    <figure key={key} className="my-6">
                                        <div className="panel-tile p-3" style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                                            <img src={block.src} alt={block.alt || ''} className="w-full" />
                                        </div>
                                        {block.alt && (
                                            <figcaption className="font-terminal text-xs text-[var(--bb-dim)] mt-2 text-center tracking-widest">
                                                // {block.alt}
                                            </figcaption>
                                        )}
                                    </figure>
                                );
                            case 'sources':
                                return (
                                    <div key={key} className="mt-12 pt-6 border-t border-[var(--bb-border)]">
                                        <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-2">
                                            INTEL SOURCES // 情報源
                                        </p>
                                        <h2 className="terminal-heading text-base md:text-lg tracking-widest mb-5">
                                            [ {language === 'en' ? 'SOURCES & FURTHER READING' : 'FUENTES Y LECTURA ADICIONAL'} ]
                                        </h2>

                                        <ul className="flex flex-col gap-3">
                                            {block.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <a
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-3 border border-[var(--bb-border)] px-4 py-2 font-mono text-sm text-[var(--bb-text)] hover:border-[var(--bb-amber)] hover:text-[var(--bb-amber)] transition-all group"
                                                        style={{ background: 'var(--bb-panel)' }}
                                                    >
                                                        <span className="text-[var(--bb-cyan)] group-hover:text-[var(--bb-amber)] transition-colors">&gt;&gt;</span>
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

            {/* Bottom back */}
            <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-terminal text-sm text-[var(--bb-dim)] hover:text-[var(--bb-amber)] transition-colors mt-12 tracking-widest"
            >
                &lt; {content.ui.blogReturnToArchives}
            </Link>
        </div>
    );
};

export default BlogArticle;
