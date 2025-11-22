'use client';

import React from 'react';
import styles from './desktop.module.css';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { DesktopIcons } from './DesktopIcons';

export type OSAppId =
    | 'terminal'
    | 'projects'
    | 'filesystem'
    | 'system-monitor'
    | 'blog'
    | 'contact'
    | 'resume';

export interface DesktopProps {
    onAppLaunch?: (appId: OSAppId) => void;
}

export interface DesktopApp {
    id: OSAppId;
    label: string;
}

const APPS: DesktopApp[] = [
    { id: 'projects',        label: 'Projects' },
    { id: 'terminal',        label: 'Terminal' },
    { id: 'filesystem',      label: 'File System' },
    { id: 'system-monitor',  label: 'System Monitor' },
    { id: 'blog',            label: 'Blog' },
    { id: 'contact',         label: 'Contact' },
    { id: 'resume',          label: 'Resume' },
];

export const Desktop: React.FC<DesktopProps> = ({ onAppLaunch }) => {
    const handleLaunch = (id: OSAppId) => {
        onAppLaunch?.(id);
    };

    return (
        <div className={styles.desktopRoot} aria-label="Khwahish portfolio desktop">

            <TopBar />
            <div className={styles.desktopSilhouette} aria-hidden="true" />
            <main className={styles.desktopMain}>
                <DesktopIcons apps={APPS} onAppLaunch={handleLaunch} />
            </main>

            <Dock apps={APPS} onAppLaunch={handleLaunch} />
        </div>
    );
};
