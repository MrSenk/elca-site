import { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { Link } from 'react-router-dom';
import BentoTile from './BentoTile';
import { useTypingEffect } from '../hooks/useTypingEffect';

const RECORD_ID = '7743-C';

const HeroSection = () => {
    const { content } = useApp();
    const [nameTyped, setNameTyped] = useState(false);
    const displayedName = useTypingEffect(content.profile.name.toUpperCase(), 55, () => setNameTyped(true));
    const displayedRole = useTypingEffect(nameTyped ? content.profile.role : '', 75);

    const imgSrc = `${import.meta.env.BASE_URL}hehehe.webp`;
    const [clock, setClock] = useState(() => new Date().toUTCString().replace('GMT', 'UTC'));
    useEffect(() => {
        const id = setInterval(() => setClock(new Date().toUTCString().replace('GMT', 'UTC')), 1000);
        return () => clearInterval(id);
    }, []);

    const statusColor: Record<string, string> = {
        ACTIVE: 'var(--bb-cyan)',
        CLASSIFIED: 'var(--bb-red)',
        ARCHIVED: 'var(--bb-dim)',
    };

    return (
        <BentoTile colSpan={6} rowSpan={2} className="relative overflow-hidden !p-0" delay={0}>
            {/* Terminal top bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-panel)' }}>
                <span className="font-terminal text-[var(--bb-dim)] text-sm tracking-widest">
                    BOUNTY NETWORK v2.1 // RED DRAGON CONSORTIUM
                </span>
                <span className="font-terminal text-[var(--bb-dim)] text-xs hidden md:block tracking-widest">
                    {clock}
                </span>
            </div>

            {/* Section label */}
            <div className="px-6 pt-4 pb-1">
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] uppercase mb-1">
                    SUBJECT PROFILE // 対象者プロファイル
                </p>
                <h2 className="terminal-heading text-lg md:text-xl tracking-widest">
                    [ RECORD {RECORD_ID} // {content.ui.heroSubLabel} ]
                </h2>
            </div>

            {/* Main content grid */}
            <div className="relative flex flex-col lg:flex-row gap-6 px-6 pb-6 pt-4">

                {/* LEFT — Terminal data */}
                <div className="flex-1 min-w-0 flex flex-col gap-5">

                    {/* Retrieval prompt + name */}
                    <div>
                        <p className="font-terminal text-[var(--bb-dim)] text-base mb-1">
                            <span className="text-[var(--bb-cyan)]">&gt;</span> {content.greeting}... {content.ui.heroRetrieving}
                        </p>

                        <h1 className="font-display font-black tracking-wider leading-none"
                            style={{
                                fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                                color: 'var(--bb-amber)',
                                textShadow: '2px 0 0 rgba(223,32,32,0.7), -2px 0 0 rgba(0,240,255,0.7)',
                                filter: 'drop-shadow(0 0 10px rgba(255,176,0,0.4))',
                            }}>
                            {displayedName}
                            {!nameTyped && <span className="animate-blink text-[var(--bb-amber)]">_</span>}
                        </h1>

                        <div className="mt-2 flex items-center gap-2 font-terminal text-xl md:text-2xl"
                            style={{ color: 'var(--bb-cyan)', filter: 'drop-shadow(0 0 4px rgba(0,240,255,0.5))' }}>
                            <span className="text-[var(--bb-dim)]">──</span>
                            <span>{displayedRole}</span>
                            {nameTyped && <span className="animate-blink">_</span>}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                        <span className="font-terminal text-[var(--bb-dim)] text-sm tracking-widest">LOC:</span>
                        <span className="font-terminal text-[var(--bb-text)] text-base tracking-widest">
                            {content.profile.location.toUpperCase()}
                        </span>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3 max-w-xs">
                        {content.profile.stats.map((stat, idx) => (
                            <div key={idx} className="border border-[var(--bb-border)] p-3"
                                style={{ background: 'var(--bb-panel)' }}>
                                <div className="font-display font-bold text-2xl md:text-3xl"
                                    style={{ color: 'var(--bb-amber)', filter: 'drop-shadow(0 0 6px rgba(255,176,0,0.4))' }}>
                                    [{stat.value}]
                                </div>
                                <div className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest uppercase mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Blog CTA */}
                    <div className="mt-auto">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-5 py-2 font-terminal text-lg tracking-widest transition-all"
                            style={{
                                border: '1px solid var(--bb-amber)',
                                color: 'var(--bb-amber)',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,176,0,0.08)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(255,176,0,0.25)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = '';
                                (e.currentTarget as HTMLElement).style.boxShadow = '';
                            }}
                        >
                            [ &gt;&gt; {content.ui.heroBlogCta} // {content.ui.blogLink.toUpperCase()} ]
                        </Link>
                    </div>
                </div>

                {/* RIGHT — Dossier photo panel */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3 lg:w-64 xl:w-80">
                    {/* Photo frame */}
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-full lg:h-72 overflow-hidden border border-[var(--bb-border)] group"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)' }}>
                        {/* Corner mark */}
                        <div className="absolute top-0 right-0 w-[14px] h-[14px] pointer-events-none z-10"
                            style={{ borderTop: '1px solid var(--bb-amber)', borderRight: '1px solid var(--bb-amber)' }} />

                        <img
                            src={imgSrc}
                            alt={content.profile.name}
                            className="glitch-photo w-full h-full object-cover"
                        />
                        <div className="glitch-slice glitch-slice-1" style={{ backgroundImage: `url(${imgSrc})` }} />
                        <div className="glitch-slice glitch-slice-2" style={{ backgroundImage: `url(${imgSrc})` }} />
                        <div className="glitch-slice glitch-slice-3" style={{ backgroundImage: `url(${imgSrc})` }} />
                        <div className="glitch-slice glitch-slice-4" style={{ backgroundImage: `url(${imgSrc})` }} />
                        <div className="glitch-slice glitch-slice-5" style={{ backgroundImage: `url(${imgSrc})` }} />
                        <div className="glitch-slice glitch-slice-6" style={{ backgroundImage: `url(${imgSrc})` }} />

                        {/* Scan line overlay on photo */}
                        <div className="absolute inset-0 pointer-events-none opacity-20"
                            style={{ background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)' }} />
                    </div>

                    {/* Photo metadata */}
                    <div className="w-full border border-[var(--bb-border)] px-3 py-2"
                        style={{ background: 'var(--bb-panel)' }}>
                        <div className="flex items-center justify-between">
                            <span className="font-terminal text-xs tracking-widest"
                                style={{ color: statusColor['ACTIVE'], filter: 'drop-shadow(0 0 4px currentColor)' }}>
                                ● {content.ui.heroIdentityConfirmed}
                            </span>
                        </div>
                        <div className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest mt-1">
                            STATUS: <span style={{ color: 'var(--bb-cyan)' }}>{content.ui.heroStatusActive}</span>
                        </div>
                    </div>

                    {/* Barcode decoration */}
                    <div className="w-full flex flex-col items-center gap-1 opacity-30">
                        <div className="flex gap-px w-full h-6">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div key={i} className="flex-1"
                                    style={{ background: i % 3 === 0 ? 'var(--bb-amber)' : i % 5 === 0 ? 'transparent' : 'var(--bb-dim)' }} />
                            ))}
                        </div>
                        <span className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest">
                            {RECORD_ID}-{content.profile.name.replace(' ', '-').toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom status strip */}
            <div className="px-6 py-2 border-t border-[var(--bb-border)] flex items-center gap-6"
                style={{ background: 'var(--bb-panel)' }}>
                <span className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest">
                    SECTOR: SALESFORCE CLOUD // CLEARANCE: LVL-5
                </span>
                <span className="font-terminal text-xs tracking-widest hidden sm:block"
                    style={{ color: 'var(--bb-amber)' }}>
                    ████████░░ 80% OPERATIONAL
                </span>
            </div>
        </BentoTile>
    );
};

export default HeroSection;
