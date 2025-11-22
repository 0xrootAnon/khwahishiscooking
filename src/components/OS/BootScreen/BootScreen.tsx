'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import useBoot from '@/hooks/useBoot';
import useAudioSync from '@/hooks/useAudioSync';
import styles from './boot.module.css';

export interface BootScreenProps {
    onComplete: () => void;
}

const BOOT_LINE_COUNT = 350;
const BOOT_DURATION_MS = 6000;

const BASE_PREFIX_LINES: string[] = [
    '[    0.000000] Booting Khwahish Portfolio OS (linux-portfolio x86_64)',
    '[    0.000001] Initializing cgroup subsys cpuset for backend.services [OK]',
    '[    0.000002] Initializing cgroup subsys cpu for portfolio.workload [OK]',
    '[    0.000003] Initializing cgroup subsys cpuacct for profile.metrics [OK]',
    '[    0.000010] Command line: quiet splash khwahish.portfolio=1 profile=backend',
    '[    0.000020] CPU0: backend-optimized scheduler enabled (io, network priority) [OK]',
    '[    0.000050] Memory: allocating space for projects, skills, blog, resume caches [OK]',
    '[    0.000080] Kernel: enabling async portfolio loading and lazy window services [OK]',
    '[    0.000110] Mounting /dev/khwahish (projects, APIs, services) as read-mostly [OK]',
    '[    0.000150] Loading module: http-stack (REST, JSON, OpenAPI, rate-limits) [OK]',
    '[    0.000180] Loading module: rest-api.handlers (auth, users, billing, notes) [OK]',
    '[    0.000210] Loading module: database-drivers (PostgreSQL, MongoDB, Redis) [OK]',
    '[    0.000240] Loading module: cloud-tooling (Docker, CI/CD, logging, metrics) [OK]',
    '[    0.000270] Setting hostname to khwahish-dev and domain to portfolio.local [OK]',
    '[    0.000300] Initializing network interfaces (https, ssh, git, observability) [OK]',
    '[    0.000330] Probing filesystems for portfolio data at /work, /skills, /blog [OK]',
    '[    0.000360] Mounted /work/projects (url-shortener, notes-api, auth-service) [OK]',
    '[    0.000390] Mounted /skills (backend, db, http, linux, tooling, testing) [OK]',
    '[    0.000420] Mounted /blog (external) as read-only article index [OK]',
    '[    0.000450] Mounted /resume (pdf) at /mnt/resume/resume.pdf [OK]',
    '[    0.000480] Starting udev: device discovery for tech stack and toolchain [OK]',
    '[    0.000510] Detected editor: VS Code / Neovim hybrid with Lua-powered config [OK]',
    '[    0.000540] Detected preferred shell: zsh / bash compatible with aliases [OK]',
    '[    0.000570] Initializing logging subsystem (structured logs, correlation IDs) [OK]',
    '[    0.000600] Spawning background service: curiosityd (continuous learning loop) [OK]',
    '[    0.000630] Spawning background service: reliabilityd (uptime + error budgets) [OK]',
    '[    0.000660] Spawning background service: learningd (books, docs, experiments) [OK]',
    '[    0.000690] Checking code style and linters (ESLint, Prettier, TypeScript) [OK]',
    '[    0.000720] Running unit and integration test suites (api, db, edge-cases) [OK]',
    '[    0.000750] Verifying production readiness of sample services (idempotency, retries) [OK]',
    '[    0.000780] Enabling power-saving mode for animations (60fps transform-only) [OK]',
    '[    0.000810] Prioritizing smooth UX and backend performance over visual gimmicks [OK]',
    '[    0.000840] Registering terminal window handler for whoami, projects, resume [OK]',
    '[    0.000870] Registering projects window handler for categorized project views [OK]',
    '[    0.000900] Registering system monitor window handler (skills-as-metrics) [OK]',
    '[    0.000930] Registering blog window handler for external post routing [OK]',
    '[    0.000960] Registering settings window handler (about, stack, environment) [OK]',
    '[    0.000990] Registering contact window handler (email, LinkedIn, GitHub) [OK]',
    '[    0.001020] Registering resume window handler (embedded pdf / download) [OK]',
    '[    0.001050] All core services scheduled for lazy start on first interaction [OK]',
    '[    0.001080] Warming up type checker, bundler, and cache for OS UI components [OK]',
    '[    0.001110] Compiling UI components with React + TypeScript (strict mode) [OK]',
    '[    0.001140] Establishing secure connection to viewer via TLS (portfolio mode) [OK]',
    '[    0.001170] Finalizing boot sequence and preparing graphical login session [OK]',
];

const facilities = [
    'kernel',
    'systemd[1]',
    'udevd[87]',
    'portfoliod[1337]',
    'networkd[101]',
    'db-init[202]',
    'scheduler[55]',
];

const subsystems = [
    'pci',
    'acpi',
    'ahci',
    'nvme',
    'eth0',
    'lo',
    'docker0',
    'cgroup',
    'vfs',
    'tls',
    'auth',
    'cache',
    'queue',
];

