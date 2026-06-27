import { useState, useEffect, useRef } from 'react';

export const useTypingEffect = (text: string, speed = 80, onComplete?: () => void): string => {
    const [displayed, setDisplayed] = useState('');
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        if (!text) {
            setDisplayed('');
            return;
        }
        setDisplayed('');
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayed(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                onCompleteRef.current?.();
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);

    return displayed;
};
