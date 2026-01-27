import { useApp } from '../context/AppContext';
import BentoTile from './BentoTile';

const CertificationsSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={1} delay={0.25}>
            <div className="flex flex-col gap-6 h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-theme-text">
                    {content.ui.certificationsTitle}
                </h2>
                <div className="flex flex-col gap-6">
                    {content.certifications.sections.map((section, sectionIdx) => (
                        <div key={sectionIdx} className="flex flex-col gap-3">
                            <h3 className="text-sm font-semibold text-theme-mauve uppercase tracking-wide">
                                {section.title}
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {section.items.map((cert, certIdx) => (
                                    <li
                                        key={certIdx}
                                        className="text-sm md:text-base text-theme-text hover:text-theme-mauve transition-colors flex items-start gap-2"
                                    >
                                        <svg
                                            className="w-5 h-5 text-theme-green flex-shrink-0 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2.5}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="flex-1">{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </BentoTile>
    );
};

export default CertificationsSection;
