
import { useApp } from '../context/AppContext';

const CertificationsSection = () => {
    const { content } = useApp();

    return (
        <section id="certifications" className="flex flex-col gap-8">
            <h3 className="text-2xl text-theme-blue font-bold">{content.ui.certificationsTitle}</h3>

            {content.certifications.sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="flex flex-col gap-4">
                    <h4 className="text-lg text-theme-peach font-semibold">{section.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.items.map((cert, idx) => (
                            <div
                                key={idx}
                                className="p-4 border border-theme-overlay dark:border-theme-overlay/20 hover:border-theme-blue/50 hover:bg-theme-overlay/5 hover:text-theme-blue transition-all duration-300 cursor-default rounded text-sm text-theme-text"
                            >
                                [ {cert} ]
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CertificationsSection;
