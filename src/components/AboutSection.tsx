
import { useApp } from '../context/AppContext';

const AboutSection = () => {
    const { content } = useApp();

    return (
        <section id="about" className="flex flex-col gap-8">
            <h3 className="text-2xl text-theme-blue font-bold">{content.ui.aboutMeTitle}</h3>
            <p className="text-theme-text leading-relaxed">
                {content.aboutMe}
            </p>
        </section>
    );
};

export default AboutSection;
