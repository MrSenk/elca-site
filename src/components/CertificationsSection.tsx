import { useApp } from '../hooks/useApp';
import BentoTile from './BentoTile';

const CertificationsSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={1} delay={0.25} className="!p-0 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3 border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-panel)' }}>
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-0.5">
                    CLEARANCE LEVELS // セキュリティレベル
                </p>
                <h2 className="terminal-heading text-base md:text-lg tracking-widest">
                    [ {content.ui.certificationsTitle.toUpperCase()} // {content.ui.certificationsSubLabel} ]
                </h2>
            </div>

            <div className="flex flex-col gap-5 p-5">
                {content.certifications.sections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="flex flex-col gap-2">
                        <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.25em] uppercase">
                            -- {section.title} --
                        </p>
                        <ul className="flex flex-col gap-2">
                            {section.items.map((cert, certIdx) => (
                                <li key={certIdx}
                                    className="flex items-start gap-3 group transition-colors">
                                    <span className="terminal-badge flex-shrink-0 mt-0.5">OK</span>
                                    <span className="font-mono text-sm text-[var(--bb-text)] group-hover:text-[var(--bb-amber)] transition-colors leading-snug">
                                        {cert}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </BentoTile>
    );
};

export default CertificationsSection;
