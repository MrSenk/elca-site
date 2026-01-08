
import { useApp } from '../context/AppContext';

const ExperienceSection = () => {
    const { content } = useApp();

    return (
        <section id="experience" className="flex flex-col gap-8">
            <h3 className="text-2xl text-theme-blue font-bold">{content.ui.experienceTitle}</h3>

            <div className="flex flex-col gap-10 border-l-2 border-theme-overlay/40 dark:border-theme-overlay/20 ml-2 pl-8 relative">
                {content.experience.map((exp, idx) => (
                    <div key={idx} className="flex flex-col gap-2 relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full bg-theme-base border-2 border-theme-peach"></div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                            <span className="text-xl text-theme-peach font-bold">{exp.company}</span>
                            <span className="text-theme-overlay text-sm">{exp.period}</span>
                        </div>
                        <h4 className="text-theme-text font-medium">{exp.role}</h4>
                        <p className="text-theme-overlay max-w-2xl leading-relaxed mt-2">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;
