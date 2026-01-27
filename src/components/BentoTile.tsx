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

        if (tileRef.current) {
            observer.observe(tileRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const colSpanClasses = {
        1: 'col-span-1',
        2: 'col-span-1 sm:col-span-2',
        3: 'col-span-1 sm:col-span-2 md:col-span-3',
        4: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4',
        5: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5',
        6: 'col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-6',
    };

    const rowSpanClasses = {
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
            transition={{
                duration: 0.5,
                delay: delay,
                ease: [0.4, 0, 0.2, 1],
            }}
            className={`
        glass-tile
        ${colSpanClasses[colSpan]}
        ${rowSpanClasses[rowSpan]}
        ${hoverable ? 'cursor-pointer' : ''}
        ${className}
        p-6 md:p-8
      `}
        >
            {children}
        </motion.div>
    );
};

export default BentoTile;
