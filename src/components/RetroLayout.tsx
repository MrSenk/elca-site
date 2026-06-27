const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='200' height='200' filter='url(#noise)' opacity='1'/></svg>`;
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

interface RetroLayoutProps {
    children: React.ReactNode;
}

const RetroLayout = ({ children }: RetroLayoutProps) => {
    return (
        <div className="relative min-h-screen" style={{ isolation: 'isolate' }}>
            {/* Flicker wrapper — the main content breathes subtly */}
            <div className="animate-flicker">
                {children}
            </div>

            {/* CRT Scanlines — stationary horizontal dark lines */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0"
                style={{
                    zIndex: 90,
                    background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 3px)',
                    opacity: 0.6,
                }}
            />

            {/* CRT Vignette — darkens screen edges like a phosphor tube */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0"
                style={{
                    zIndex: 91,
                    background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)',
                }}
            />

            {/* Film Grain — animated SVG noise texture */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 animate-grain"
                style={{
                    zIndex: 92,
                    willChange: 'transform',
                    backgroundImage: GRAIN_URL,
                    backgroundSize: '200px 200px',
                    opacity: 0.05,
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    );
};

export default RetroLayout;
