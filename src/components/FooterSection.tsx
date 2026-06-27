import { useApp } from '../hooks/useApp';

const FooterSection = () => {
    const { content } = useApp();

    return (
        <footer className="mt-8 border-t border-[var(--bb-border)]" style={{ background: 'var(--bb-panel)' }}>
            {/* HUD status bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-3 border-b border-[var(--bb-border)]">
                <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest">
                        COORDS: -38.74°N, -72.59°W
                    </span>
                    <span className="hidden sm:block text-[var(--bb-border)] font-terminal">|</span>
                    <div className="flex items-center gap-2">
                        <span className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest">SIGNAL:</span>
                        <div className="flex gap-px">
                            {[1, 1, 1, 0.5, 0.2].map((o, i) => (
                                <div key={i} className="w-2 h-3"
                                    style={{ background: 'var(--bb-amber)', opacity: o, boxShadow: '0 0 3px rgba(255,176,0,0.4)' }} />
                            ))}
                        </div>
                        <span className="font-terminal text-[var(--bb-amber)] text-xs">66%</span>
                    </div>
                </div>

                {/* LinkedIn link */}
                <a
                    href="https://www.linkedin.com/in/camilocuevasn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-terminal text-xs tracking-widest text-[var(--bb-dim)] hover:text-[var(--bb-amber)] transition-colors group"
                >
                    <span className="group-hover:text-[var(--bb-amber)] transition-colors">[COMMS]</span>
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>linkedin.com/in/camilocuevasn</span>
                </a>
            </div>

            {/* Copyright */}
            <div className="px-5 py-2">
                <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest text-center">
                    {content.footer.toUpperCase()} // {content.ui.footerAllSystems}
                </p>
            </div>
        </footer>
    );
};

export default FooterSection;
