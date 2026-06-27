import { useApp } from '../hooks/useApp';
import BentoTile from './BentoTile';

const BeyondCodeSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={1} delay={0.4} className="!p-0 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-3 border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-panel)' }}>
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-0.5">
                    PERSONAL_DATA // 個人データ
                </p>
                <h2 className="terminal-heading text-base md:text-lg tracking-widest">
                    [ {content.ui.beyondCodeTitle.toUpperCase()} // {content.ui.beyondCodeSubLabel} ]
                </h2>
            </div>

            <div className="p-5">
                <div className="flex items-start gap-2 mb-3">
                    <span className="font-terminal text-[var(--bb-cyan)] text-base flex-shrink-0">&gt;&gt;</span>
                    <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest">
                        NON-OPERATIONAL ACTIVITIES // {content.ui.beyondCodeActivities}
                    </p>
                </div>
                <p className="font-mono text-sm text-[var(--bb-text)] leading-relaxed">
                    {content.beyondCode}
                </p>
                <div className="mt-4 flex gap-3 flex-wrap">
                    {content.ui.beyondCodeTags.map(tag => (
                        <span key={tag} className="tag-chip">{tag}</span>
                    ))}
                </div>
            </div>
        </BentoTile>
    );
};

export default BeyondCodeSection;
