'use client';

import React, { ReactNode } from 'react';
import styles from './window.module.css';

interface WindowShellProps {
    title: string;
    zIndex: number;
    isFocused: boolean;
    isMaximized: boolean;
    onClose: () => void;
    onMinimize: () => void;
    onToggleMaximize: () => void;
    onMouseDownHeader?: (e: React.MouseEvent<HTMLDivElement>) => void;
    children: ReactNode;
}

const WindowShell: React.FC<WindowShellProps> = ({
                                                     title,
                                                     zIndex,
                                                     isFocused,
                                                     isMaximized,
                                                     onClose,
                                                     onMinimize,
                                                     onToggleMaximize,
                                                     onMouseDownHeader,
                                                     children,
                                                 }) => {
    const rootClass = [
        styles.windowRoot,
        isFocused ? styles.windowFocused : '',
        isMaximized ? styles.windowMaximized : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <section
            className={rootClass}
            style={{ zIndex }}
            aria-label={`${title} window`}
        >
            <div
                className={styles.titleBar}
                onMouseDown={onMouseDownHeader}
            >
                <div className={styles.controlsLeft}>
                    <button
                        type="button"
                        className={styles.controlClose}
                        onClick={onClose}
                        aria-label="Close window"
                    />
                    <button
                        type="button"
                        className={styles.controlMin}
                        onClick={onMinimize}
                        aria-label="Minimize window"
                    />
                    <button
                        type="button"
                        className={styles.controlMax}
                        onClick={onToggleMaximize}
                        aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
                    />
                </div>

                <div className={styles.titleText}>{title.toUpperCase()}</div>

                <div className={styles.controlsRight} />
            </div>

            <div className={styles.windowBody}>{children}</div>
        </section>
    );
};

export default WindowShell;
