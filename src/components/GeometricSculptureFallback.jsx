// src/components/GeometricSculptureFallback.jsx
import { useEffect, useState } from 'react';

export default function GeometricSculptureFallback() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className="sculpture-fallback">
                <div className="fallback-geometry">
                    <div className="fallback-orbit orbit-1"></div>
                    <div className="fallback-orbit orbit-2"></div>
                    <div className="fallback-orbit orbit-3"></div>
                    <div className="fallback-core"></div>
                </div>
            </div>
        );
    }

    return null;
}