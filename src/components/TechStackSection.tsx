import { useApp } from '../hooks/useApp';
import BentoTile from './BentoTile';
import { motion } from 'framer-motion';

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

            <div className="flex flex-col p-3">
                {content.tech.map((tech, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.07, duration: 0.3, ease: 'easeOut' }}
                        className="group flex items-start gap-3 px-2 py-2 border-l-2 border-transparent
                                   hover:border-[var(--bb-amber)] transition-all duration-150 cursor-default"
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,176,0,0.04)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                    >
                        <span className="font-terminal text-[var(--bb-dim)] text-sm flex-shrink-0 mt-px
                                         group-hover:text-[var(--bb-amber)] transition-colors">
                            ◆
                        </span>
                        <span className="font-terminal text-sm text-[var(--bb-text)] tracking-wide leading-snug
                                         group-hover:text-[var(--bb-amber)] transition-colors">
                            {tech}
                        </span>
                    </motion.div>
                ))}
            </div>
        </BentoTile>
    );
};

export default TechStackSection;
