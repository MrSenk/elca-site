import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import blogDataRaw from '../data/blog.json';
import type { BlogData } from '../types';
import { motion } from 'framer-motion';

const blogData = blogDataRaw as BlogData;

const BlogPage = () => {
    const { language, content } = useApp();
    const articles = [...blogData[language].articles].reverse();

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `[${y}.${m}.${day}]`;
    };

    return (
        <div className="w-full px-4 py-8 md:py-12 max-w-[1400px] mx-auto">
            {/* Back button */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 font-terminal text-sm text-[var(--bb-dim)] hover:text-[var(--bb-amber)] transition-colors mb-8 tracking-widest"
            >
                <span>&lt; {content.ui.blogReturnToBase}</span>
            </Link>

            {/* Header */}
            <div className="mb-10 border-b border-[var(--bb-border)] pb-6">
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-2">
                    INTELLIGENCE ARCHIVES // 情報アーカイブ
                </p>
                <h1 className="terminal-heading text-3xl md:text-4xl lg:text-5xl tracking-widest mb-4">
                    [ BLOG // {content.ui.heroBlogCta} ]
                </h1>
                <p className="font-mono text-sm text-[var(--bb-dim)] max-w-2xl leading-relaxed">
                    <span className="text-[var(--bb-cyan)]">&gt; </span>
                    {language === 'en'
                        ? "Thoughts, tips, and learnings about Salesforce development and other things that I would've liked to know earlier."
                        : "Pensamientos, tips y aprendizajes sobre desarrollo Salesforce y otros temas que hubiera querido saber antes."}
                </p>
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest mt-3">
                    {articles.length} {content.ui.projectsRecordsFound} // RESULT_SET: {articles.length}
                </p>
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, idx) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <Link
                            to={`/blog/${article.id}`}
                            className="flex flex-col gap-4 h-full group block border border-[var(--bb-border)] p-5 hover:border-[var(--bb-amber)] transition-all duration-200"
                            style={{
                                background: 'var(--bb-rust)',
                                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(255,176,0,0.1)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.boxShadow = '';
                            }}
                        >
                            {/* Date + arrow */}
                            <div className="flex items-center justify-between">
                                <span className="font-terminal text-xs text-[var(--bb-dim)] tracking-widest">
                                    {formatDate(article.date)}
                                </span>
                                <span className="font-terminal text-[var(--bb-amber)] opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                                    &gt;&gt;
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="font-mono text-base md:text-lg font-bold text-[var(--bb-text)] group-hover:text-[var(--bb-amber)] transition-colors leading-snug">
                                {article.title}
                            </h2>

                            {/* Summary */}
                            <p className="font-mono text-xs text-[var(--bb-dim)] leading-relaxed line-clamp-4 flex-grow">
                                {article.summary}
                            </p>

                            {/* Read more */}
                            <div className="flex items-center gap-2 font-terminal text-sm text-[var(--bb-cyan)] group-hover:text-[var(--bb-amber)] transition-colors mt-auto tracking-widest"
                                style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}>
                                [ {content.ui.blogOpenFile} ]
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
