import { useApp } from '../hooks/useApp';
import BentoTile from './BentoTile';
import { motion, useAnimation } from 'framer-motion';
import type { Project } from '../types';

const STATUS_COLORS: Record<Project['status'], string> = {
    ACTIVE:     'var(--bb-cyan)',
    CLASSIFIED: 'var(--bb-red)',
    ARCHIVED:   'var(--bb-dim)',
};

interface ProjectCardProps {
    project: Project;
    index: number;
    statusLabels: Record<Project['status'], string>;
}

const ProjectCard = ({ project, index, statusLabels }: ProjectCardProps) => {
    const controls = useAnimation();

    const handleHoverStart = () => {
        controls.start({
            x: [-2, 2, -1, 1, 0],
            transition: { duration: 0.25, ease: 'easeInOut' },
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.45 }}
            onHoverStart={handleHoverStart}
            className="flex flex-col border border-[var(--bb-border)] transition-all duration-200 hover:border-[var(--bb-amber)] overflow-hidden"
            style={{
                background: 'var(--bb-panel)',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(255,176,0,0.15)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
            }}
        >
            {/* Card header bar */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-rust)' }}>
                <span className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest">
                    FILE_ID: {project.id}
                </span>
                <span className="font-terminal text-xs tracking-widest"
                    style={{ color: STATUS_COLORS[project.status], filter: `drop-shadow(0 0 3px ${STATUS_COLORS[project.status]})` }}>
                    {statusLabels[project.status]}
                </span>
            </div>

            {/* Satellite image placeholder */}
            <motion.div
                animate={controls}
                className="relative w-full h-28 overflow-hidden border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-rust)' }}>
                {/* Satellite-feed ASCII art fallback */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 select-none"
                    style={{ fontFamily: 'monospace', fontSize: '0.45rem', lineHeight: '0.7rem', color: 'var(--bb-amber)' }}>
                    {Array.from({ length: 12 }).map((_, r) => (
                        <div key={r} className="absolute" style={{ top: `${r * 8}%`, left: 0, right: 0, textAlign: 'center' }}>
                            {'█▓▒░ ░▒▓█▓▒░█▓░ ▒█░▓▒█ ░▓█▒░▓█▒░█▓▒░ ░▒▓█'.slice(r % 10, r % 10 + 40)}
                        </div>
                    ))}
                </div>

                {/* Crosshair target */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-12 h-12 opacity-40">
                        <div className="absolute inset-0 border border-[var(--bb-amber)] rounded-full" />
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--bb-amber)]" style={{ transform: 'translateY(-50%)' }} />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--bb-amber)]" style={{ transform: 'translateX(-50%)' }} />
                    </div>
                </div>

                {/* Scan overlay */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)',
                        filter: 'grayscale(1) contrast(1.2) sepia(0.5) hue-rotate(-10deg)',
                    }} />
            </motion.div>

            {/* Card body */}
            <div className="flex flex-col gap-3 p-4 flex-1">
                <div>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase"
                        style={{ color: 'var(--bb-amber)' }}>
                        {project.title}
                    </h3>
                    <p className="font-terminal text-[var(--bb-dim)] text-sm mt-0.5">
                        {project.subtitle}
                    </p>
                </div>

                <p className="font-mono text-[var(--bb-text)] text-xs leading-relaxed flex-1">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map(tag => (
                        <span key={tag} className="tag-chip">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Status footer */}
                <div className="border-t border-[var(--bb-border)] pt-2 mt-1">
                    <span className="font-terminal text-xs tracking-widest"
                        style={{ color: STATUS_COLORS[project.status] }}>
                        &gt;&gt; {statusLabels[project.status]}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const { content } = useApp();

    const statusLabels: Record<Project['status'], string> = {
        ACTIVE:     content.ui.statusActive,
        CLASSIFIED: content.ui.statusClassified,
        ARCHIVED:   content.ui.statusArchived,
    };

    return (
        <BentoTile colSpan={6} rowSpan={2} delay={0.3} className="!p-0 overflow-hidden">
            {/* Section header bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--bb-border)]"
                style={{ background: 'var(--bb-panel)' }}>
                <div>
                    <p className="font-terminal text-[var(--bb-dim)] text-xs tracking-[0.3em] mb-0.5">
                        TARGET ACQUIRED // {content.ui.projectsSubLabel}
                    </p>
                    <h2 className="terminal-heading text-base md:text-lg tracking-widest">
                        [ {content.ui.projectsTitle.toUpperCase()} // DOSSIERS ]
                    </h2>
                </div>
                <span className="font-terminal text-[var(--bb-dim)] text-xs tracking-widest hidden sm:block">
                    {content.projects.length} {content.ui.projectsRecordsFound}
                </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                {content.projects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} statusLabels={statusLabels} />
                ))}
            </div>
        </BentoTile>
    );
};

export default ProjectsSection;
