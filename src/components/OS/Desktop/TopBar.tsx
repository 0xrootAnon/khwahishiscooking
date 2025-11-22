'use client';

import React, { useEffect, useState } from 'react';
import styles from './topbar.module.css';

interface SystemTime {
    hours: string;
    minutes: string;
}

function useSystemTime(): SystemTime {
    const [time, setTime] = useState<SystemTime>(() => {
        const now = new Date();
        const h = now.getHours().toString().padStart(2, '0');
        const m = now.getMinutes().toString().padStart(2, '0');
        return { hours: h, minutes: m };
    });

    useEffect(() => {
        const interval = window.setInterval(() => {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            setTime({ hours: h, minutes: m });
        }, 30_000);

        return () => window.clearInterval(interval);
    }, []);

    return time;
}

interface BatteryState {
    level: number;
    charging: boolean;
    supported: boolean;
}

function useBattery(): BatteryState | null {
    const [battery, setBattery] = useState<BatteryState | null>(null);

    useEffect(() => {
        let mounted = true;

        const navAny = navigator as any;
        const getBattery =
            navAny && typeof navAny.getBattery === 'function'
                ? navAny.getBattery.bind(navAny)
                : null;

        if (!getBattery) {
            if (mounted) {
                setBattery({
                    level: 1,
                    charging: false,
                    supported: false,
                });
            }
            return;
        }

        getBattery()
            .then((b: any) => {
                if (!mounted) return;

                const update = () => {
                    if (!mounted) return;
                    setBattery({
                        level: b.level ?? 1,
                        charging: !!b.charging,
                        supported: true,
                    });
                };

                update();

                b.addEventListener('levelchange', update);
                b.addEventListener('chargingchange', update);

                return () => {
                    b.removeEventListener('levelchange', update);
                    b.removeEventListener('chargingchange', update);
                };
            })
            .catch(() => {
                if (mounted) {
                    setBattery({
                        level: 1,
                        charging: false,
                        supported: false,
                    });
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    return battery;
}

export const TopBar: React.FC = () => {
    const { hours, minutes } = useSystemTime();
    const battery = useBattery();

    const batteryPct =
        battery && battery.supported ? Math.round(battery.level * 100) : null;


    return (
        <header className={styles.topBar} aria-label="Desktop top bar">
            <div className={styles.leftArea} aria-hidden="true">
                <span className={styles.systemDot} />
                <span className={styles.systemDot} />
                <span className={styles.systemDot} />
            </div>

            <div className={styles.centerArea}>khwahish@portfolio</div>

            <div className={styles.rightArea}>

                <div className={styles.clock} aria-label="Local time">
                    {hours}:{minutes}
                </div>
            </div>
        </header>
    );
};
