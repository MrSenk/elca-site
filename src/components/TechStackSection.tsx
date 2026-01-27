import { useApp } from '../context/AppContext';
import BentoTile from './BentoTile';

const TechStackSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={1} delay={0.2}>
            <div className="flex flex-col gap-6 h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-theme-text">
                    {content.ui.techStackTitle}
                </h2>
                <div className="flex flex-col gap-3">
                    <ul className="flex flex-col gap-2">
                        {content.tech.map((tech, techIdx) => (
                            <li
                                key={techIdx}
                                className="text-sm md:text-base text-theme-text hover:text-theme-blue transition-colors flex items-start gap-2"
                            >
                                <span className="text-theme-blue text-md">•</span>
                                <span className="flex-1">{tech}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </BentoTile>
    );
};

export default TechStackSection;
