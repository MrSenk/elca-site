import { useApp } from '../hooks/useApp';
import BentoTile from './BentoTile';
import { motion } from 'framer-motion';

const PROFICIENCY = [92, 88, 85, 82, 80, 78, 75];

const TechStackSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={1} delay={0.2} className="!p-0 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3 border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-panel)' }}>
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-0.5">
                    SHIP DIAGNOSTICS // 船舶診断
                </p>
                <h2 className="terminal-heading text-base md:text-lg tracking-widest">
                    [ {content.ui.techStackTitle.toUpperCase()} // スタック ]
                </h2>
            </div>

            <div className="flex flex-col gap-3 p-5">
                {content.tech.map((tech, idx) => {
                    const pct = PROFICIENCY[idx] ?? Math.max(60, 92 - idx * 6);
                    return (
                        <div key={idx} className="flex flex-col gap-1 group">
                            <div className="flex items-center justify-between">
                                <span className="font-terminal text-sm text-[var(--bb-text)] tracking-wide group-hover:text-[var(--bb-amber)] transition-colors">
                                    <span className="text-[var(--bb-dim)]">SYS:: </span>{tech}
                                </span>
                                <span className="font-terminal text-xs text-[var(--bb-amber)] ml-2 flex-shrink-0">
                                    {pct}%
                                </span>
                            </div>
                            <div className="diag-bar-track">
                                <motion.div
                                    className="diag-bar-fill"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${pct}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: idx * 0.05, ease: 'easeOut' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </BentoTile>
    );
};

export default TechStackSection;
