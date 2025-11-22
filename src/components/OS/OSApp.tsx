'use client';

import React, { useCallback, useState } from 'react';
import BootScreen from './BootScreen/BootScreen';
import LoginScreen from './LoginScreen/LoginScreen';

type OSPhase = 'boot' | 'login';

export default function OSApp() {
    const [phase, setPhase] = useState<OSPhase>('boot');

    const handleBootComplete = useCallback(() => {
        setPhase('login');
    }, []);

    return (
        <div
            id="os-root"
            style={{
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
                backgroundColor: '#000000',
            }}
        >
            {phase === 'boot' ? (
                <BootScreen onComplete={handleBootComplete} />
            ) : (
                <LoginScreen />
            )}
        </div>
    );
}
