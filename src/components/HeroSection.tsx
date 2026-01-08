
import { useApp } from '../context/AppContext';

const HeroSection = () => {
    const { content } = useApp();

    return (
        <section className="flex flex-col gap-8 justify-center min-h-[30vh]">
            <div className="flex flex-col gap-2">
                <span className="text-theme-peach text-sm">{content.greeting}</span>
                <h2 className="text-3xl md:text-5xl font-bold text-theme-text">
                    {content.profile.role}
                </h2>
                <p className="text-theme-overlay text-lg">
                    {content.profile.location}
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                {content.profile.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col gap-1 group">
                        <span className="text-4xl md:text-5xl font-bold text-theme-peach group-hover:drop-shadow-[0_0_10px_rgba(250,179,135,0.3)] transition-all">
                            {stat.value}
                        </span>
                        <span className="text-sm text-theme-overlay group-hover:text-theme-blue transition-colors">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
            <a
                href="/blog"
                className="text-theme-peach hover:text-theme-red underline underline-offset-4 decoration-2 text-lg font-medium mt-6 inline-block cursor-pointer transition-colors"
            >
                → {content.ui.blogLink}
            </a>
        </section>
    );
};

export default HeroSection;
