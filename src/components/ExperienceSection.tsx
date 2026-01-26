
import { useApp } from '../context/AppContext';
import BentoTile from './BentoTile';

const ExperienceSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={6} rowSpan={1} delay={0.3}>
            <div className="flex flex-col gap-6 h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-theme-text">
                    {content.ui.experienceTitle}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.experience.map((exp, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col gap-2 p-4 rounded-lg bg-theme-surface/30 border border-theme-overlay/10 hover:border-theme-blue/30 hover:bg-theme-surface/50 transition-all duration-300 group"
                        >
                            <div className="flex flex-col gap-1">
                                <h3 className="text-sm md:text-base font-semibold text-theme-text group-hover:text-theme-mauve transition-colors">
                                    {exp.company}
                                </h3>
                                <p className="text-xs md:text-sm text-theme-blue font-mono">
                                    {exp.role}
                                </p>
                                <p className="text-xs text-theme-overlay">
                                    {exp.period}
                                </p>
                            </div>
                            <p className="text-xs text-theme-overlay leading-relaxed line-clamp-3">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </BentoTile>
    );
};

export default ExperienceSection;
