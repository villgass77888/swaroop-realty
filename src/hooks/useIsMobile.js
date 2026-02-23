import { useState, useEffect } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
    const [isTablet, setIsTablet] = useState(() => window.innerWidth > 768 && window.innerWidth <= 1024);
    const isTouch = typeof window !== 'undefined'
        ? ('ontouchstart' in window || navigator.maxTouchPoints > 0)
        : false;

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setIsMobile(w <= 768);
            setIsTablet(w > 768 && w <= 1024);
        };
        window.addEventListener('resize', update, { passive: true });
        return () => window.removeEventListener('resize', update);
    }, []);

    return { isMobile, isTablet, isTouch };
};

export default useIsMobile;
