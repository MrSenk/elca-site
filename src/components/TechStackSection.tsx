
import { useApp } from '../context/AppContext';
import BentoTile from './BentoTile';

const TechStackSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={4} rowSpan={1} delay={0.2}>
            <div className="flex flex-col gap-6 h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-theme-text">
                    {content.ui.techStackTitle}
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {content.tech.map((item, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-2 bg-theme-surface/50 border border-theme-overlay/20 rounded-lg text-xs md:text-sm text-theme-text hover:border-theme-mauve hover:bg-theme-mauve/10 hover:scale-105 transition-all duration-300 cursor-default font-mono"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </BentoTile>
    );
};

export default TechStackSection;
