import { type ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BentoTileProps {
    children: ReactNode;
    colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
    rowSpan?: 1 | 2 | 3 | 4;
    className?: string;
    hoverable?: boolean;
    delay?: number;
}

const CLIP = 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)';

const BentoTile = ({
    children,
    colSpan = 1,
    rowSpan = 1,
    className = '',
    hoverable = false,
    delay = 0,
}: BentoTileProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const tileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (tileRef.current) observer.observe(tileRef.current);
        return () => observer.disconnect();
    }, []);

    const colSpanClasses: Record<number, string> = {
        1: 'col-span-1',
        2: 'col-span-1 sm:col-span-2',
        3: 'col-span-1 sm:col-span-2 md:col-span-3',
        4: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4',
        5: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5',
        6: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-6',
    };

    const rowSpanClasses: Record<number, string> = {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
    };

    return (
        <motion.div
            ref={tileRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
            className={`panel-tile ${colSpanClasses[colSpan]} ${rowSpanClasses[rowSpan]} ${hoverable ? 'cursor-pointer group' : ''} ${className} p-5 md:p-7`}
            style={{ clipPath: CLIP }}
        >
            {children}
        </motion.div>
    );
};

export default BentoTile;
