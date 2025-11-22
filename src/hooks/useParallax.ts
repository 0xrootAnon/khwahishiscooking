'use client';

import { useCallback, useState } from 'react';

interface UseParallaxOptions {
    maxTranslate?: number;
}

export default function useParallax(options: UseParallaxOptions = {}) {
    const { maxTranslate = 4 } = options;
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback(
        (event: React.MouseEvent) => {
            if (typeof window === 'undefined') return;

            const { innerWidth, innerHeight } = window;
            if (!innerWidth || !innerHeight) return;

            const xNorm = (event.clientX / innerWidth - 0.5) * 2; // -1..1
            const yNorm = (event.clientY / innerHeight - 0.5) * 2;

            const x = -xNorm * maxTranslate;
            const y = -yNorm * maxTranslate;

            setOffset({ x, y });
        },
        [maxTranslate],
    );

    const reset = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    const style: React.CSSProperties = {
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    };

    return { style, handleMouseMove, reset };
}
