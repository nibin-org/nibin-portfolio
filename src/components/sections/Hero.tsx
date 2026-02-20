'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ResumeDrawer from '../ui/ResumeDrawer';
import styles from './Hero.module.scss';

// Arrow right icon
const ArrowRightIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
    </svg>
);

// Mail icon
const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

// File (resume) icon
const FileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);

const ROLES = ['Frontend Developer', 'UI Engineer', 'Design System Architect'];

const STATS = [
    { value: 5.6, decimals: 1, suffix: '+', label: 'Years Experience' },
    { value: 80, decimals: 0, suffix: '+', label: 'Projects Delivered' },
    { value: 95, decimals: 0, suffix: '+', label: 'Lighthouse Score' },
];

const FOCUS_AREAS = [
    'Design Systems',
    'Token Architecture',
    'Component Libraries',
    'Frontend Performance',
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [resumeOpen, setResumeOpen] = useState(false);
    const [roleText, setRoleText] = useState(ROLES[0]);
    const [statValues, setStatValues] = useState([0, 0, 0]);
    const handleResumeClose = useCallback(() => setResumeOpen(false), []);

    useEffect(() => {
        let cleanup: (() => void) | undefined;

        const initGsap = async () => {
            const { gsap } = await import('gsap');

            const ctx = gsap.context(() => {
                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                // Entrance animations
                tl.from('[data-hero-badge]', { y: 20, opacity: 0, duration: 0.6 })
                    .from('[data-hero-name]', { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
                    .from('[data-hero-title]', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
                    .from('[data-hero-tagline]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
                    .from('[data-hero-cta]', { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
                    .from('[data-hero-panel]', { x: 28, opacity: 0, duration: 0.6 }, '-=0.45')
                    .from('[data-hero-stats]', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
                    .from('[data-scroll-hint]', { opacity: 0, duration: 0.6 }, '-=0.2');
            }, sectionRef);

            cleanup = () => ctx.revert();
        };

        initGsap();

        return () => cleanup?.();
    }, []);

    useEffect(() => {
        let roleIndex = 0;
        let charIndex = ROLES[0].length;
        let isDeleting = false;
        let timer: ReturnType<typeof setTimeout>;

        const tick = () => {
            const currentRole = ROLES[roleIndex];

            if (isDeleting) {
                charIndex -= 1;
                setRoleText(currentRole.slice(0, Math.max(charIndex, 0)));

                if (charIndex <= 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % ROLES.length;
                    timer = setTimeout(tick, 250);
                    return;
                }

                timer = setTimeout(tick, 45);
                return;
            }

            const nextRole = ROLES[roleIndex];
            charIndex += 1;
            setRoleText(nextRole.slice(0, Math.min(charIndex, nextRole.length)));

            if (charIndex >= nextRole.length) {
                isDeleting = true;
                timer = setTimeout(tick, 1400);
                return;
            }

            timer = setTimeout(tick, 70);
        };

        // Keep first role visible briefly before looping.
        timer = setTimeout(() => {
            isDeleting = true;
            tick();
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!statsRef.current) return;

        const targets = STATS.map((stat) => stat.value);
        const durationMs = 1400;
        let rafId = 0;

        const animate = () => {
            const startedAt = performance.now();

            const update = (time: number) => {
                const progress = Math.min((time - startedAt) / durationMs, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                setStatValues(targets.map((target) => target * eased));

                if (progress < 1) {
                    rafId = requestAnimationFrame(update);
                }
            };

            rafId = requestAnimationFrame(update);
        };

        // Sync counter with hero entrance so numbers animate when visible.
        setStatValues([0, 0, 0]);
        const startTimer = setTimeout(animate, 1750);

        return () => {
            clearTimeout(startTimer);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const formattedStats = STATS.map((stat, index) => {
        const current = statValues[index] ?? 0;
        const rounded = stat.decimals > 0 ? current.toFixed(stat.decimals) : `${Math.round(current)}`;
        return `${rounded}${stat.suffix}`;
    });

    return (
        <>
            <section id="hero" className={styles.hero} ref={sectionRef}>
                {/* Background effects */}
                <div className={styles.bg} aria-hidden="true" />
                <div className={`${styles.glow} ${styles['glow--primary']}`} aria-hidden="true" />
                <div className={`${styles.glow} ${styles['glow--secondary']}`} aria-hidden="true" />

                {/* Main content */}
                <div className={styles.content} ref={contentRef}>
                    <div className={styles.heroTop}>
                        <div className={styles.copy}>
                            {/* Status badge */}
                            <div className={styles.badge} data-hero-badge>
                                <span className={styles.dot} />
                                Available for new opportunities
                            </div>

                            {/* Name */}
                            <h1 className={styles.name} data-hero-name>
                                Hi, I&apos;m{' '}
                                <span className={styles.accent}>Nibin Kurian.</span>
                            </h1>

                            {/* Title with Typing Animation */}
                            <p className={styles.title} data-hero-title>
                                Professional <span className={styles.highlight}>{roleText}</span>
                            </p>

                            {/* Tagline */}
                            <p className={styles.tagline} data-hero-tagline>
                                Frontend Developer with 5.6+ years of experience building scalable web applications. Specialized in design systems, token-driven UI architecture, and reusable component libraries.
                            </p>

                            {/* CTA buttons */}
                            <div className={styles.cta} data-hero-cta>
                                <a href="#projects" className={styles.btnPrimary}>
                                    View Work <ArrowRightIcon />
                                </a>
                                <a href="#contact" className={styles.btnGhost}>
                                    Contact Me <MailIcon />
                                </a>
                                <button
                                    className={styles.btnResume}
                                    onClick={() => setResumeOpen(true)}
                                    aria-label="View resume"
                                >
                                    <FileIcon />
                                    View Resume
                                </button>
                            </div>
                        </div>

                        <aside className={styles.sidePanel} data-hero-panel aria-hidden="true">
                            <p className={styles.sidePanel__eyebrow}>Core Focus</p>
                            <h2 className={styles.sidePanel__title}>Building UI systems that scale across products and teams.</h2>
                            <ul className={styles.sidePanel__list} role="list">
                                {FOCUS_AREAS.map((item) => (
                                    <li key={item} className={styles.sidePanel__item}>{item}</li>
                                ))}
                            </ul>
                        </aside>
                    </div>

                    {/* Stats */}
                    <div className={styles.stats} data-hero-stats ref={statsRef}>
                        {STATS.map(({ label }, index) => (
                            <div key={label} className={styles.stat}>
                                <span className={styles.stat__number}>{formattedStats[index]}</span>
                                <span className={styles.stat__label}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll hint */}
                <div className={styles.scrollHint} aria-hidden="true" data-scroll-hint>
                    <span>scroll</span>
                    <div className={styles.mouse} />
                </div>
            </section>

            <ResumeDrawer isOpen={resumeOpen} onClose={handleResumeClose} />
        </>
    );
}