const portfolioResources = [
    '/srv/projects/url-shortener.service',
    '/srv/projects/notes-api.service',
    '/srv/projects/auth-microservice',
    '/srv/projects/expense-tracker',
    '/srv/skills/backend',
    '/srv/skills/databases',
    '/srv/skills/linux',
    '/srv/blog',
    '/srv/resume/resume.pdf',
    '/opt/tooling/ci-cd',
    '/opt/tooling/observability',
];

const actions = [
    'initializing',
    'attaching',
    'mounting',
    'configuring',
    'warming cache for',
    'performing health-check on',
    'scheduling lazy-load for',
    'preloading metadata for',
    'registering service endpoint',
    'optimizing cold-start for',
];

const resultDetails = [
    'latency-target=low jitter=stable',
    'throughput-mode=balanced',
    'retry-policy=exponential-backoff',
    'priority=backend-first',
    'mode=read-mostly with write-safe paths',
    'observability=logs+metrics+traces',
    'security=hardened with least-privilege',
    'cache=strategy=lrucache+ttl',
    'autoscaling=manual for portfolio demo',
    'profiling=enabled for slow-paths only',
];

function pseudoHex(i: number): string {
    return (0x1000 + i * 17).toString(16);
}

function generateBootLines(): string[] {
    const lines: string[] = [...BASE_PREFIX_LINES];

    for (let i = lines.length; i < BOOT_LINE_COUNT - 2; i++) {
        const timestamp = (0.0012 + i * 0.00005).toFixed(6);

        const facility = facilities[i % facilities.length];
        const subsys = subsystems[i % subsystems.length];
        const resource = portfolioResources[i % portfolioResources.length];
        const action = actions[i % actions.length];
        const detail = resultDetails[i % resultDetails.length];
        const hexId = pseudoHex(i);
        const unitId = `unit-${(i % 32).toString(16).padStart(2, '0')}`;
        const cpuCore = i % 4;

        const message =
            `${subsys} 0000:00:${(i % 32).toString(16).padStart(2, '0')}.${i % 8}: ` +
            `${action} ${resource} (id=0x${hexId}, ${unitId}, cpu=${cpuCore}) ` +
            `${detail}`;

        const line = `[    ${timestamp}] ${facility}: ${message} [OK]`;
        lines.push(line);
    }

    lines.push('Starting khwahish-portfolio.service... [OK]');
    lines.push('Loading user profile... [OK]');

    return lines;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const lines = useMemo(() => generateBootLines(), []);
    const { visibleLines } = useBoot({
        lineCount: lines.length,
        durationMs: BOOT_DURATION_MS,
        postHoldMs: 1000,
        onComplete,
    });

    const viewportRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!viewportRef.current) return;
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }, [visibleLines]);

    const { play, playFromGesture,  stop } = useAudioSync({
        src: '/assets/audio/boot-sfx.mp3',
        volume: 1,
        loop: false,
    });

    useEffect(() => {
        let cancelled = false;

        const start = async () => {
            try {
                if (!cancelled) {
                    await play();
                }
            } catch {
            }
        };

        start();

        return () => {
            cancelled = true;
            stop();
        };
    }, [play, stop]);

    useEffect(() => {
        let used = false;

        const handleUserGesture = () => {
            if (used) return;
            used = true;
            void playFromGesture();
        };

        window.addEventListener('pointerdown', handleUserGesture, { once: true });
        window.addEventListener('keydown', handleUserGesture, { once: true });

        return () => {
            window.removeEventListener('pointerdown', handleUserGesture);
            window.removeEventListener('keydown', handleUserGesture);
        };
    }, [playFromGesture]);

    return (
        <div
            className={styles.bootRoot}
            aria-label="Booting khwahish portfolio environment"
        >
            <div className={styles.logViewport} ref={viewportRef}>
                <div className={styles.logText}>
                    {lines.slice(0, visibleLines).map((rawLine, index) => {
                        let timestampPart = '';
                        let messagePart = rawLine;
                        let statusPart = '';

                        const tsMatch = rawLine.match(/^\[(.+?)\]\s*(.*)$/);
                        if (tsMatch) {
                            timestampPart = `[${tsMatch[1]}]`;
                            messagePart = tsMatch[2];
                        }

                        const statusMatch = messagePart.match(/\s+\[([A-Z]+)\]\s*$/);
                        if (statusMatch) {
                            statusPart = `[${statusMatch[1]}]`;
                            messagePart = messagePart.slice(
                                0,
                                messagePart.length - statusMatch[0].length
                            );
                        }

                        return (
                            <div key={index} className={styles.line}>
                                {timestampPart && (
                                    <span className={styles.timestamp}>{timestampPart}</span>
                                )}
                                {messagePart && (
                                    <span className={styles.message}>
                    {timestampPart ? ' ' : ''}
                                        {messagePart}
                  </span>
                                )}
                                {statusPart && (
                                    <span className={styles.statusOk}> {statusPart}</span>
                                )}
                                {!timestampPart && !statusPart && !messagePart && '\u00A0'}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BootScreen;
