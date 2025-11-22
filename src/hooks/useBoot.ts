'use client';

import { useEffect, useRef, useState } from 'react';

interface UseBootOptions {
    lineCount: number;
    durationMs?: number;
    postHoldMs?: number;
    onComplete?: () => void;
}

interface UseBootReturn {
    visibleLines: number;
    isDone: boolean;
}

export default function useBoot(options: UseBootOptions): UseBootReturn {
    const {
        lineCount,
        durationMs = 6000,
        postHoldMs = 1000,
        onComplete,
    } = options;

    const [visibleLines, setVisibleLines] = useState(0);
    const completedRef = useRef(false);
    const rafIdRef = useRef<number | null>(null);
    const lastIndexRef = useRef(0);

    useEffect(() => {
        if (lineCount <= 0) return;

        const startTime = performance.now();

        const step = () => {
            const now = performance.now();
            const elapsed = now - startTime;
            const baseProgress = Math.min(1, elapsed / durationMs);

            const progress = Math.pow(baseProgress, 1.2);

            const index = Math.floor(progress * lineCount);

            if (index !== lastIndexRef.current) {
                lastIndexRef.current = index;
                setVisibleLines(index);
            }

            if (progress < 1) {
                rafIdRef.current = window.requestAnimationFrame(step);
            } else if (!completedRef.current) {
                completedRef.current = true;
                setVisibleLines(lineCount);

                if (onComplete) {
                    window.setTimeout(() => {
                        onComplete();
                    }, postHoldMs);
                }
            }
        };

        rafIdRef.current = window.requestAnimationFrame(step);

        return () => {
            if (rafIdRef.current !== null) {
                window.cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [lineCount, durationMs, postHoldMs, onComplete]);

    return { visibleLines, isDone: completedRef.current };
}
