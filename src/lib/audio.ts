export const preloadAudio = (src: string): HTMLAudioElement | null => {
    if (typeof window === 'undefined') return null;
    const audio = new Audio(src);
    audio.preload = 'auto';
    return audio;
};
