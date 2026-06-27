import { useApp } from '../hooks/useApp';
import BentoTile from './BentoTile';

const AboutSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={1} delay={0.1} className="!p-0 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3 border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-panel)' }}>
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-0.5">
                    ABOUT.TXT // プロファイル
                </p>
                <h2 className="terminal-heading text-base md:text-lg tracking-widest">
                    [ {content.ui.aboutMeTitle.toUpperCase()} // {content.ui.aboutSubLabel} ]
                </h2>
            </div>

            <div className="p-5">
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest mb-3">
                    <span className="text-[var(--bb-cyan)]">&gt;</span> {content.ui.aboutReading}
                </p>
                <p className="font-mono text-sm text-[var(--bb-text)] leading-relaxed">
                    {content.aboutMe}
                </p>
                <div className="mt-4 border-t border-[var(--bb-border)] pt-3">
                    <span className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest">
                        [EOF] // {content.aboutMe.split(' ').length} {content.ui.aboutWordsDecoded}
                    </span>
                </div>
            </div>
        </BentoTile>
    );
};

export default AboutSection;
