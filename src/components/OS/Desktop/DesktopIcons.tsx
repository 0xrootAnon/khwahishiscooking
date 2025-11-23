'use client';

import React from 'react';
import styles from './desktopIcons.module.css';
import { useUIStore } from '@/store/uiStore';
import type { AppWindowId } from '@/store/uiStore';

const APP_ICON_ORDER: AppWindowId[] = [
    'projects',
    'terminal',
    'filesystem',
    'system-monitor',
    'blog',
    'contact',
    'resume',
];

function getIconLabel(id: AppWindowId): string {
    switch (id) {
        case 'projects':
            return 'User';
        case 'terminal':
            return 'Terminal';
        case 'filesystem':
            return 'Projects';
        case 'system-monitor':
            return 'Dash';
        case 'blog':
            return 'Blog';
        case 'contact':
            return 'Contact';
        case 'resume':
            return 'Resume';
        default:
            return id;
    }
}

const AppIcon: React.FC<{ id: AppWindowId }> = ({ id }) => {
    switch (id) {
        case 'projects':
            return (
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
                    <rect x="3.5" y="4.5" width="17" height="11" rx="1.5" />
                    <rect x="9" y="17" width="6" height="1.5" rx="0.75" />
                    <rect x="8" y="18.5" width="8" height="1" rx="0.5" />
                </svg>
            );
        case 'terminal':
            return (
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
                    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
                    <path d="M8 9l3 3-3 3" />
                    <path d="M12.5 15.5h4" />
                </svg>
            );
        case 'filesystem':
            return (
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
                    <path d="M4 7.5h6l2 2.5h8v7a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 2 17V9a1.5 1.5 0 0 1 1.5-1.5Z" />
                </svg>
            );
        case 'system-monitor':
            return (
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
                    <rect x="4" y="5" width="16" height="14" rx="1.5" />
                    <path d="M8 15.5v-4" />
                    <path d="M12 15.5v-6" />
                    <path d="M16 15.5v-3" />
                </svg>
            );
        case 'blog':
            return (
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
                    <circle cx="12" cy="12" r="7.5" />
                    <path d="M4.8 9.5h14.4" />
                    <path d="M4.8 14.5h14.4" />
                    <path d="M12 4.5c2.2 2.3 3.2 4.8 3.2 7.5 0 2.7-1 5.2-3.2 7.5-2.2-2.3-3.2-4.8-3.2-7.5 0-2.7 1-5.2 3.2-7.5Z" />
                </svg>
            );
        case 'contact':
            return (
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
                    <rect x="4" y="6.5" width="16" height="11" rx="1.5" />
                    <path d="M5.5 8l6.5 5 6.5-5" />
                </svg>
            );
        case 'resume':
            return (
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
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

export const DesktopIcons: React.FC = () => {
    const openWindow = useUIStore((s) => s.openWindow);

    const handleOpen = (id: AppWindowId) => () => {
        openWindow(id);
    };

    return (
        <section
            className={styles.desktopIcons}
            aria-label="Desktop application icons"
        >
            {APP_ICON_ORDER.map((id) => (
                <button
                    key={id}
                    type="button"
                    className={styles.iconButton}
                    onClick={handleOpen(id)}
                >
                    <div className={styles.iconGlyph}>
                        <AppIcon id={id} />
                    </div>
                    <span className={styles.iconLabel}>{getIconLabel(id)}</span>
                </button>
            ))}
        </section>
    );
};
