'use client';

import React from 'react';
import styles from './dock.module.css';
import { useUIStore } from '@/store/uiStore';
import type { AppWindowId } from '@/store/uiStore';

const DOCK_ORDER: AppWindowId[] = [
    'terminal',
    'system-monitor',
    'blog',
    'contact',
    'resume',
];

const DockIconSvg: React.FC<{ id: AppWindowId }> = ({ id }) => {
    switch (id) {
        case 'terminal':
            return (
                <svg viewBox="0 0 24 24" className={styles.dockIconSvg} aria-hidden="true">
                    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
                    <path d="M8 9l3 3-3 3" />
                    <path d="M12.5 15.5h4" />
                </svg>
            );
        case 'system-monitor':
            return (
                <svg viewBox="0 0 24 24" className={styles.dockIconSvg} aria-hidden="true">
                    <rect x="4" y="5" width="16" height="14" rx="1.5" />
                    <path d="M8 15.5v-4" />
                    <path d="M12 15.5v-6" />
                    <path d="M16 15.5v-3" />
                </svg>
            );
        case 'blog':
            return (
                <svg viewBox="0 0 24 24" className={styles.dockIconSvg} aria-hidden="true">
                    <circle cx="12" cy="12" r="7.5" />
                    <path d="M4.8 9.5h14.4" />
                    <path d="M4.8 14.5h14.4" />
                    <path d="M12 4.5c2.2 2.3 3.2 4.8 3.2 7.5 0 2.7-1 5.2-3.2 7.5-2.2-2.3-3.2-4.8-3.2-7.5 0-2.7 1-5.2 3.2-7.5Z" />
                </svg>
            );
        case 'contact':
            return (
                <svg viewBox="0 0 24 24" className={styles.dockIconSvg} aria-hidden="true">
                    <rect x="4" y="6.5" width="16" height="11" rx="1.5" />
                    <path d="M5.5 8l6.5 5 6.5-5" />
                </svg>
            );
        case 'resume':
            return (
                <svg viewBox="0 0 24 24" className={styles.dockIconSvg} aria-hidden="true">
                    <rect x="7" y="4" width="10" height="16" rx="1.5" />
                    <path d="M9.5 8.5h5" />
                    <path d="M9.5 11.5h5" />
                    <path d="M9.5 14.5h3" />
                </svg>
            );
        default:
            return null;
    }
};

export const Dock: React.FC = () => {
    const windows = useUIStore((s) => s.windows);
    const openWindow = useUIStore((s) => s.openWindow);
    const toggleMinimize = useUIStore((s) => s.toggleMinimize);
    const focusWindow = useUIStore((s) => s.focusWindow);

    const handleDockClick = (id: AppWindowId) => () => {
        const w = windows[id];

        if (!w || !w.isOpen) {
            openWindow(id);
            return;
        }

        if (w.isMinimized) {
            toggleMinimize(id);
            focusWindow(id);
            return;
        }

        toggleMinimize(id);
    };

    return (
        <nav className={styles.dockRoot} aria-label="Application dock">
            <div className={styles.dockInner}>
                {DOCK_ORDER.map((id) => {
                    const w = windows[id];
                    const isActive = w?.isOpen ?? false;

                    return (
                        <button
                            key={id}
                            type="button"
                            className={`${styles.dockButton} ${
                                isActive ? styles.dockButtonActive : ''
                            }`}
                            onClick={handleDockClick(id)}
                        >
                            <div className={styles.dockIconInner}>
                                <DockIconSvg id={id} />
                            </div>
                            <span className={styles.dockIndicator} />
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
