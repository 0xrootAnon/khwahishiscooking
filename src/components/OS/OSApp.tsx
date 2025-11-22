'use client';

import React, { useState } from 'react';
import BootScreen from './BootScreen/BootScreen';
import LoginScreen from './LoginScreen/LoginScreen';
import { Desktop, OSAppId } from './Desktop/Desktop';

type Phase = 'boot' | 'login' | 'desktop';

export const OSApp: React.FC = () => {
    const [phase, setPhase] = useState<Phase>('boot');

    const handleBootComplete = () => {
        setPhase('login');
    };

    const handleLogin = () => {
        setPhase('desktop');
    };

    const handleAppLaunch = (appId: OSAppId) => {
        console.log('[OSApp] launch app:', appId);
    };

    if (phase === 'boot') {
        return <BootScreen onComplete={handleBootComplete} />;
    }

    if (phase === 'login') {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return <Desktop onAppLaunch={handleAppLaunch} />;
};

export default OSApp;
