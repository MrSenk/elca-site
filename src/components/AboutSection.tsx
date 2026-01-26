
import { useApp } from '../context/AppContext';
import BentoTile from './BentoTile';

const AboutSection = () => {
    const { content } = useApp();

    return (
        <BentoTile colSpan={3} rowSpan={1} delay={0.1}>
            <div className="flex flex-col gap-4 h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-theme-text">
                    {content.ui.aboutMeTitle}
                </h2>
                <p className="text-theme-overlay leading-relaxed text-sm md:text-base">
                    {content.aboutMe}
                </p>
            </div>
        </BentoTile>
    );
};

export default AboutSection;
