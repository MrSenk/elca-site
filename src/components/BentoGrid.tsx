import { type ReactNode } from 'react';

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

const BentoGrid = ({ children, className = '' }: BentoGridProps) => {
    return (
        <div
            className={`
        grid gap-4 md:gap-5 lg:gap-6
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6
        auto-rows-auto
        w-full
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default BentoGrid;
