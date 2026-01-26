
import { useApp } from '../context/AppContext';
import BentoTile from './BentoTile';

const CertificationsSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={2} rowSpan={1} delay={0.25}>
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
                                        className="text-xs md:text-sm text-theme-overlay hover:text-theme-text transition-colors flex items-start gap-2"
                                    >
                                        <span className="text-theme-green mt-1">✓</span>
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
