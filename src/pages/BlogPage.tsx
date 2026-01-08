
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import blogDataRaw from '../data/blog.json';
import type { BlogData } from '../types';

const blogData = blogDataRaw as BlogData;

const BlogPage = () => {
    const { language } = useApp();
    const articles = [...blogData[language].articles].reverse();

    return (
        <div className="w-full px-6 py-20">
            <Link
                to="/"
                className="text-theme-overlay hover:text-theme-peach transition-colors text-sm mb-8 inline-block"
            >
                ← back to portfolio
            </Link>

            <h1 className="text-4xl font-bold text-theme-text mb-4">Blog</h1>
            <p className="text-theme-overlay mb-12">
                {language === 'en'
                    ? "Thoughts, tips, and learnings about Salesforce development and other things that I would've liked to know earlier."
                    : "Pensamientos, tips y aprendizajes sobre desarrollo Salesforce y otros temas que hubiera querido saber antes."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        to={`/blog/${article.id}`}
                        className="p-6 border border-theme-overlay hover:border-theme-blue/50 hover:bg-theme-overlay/5 hover:text-theme-blue transition-all duration-300 cursor-pointer rounded flex flex-col gap-3"
                    >
                        <h2 className="text-md font-bold text-theme-text">
                            [ {article.title} ]
                        </h2>
                        <p className="text-sm text-theme-overlay line-clamp-5">
                            {article.summary}
                        </p>
                        <span className="text-xs text-theme-text mt-auto">
                            {new Date(article.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
