
import { useApp } from '../context/AppContext';

const BeyondCodeSection = () => {
    const { content } = useApp();

    return (
        <section id="beyond-code" className="flex flex-col gap-8">
            <h3 className="text-2xl text-theme-blue font-bold">{content.ui.beyondCodeTitle}</h3>
            <p className="text-theme-text leading-relaxed">
                {content.beyondCode}
            </p>
        </section>
    );
};

export default BeyondCodeSection;
