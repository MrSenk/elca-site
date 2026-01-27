import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BentoTile from './BentoTile';

const HeroSection = () => {
    const { content } = useApp();
    const [displayedRole, setDisplayedRole] = useState('');

    const fullRole = content.profile.role;

    useEffect(() => {
        setDisplayedRole('');

        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullRole.length) {
                setDisplayedRole(fullRole.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 80);

        return () => clearInterval(typingInterval);
    }, [fullRole]);

    return (
        <BentoTile colSpan={6} rowSpan={2} className="relative overflow-hidden" delay={0}>
            {/* Animated background gradient */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-mauve via-theme-blue to-theme-sapphire animate-gradient bg-[length:200%_200%]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-8 h-full justify-between">
                {/* Main heading section */}
                <div className="flex flex-col gap-4">
                    <span className="text-theme-peach text-sm md:text-base font-medium tracking-wide">
                        {content.greeting}
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                        <span className="gradient-text block mb-2">
                            {content.profile.name}
                        </span>
                        <span className="text-theme-text font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl block max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-none">
                            {displayedRole}
                            <span className="animate-blink">|</span>
                        </span>
                    </h1>

                    <p className="text-theme-overlay text-base md:text-lg mt-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {content.profile.location}
                    </p>
                </div>

                {/* Stats and CTA section */}
                <div className="flex flex-col gap-6">
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md">
                        {content.profile.stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col gap-1 group">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-mauve inline-block">
                                    {stat.value}
                                </span>
                                <span className="text-xs sm:text-sm text-theme-overlay">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-theme-mauve to-theme-blue text-white font-medium hover:shadow-lg hover:shadow-theme-mauve/50 transition-all duration-300 hover:scale-105 group"
                        >
                            <span>→ {content.ui.blogLink}</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Profile Picture - Top Right with Blob Shape */}
                {/* Visible on all screen sizes with appropriate sizing to prevent overlap */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 z-20">
                    <div className="relative group">
                        {/* Blob shape container - responsive sizing optimized to prevent text overlap */}
                        <div className="blob-shape relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-48 lg:h-48 xl:w-64 xl:h-64 2xl:w-80 2xl:h-80 overflow-hidden">
                            <div className="blob-shape w-full h-full transition-all duration-300 scale-125 group-hover:scale-100">
                                <img
                                    src="/hehehe.png"
                                    alt={content.profile.name}
                                    className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 transition-all duration-500"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-theme-mauve/20 to-theme-blue/20 mix-blend-overlay"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BentoTile>
    );
};

export default HeroSection;
