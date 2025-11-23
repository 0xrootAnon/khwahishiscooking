'use client';

import { create } from 'zustand';

export type AppWindowId =
    | 'terminal'
    | 'projects'
    | 'filesystem'
    | 'system-monitor'
    | 'blog'
    | 'contact'
    | 'resume';

export interface WindowState {
    id: AppWindowId;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface UIState {
    windows: Record<AppWindowId, WindowState>;
    focusedId: AppWindowId | null;

    openWindow: (id: AppWindowId) => void;
    closeWindow: (id: AppWindowId) => void;
    toggleMinimize: (id: AppWindowId) => void;
    toggleMaximize: (id: AppWindowId) => void;
    focusWindow: (id: AppWindowId) => void;
    moveWindow: (id: AppWindowId, x: number, y: number) => void;
}

const TITLES: Record<AppWindowId, string> = {
    terminal: 'Shell',
    projects: 'PROFILE.dat',
    filesystem: 'Build Logs',
    'system-monitor': 'Stack & Skills',
    blog: 'Log Entries',
    contact: 'Establish Connection',
    resume: 'Download Payload',
};

const LAYOUT: Record<
    AppWindowId,
    { x: number; y: number; width: number; height: number }
> = {
    terminal: { x: 120, y: 90, width: 880, height: 520 },
    projects: { x: 140, y: 110, width: 960, height: 560 },
    filesystem: { x: 160, y: 130, width: 960, height: 560 },
    'system-monitor': { x: 180, y: 120, width: 760, height: 460 },
    blog: { x: 200, y: 110, width: 960, height: 560 },
    contact: { x: 220, y: 140, width: 640, height: 420 },
    resume: { x: 240, y: 150, width: 760, height: 520 },
};

const BASE_Z = 10;

export const useUIStore = create<UIState>((set, get) => {
    const makeInitial = (): Record<AppWindowId, WindowState> => {
        const ids: AppWindowId[] = [
            'terminal',
            'projects',
            'filesystem',
            'system-monitor',
            'blog',
            'contact',
            'resume',
        ];

        const acc: Partial<Record<AppWindowId, WindowState>> = {};

        ids.forEach((id, idx) => {
            const layout = LAYOUT[id];
            acc[id] = {
                id,
                title: TITLES[id],
                isOpen: false,
                isMinimized: false,
                isMaximized: false,
                zIndex: BASE_Z + idx,
                x: layout.x,
                y: layout.y,
                width: layout.width,
                height: layout.height,
            };
        });

        return acc as Record<AppWindowId, WindowState>;
    };

    return {
        windows: makeInitial(),
        focusedId: null,

        openWindow: (id) =>
            set((state) => {
                const maxZ =
                    Object.values(state.windows).reduce(
                        (m, w) => (w.zIndex > m ? w.zIndex : m),
                        BASE_Z,
                    ) + 1;

                const w = state.windows[id];

                return {
                    windows: {
                        ...state.windows,
                        [id]: {
                            ...w,
                            isOpen: true,
                            isMinimized: false,
                            zIndex: maxZ,
                        },
                    },
                    focusedId: id,
                };
            }),

        closeWindow: (id) =>
            set((state) => ({
                windows: {
                    ...state.windows,
                    [id]: {
                        ...state.windows[id],
                        isOpen: false,
                        isMinimized: false,
                        isMaximized: false,
                    },
                },
                focusedId: state.focusedId === id ? null : state.focusedId,
            })),

        toggleMinimize: (id) =>
            set((state) => {
                const w = state.windows[id];
                const nowMin = !w.isMinimized;

                return {
                    windows: {
                        ...state.windows,
                        [id]: {
                            ...w,
                            isMinimized: nowMin,
                        },
                    },
                    focusedId: state.focusedId === id && nowMin ? null : state.focusedId,
                };
            }),

        toggleMaximize: (id) =>
            set((state) => ({
                windows: {
                    ...state.windows,
                    [id]: {
                        ...state.windows[id],
                        isMaximized: !state.windows[id].isMaximized,
                    },
                },
            })),

        focusWindow: (id) =>
            set((state) => {
                const maxZ =
                    Object.values(state.windows).reduce(
                        (m, w) => (w.zIndex > m ? w.zIndex : m),
                        BASE_Z,
                    ) + 1;

                return {
                    windows: {
                        ...state.windows,
                        [id]: { ...state.windows[id], zIndex: maxZ },
                    },
                    focusedId: id,
                };
            }),

        moveWindow: (id, x, y) =>
            set((state) => ({
                windows: {
                    ...state.windows,
                    [id]: {
                        ...state.windows[id],
                        x,
                        y,
                    },
                },
            })),
    };
});