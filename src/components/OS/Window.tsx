'use client';

import React, { useCallback, useRef } from 'react';
import styles from './window.module.css';
import type { AppWindowId } from '@/store/uiStore';

export interface OSWindowProps {
    id: AppWindowId;
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    isFocused: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    onFocus: () => void;
    onClose: () => void;
    onMinimize: () => void;
    onToggleMaximize: () => void;
    onMove: (x: number, y: number) => void;
    children: React.ReactNode;
}

const OSWindow: React.FC<OSWindowProps> = ({
                                               title,
                                               x,
                                               y,
                                               width,
                                               height,
                                               zIndex,
                                               isFocused,
                                               isMinimized,
                                               isMaximized,
                                               onFocus,
                                               onClose,
                                               onMinimize,
                                               onToggleMaximize,
                                               onMove,
                                               children,
                                           }) => {
    const dragRef = useRef<{
        sx: number;
        sy: number;
        ox: number;
        oy: number;
    } | null>(null);

    const handleTitlePointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            onFocus();

            if (e.button !== 0 || isMaximized) return;

            const target = e.target as HTMLElement | null;
            if (target && target.closest('button')) {
                return;
            }

            e.currentTarget.setPointerCapture(e.pointerId);

            dragRef.current = {
                sx: e.clientX,
                sy: e.clientY,
                ox: x,
                oy: y,
            };
        },
        [onFocus, x, y, isMaximized],
    );

    const handleTitlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!dragRef.current) return;

            const { sx, sy, ox, oy } = dragRef.current;
            const nx = ox + (e.clientX - sx);
            const ny = oy + (e.clientY - sy);

            onMove(Math.max(8, nx), Math.max(8, ny));
        },
        [onMove],
    );

    const handleTitlePointerUp = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!dragRef.current) return;

            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
            }
            dragRef.current = null;
        },
        [],
    );

    if (isMinimized) return null;

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
            style={{
                top: isMaximized ? undefined : y,
                left: isMaximized ? undefined : x,
                width: isMaximized ? undefined : width,
                height: isMaximized ? undefined : height,
                zIndex,
            }}
            role="dialog"
            aria-label={title}
            onMouseDown={onFocus}
        >
            <div
                className={styles.titleBar}
                onPointerDown={handleTitlePointerDown}
                onPointerMove={handleTitlePointerMove}
                onPointerUp={handleTitlePointerUp}
            >
                <div className={styles.controlsLeft}>
                    <button
                        type="button"
                        className={styles.controlClose}
                        onClick={(ev) => {
                            ev.stopPropagation();
                            onClose();
                        }}
                        aria-label="Close window"
                    />
                    <button
                        type="button"
                        className={styles.controlMin}
                        onClick={(ev) => {
                            ev.stopPropagation();
                            onMinimize();
                        }}
                        aria-label="Minimize window"
                    />
                    <button
                        type="button"
                        className={styles.controlMax}
                        onClick={(ev) => {
                            ev.stopPropagation();
                            onToggleMaximize();
                        }}
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

export default OSWindow;