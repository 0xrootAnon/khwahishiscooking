'use client';

import React, { useState } from 'react';
import OSWindow from './Window';
import { useUIStore } from '@/store/uiStore';
import type { AppWindowId } from '@/store/uiStore';

const DEFAULT_LAYOUT: Record<
    AppWindowId,
    { x: number; y: number; width: number; height: number }
> = {
    terminal:        { x: 80,  y: 80,  width: 800, height: 500 },
    projects:        { x: 120, y: 120, width: 900, height: 550 },
    filesystem:      { x: 140, y: 140, width: 900, height: 550 },
    'system-monitor': { x: 160, y: 160, width: 700, height: 450 },
    blog:            { x: 180, y: 100, width: 900, height: 550 },
    contact:         { x: 200, y: 120, width: 600, height: 400 },
    resume:          { x: 220, y: 140, width: 700, height: 500 },
};

const WindowManager: React.FC = () => {
    const windowMap = useUIStore((s) => s.windows);
    const focusedId = useUIStore((s) => s.focusedId);

    const closeWindow = useUIStore((s) => s.closeWindow);
    const focusWindow = useUIStore((s) => s.focusWindow);
    const toggleMinimize = useUIStore((s) => s.toggleMinimize);
    const toggleMaximize = useUIStore((s) => s.toggleMaximize);

    const [layout, setLayout] = useState(DEFAULT_LAYOUT);

    const allWindows = Object.values(windowMap);

    const openWindows = allWindows.filter((w) => w.isOpen);
    if (!openWindows.length) return null;

    const sorted = [...openWindows].sort((a, b) => a.zIndex - b.zIndex);

    const handleMove = (id: AppWindowId, x: number, y: number) => {
        setLayout((prev) => ({
            ...prev,
            [id]: {
                ...(prev[id] ?? DEFAULT_LAYOUT[id]),
                x,
                y,
            },
        }));
    };

    const renderContent = (id: AppWindowId) => {
        switch (id) {
            case 'terminal':
                return (
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        Terminal
                    </div>
                );
            case 'projects':
                return <div>Ongoing...</div>;
            case 'filesystem':
                return <div>Ongoing...</div>;
            case 'system-monitor':
                return <div>Ongoing...</div>;
            case 'blog':
                return <div>Ongoing...</div>;
            case 'contact':
                return <div>Ongoing...</div>;
            case 'resume':
                return <div>Ongoing...</div>;
            default:
                return null;
        }
    };

    return (
        <>
            {sorted.map((w) => {
                const pos = layout[w.id] ?? DEFAULT_LAYOUT[w.id];

                return (
                    <OSWindow
                        key={w.id}
                        id={w.id}
                        title={w.title}
                        x={pos.x}
                        y={pos.y}
                        width={pos.width}
                        height={pos.height}
                        zIndex={w.zIndex}
                        isFocused={focusedId === w.id}
                        isMinimized={w.isMinimized}
                        isMaximized={w.isMaximized}
                        onFocus={() => focusWindow(w.id)}
                        onClose={() => closeWindow(w.id)}
                        onMinimize={() => toggleMinimize(w.id)}
                        onToggleMaximize={() => toggleMaximize(w.id)}
                        onMove={(nx, ny) => handleMove(w.id, nx, ny)}
                    >
                        {renderContent(w.id)}
                    </OSWindow>
                );
            })}
        </>
    );
};

export default WindowManager;