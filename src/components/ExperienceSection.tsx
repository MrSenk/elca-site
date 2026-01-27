
import { useApp } from '../context/AppContext';
import BentoTile from './BentoTile';

const ExperienceSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={4} delay={0.3}>
            <div className="flex flex-col gap-6 h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-theme-text">
                    {content.ui.experienceTitle}
                </h2>

                {/* Timeline layout */}
                <div className="flex flex-col gap-6 relative pl-6">
                    {/* Timeline line */}
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-theme-mauve via-theme-blue to-theme-peach"></div>

                    {content.experience.map((exp, idx) => (
                        <div
                            key={idx}
                            className="flex gap-4 group relative"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[1.8rem] top-1 flex items-start">
                                <div className="w-3 h-3 rounded-full bg-theme-mauve border-2 border-theme-base group-hover:scale-150 group-hover:bg-theme-blue transition-all duration-300 relative z-10"></div>
                            </div>

                            {/* Content card */}
                            <div className="flex-1 p-4 rounded-lg bg-theme-surface/30 border border-theme-overlay hover:border-theme-blue/50 hover:bg-theme-surface/50 transition-all duration-300">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm md:text-base font-semibold text-theme-text group-hover:text-theme-mauve transition-colors">
                                            {exp.company}
                                        </h3>
                                        <p className="text-xs md:text-sm text-theme-blue">
                                            {exp.role}
                                        </p>
                                        <span className="text-xs text-theme-overlay">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-xs text-theme-overlay leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BentoTile>
    );
};

export default ExperienceSection;
