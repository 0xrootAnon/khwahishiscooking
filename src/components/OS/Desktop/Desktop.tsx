'use client';

import React from 'react';
import styles from './desktop.module.css';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { DesktopIcons } from './DesktopIcons';
import WindowManager from '../WindowManager';

const Desktop: React.FC = () => {
    return (
        <div
            className={styles.desktopRoot}
            aria-label="Khwahish portfolio desktop"
        >
            <TopBar />

            <div className={styles.desktopSilhouette} aria-hidden="true" />

            <main className={styles.desktopMain}>
                <DesktopIcons />

                <WindowManager />
            </main>

            <Dock />
        </div>
    );
};
export default Desktop;
