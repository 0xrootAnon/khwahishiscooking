'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseAudioSyncOptions {
    src: string;
    volume?: number;
    loop?: boolean;
    playbackRate?: number;
}

export default function useAudioSync(options: UseAudioSyncOptions) {
    const { src, volume = 0.7, loop = false, playbackRate = 1 } = options;
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const audio = new Audio(src);
        audio.preload = 'auto';
        audio.volume = volume;
        audio.loop = loop;
        audio.playbackRate = playbackRate;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audioRef.current = null;
        };
    }, [src, volume, loop, playbackRate]);

    const play = useCallback(async () => {
        if (!audioRef.current) return;
        try {
            await audioRef.current.play();
        } catch {
        }
    }, []);

    const playFromGesture = useCallback(async () => {
        if (!audioRef.current) return;
        try {
            audioRef.current.currentTime = 0;
            await audioRef.current.play();
        } catch {
        }
    }, []);

    const stop = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }, []);

    return { audioRef, play, playFromGesture, stop };
}
