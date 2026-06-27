import { useApp } from '../hooks/useApp';
import BentoTile from './BentoTile';

const ExperienceSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={4} delay={0.3} className="!p-0 overflow-hidden">
            {/* Header bar */}
            <div className="px-5 py-3 border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-panel)' }}>
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-0.5">
                    MISSION LOG // ミッションログ
                </p>
                <h2 className="terminal-heading text-base md:text-lg tracking-widest">
                    [ {content.ui.experienceTitle.toUpperCase()} // {content.ui.experienceSubLabel} ]
                </h2>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-0 relative px-5 py-5 overflow-y-auto">
                {/* Spine */}
                <div className="absolute left-[2.35rem] top-5 bottom-5 w-px"
                    style={{ background: 'var(--bb-amber)', boxShadow: '0 0 4px rgba(255,176,0,0.4)' }} />

                {content.experience.map((exp, idx) => (
                    <div key={idx} className="flex gap-4 group relative mb-5 last:mb-0">
                        {/* Diamond dot on spine */}
                        <div className="absolute left-[1.95rem] top-1.5 z-10 flex-shrink-0">
                            <div className="w-3 h-3 rotate-45 transition-all duration-300 group-hover:scale-125"
                                style={{ background: 'var(--bb-amber)', boxShadow: '0 0 5px rgba(255,176,0,0.6)' }} />
                        </div>

                        {/* Spacer for spine */}
                        <div className="w-8 flex-shrink-0" />

                        {/* Content card */}
                        <div className="flex-1 border border-[var(--bb-border)] p-3 transition-all duration-200 group-hover:border-[var(--bb-amber)]"
                            style={{ background: 'var(--bb-panel)', clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}>

                            <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="font-mono text-base font-bold tracking-wide"
                                    style={{ color: 'var(--bb-cyan)' }}>
                                    &gt; {exp.company.toUpperCase()}
                                </h3>
                                <span className="font-terminal text-sm text-[var(--bb-dim)] text-right tracking-widest flex-shrink-0 whitespace-nowrap">
                                    [{exp.period.replace(' - ', '–')}]
                                </span>
                            </div>

                            <p className="font-terminal text-base tracking-wide mb-2"
                                style={{ color: 'var(--bb-amber)' }}>
                                {exp.role}
                            </p>

                            <p className="font-mono text-sm text-[var(--bb-dim)] leading-relaxed">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </BentoTile>
    );
};

export default ExperienceSection;
