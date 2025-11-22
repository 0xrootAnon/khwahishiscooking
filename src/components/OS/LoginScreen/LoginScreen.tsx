'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './login.module.css';
import useParallax from '@/hooks/useParallax';

export interface LoginScreenProps {
    onLogin: () => void;
}


const AVATAR_SRC = '/assets/avatars/avatar.jpeg';

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const { style: cardParallaxStyle, handleMouseMove, reset } = useParallax({
        maxTranslate: 4,
    });

    const isMobile =
        typeof window !== 'undefined' && window.innerWidth < 768;

    const [introExpanded, setIntroExpanded] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIntroExpanded(true);
        }, 450);

        return () => window.clearTimeout(timer);
    }, []);

    return (
        <div
            className={styles.root}
            onMouseMove={isMobile ? undefined : handleMouseMove}
            onMouseLeave={isMobile ? undefined : reset}
        >
            <div className={styles.backdrop} aria-hidden="true" />

            <div className={styles.waterBlob} aria-hidden="true" />

            <div className={styles.cardShell} style={cardParallaxStyle}>
                <div
                    className={styles.card}
                    aria-label="Login to khwahish portfolio session"
                >
                    <div
                        className={
                            introExpanded
                                ? `${styles.cardMain} ${styles.cardMainExpanded}`
                                : `${styles.cardMain} ${styles.cardMainInitial}`
                        }
                    >
                        <div
                            className={
                                introExpanded
                                    ? `${styles.avatarWrapper} ${styles.avatarWrapperSlide}`
                                    : styles.avatarWrapper
                            }
                        >
                            <div className={styles.avatarRing}>
                                <div className={styles.avatarCircle}>
                                    <Image
                                        src={AVATAR_SRC}
                                        alt="Khwahish avatar"
                                        fill
                                        sizes="96px"
                                        className={styles.avatarImg}
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {introExpanded && (
                            <div className={styles.textBlock}>
                                <div className={styles.username}>khwahish-sharma</div>
                                <div className={styles.role}>Backend Software Engineer</div>
                                <p className={styles.tagline}>
Complexity is merely the volume control of my solutions.
                                </p>
                                <p className={styles.meta}>
                                    current session · read-only · portfolio environment
                                </p>
                            </div>
                        )}
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.loginButton}
                            onClick={onLogin}
                        >
                            Login
                        </button>

                        <p className={styles.hintDesktop}>
                            You&apos;re about to enter my workspace. Proceed with curiosity.
                        </p>

                        <p className={styles.hintMobile}>
                            For full experience use on PC. <br />
                            Mobile version is terminal only.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;