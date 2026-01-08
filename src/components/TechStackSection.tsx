
import { useApp } from '../context/AppContext';

const TechStackSection = () => {
    const { content } = useApp();

    return (
        <section id="tech" className="flex flex-col gap-8">
            <h3 className="text-2xl text-theme-blue font-bold">{content.ui.techStackTitle}</h3>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
                {content.tech.map((item, idx) => (
                    <span
                        key={idx}
                        className="text-theme-text hover:text-theme-peach transition-colors cursor-default"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default TechStackSection;
