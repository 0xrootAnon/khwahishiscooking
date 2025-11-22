'use client';

import React, { useCallback, useState } from 'react';
import BootScreen from './BootScreen/BootScreen';
import LoginScreen from './LoginScreen/LoginScreen';
import Desktop from './Desktop/Desktop';

type OSPhase = 'boot' | 'login' | 'desktop';

export default function OSApp() {
    const [phase, setPhase] = useState<OSPhase>('boot');

    const handleBootComplete = useCallback(() => {
        setPhase('login');
    }, []);

    const handleLogin = useCallback(() => {
        setPhase('desktop');
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
            {phase === 'boot' && <BootScreen onComplete={handleBootComplete} />}
            {phase === 'login' && <LoginScreen onLogin={handleLogin} />}
            {phase === 'desktop' && <Desktop />}
        </div>
    );
}
