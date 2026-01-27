
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import blogDataRaw from '../data/blog.json';
import type { BlogData } from '../types';
import { motion } from 'framer-motion';

const blogData = blogDataRaw as BlogData;

const BlogPage = () => {
    const { language } = useApp();
    const articles = [...blogData[language].articles].reverse();

    return (
        <div className="w-full px-4 py-12 md:py-20 max-w-[1400px] mx-auto">
            {/* Back button */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-theme-overlay hover:text-theme-peach transition-colors text-sm mb-8 group"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>{language === 'en' ? 'back to portfolio' : 'volver al portafolio'}</span>
            </Link>

            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                    <span className="gradient-text">Blog</span>
                </h1>
                <p className="text-theme-overlay text-base md:text-lg max-w-3xl">
                    {language === 'en'
                        ? "Thoughts, tips, and learnings about Salesforce development and other things that I would've liked to know earlier."
                        : "Pensamientos, tips y aprendizajes sobre desarrollo Salesforce y otros temas que hubiera querido saber antes."}
                </p>
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                {articles.map((article, idx) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: idx * 0.1,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    >
                        <Link
                            to={`/blog/${article.id}`}
                            className="glass-tile p-6 flex flex-col gap-4 h-full group block"
                        >
                            {/* Date badge */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-theme-overlay">
                                    {new Date(article.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                                <svg className="w-4 h-4 text-theme-mauve opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>

                            {/* Title */}
                            <h2 className="text-lg md:text-xl font-bold text-theme-text group-hover:text-theme-mauve transition-colors">
                                {article.title}
                            </h2>

                            {/* Summary */}
                            <p className="text-sm text-theme-overlay leading-relaxed line-clamp-4 flex-grow">
                                {article.summary}
                            </p>

                            {/* Read more */}
                            <div className="flex items-center gap-2 text-sm text-theme-blue group-hover:text-theme-mauve transition-colors mt-auto">
                                <span>{language === 'en' ? 'Read article' : 'Leer artículo'}</span>
                                <span>→</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
