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
    { number: '5.6+', label: 'Years Experience' },
    { number: '80+', label: 'Projects Delivered' },
    { number: '95+', label: 'Lighthouse Score' },
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const roleRef = useRef<HTMLSpanElement>(null);
    const [resumeOpen, setResumeOpen] = useState(false);
    const handleResumeClose = useCallback(() => setResumeOpen(false), []);

    useEffect(() => {
        const initGsap = async () => {
            const { gsap } = await import('gsap');
            const { TextPlugin } = await import('gsap/TextPlugin');
            gsap.registerPlugin(TextPlugin);

            const ctx = gsap.context(() => {
                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                // Entrance animations
                tl.from('[data-hero-badge]', { y: 20, opacity: 0, duration: 0.6 })
                    .from('[data-hero-name]', { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
                    .from('[data-hero-title]', { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
                    .from('[data-hero-tagline]', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
                    .from('[data-hero-cta]', { y: 20, opacity: 0, duration: 0.5 }, '-=0.4')
                    .from('[data-hero-stats]', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
                    .from('[data-scroll-hint]', { opacity: 0, duration: 0.6 }, '-=0.2');

                // Typing Animation Loop
                const roleTl = gsap.timeline({ repeat: -1 });

                ROLES.forEach((role) => {
                    roleTl.to(roleRef.current, {
                        duration: 1.5,
                        text: role,
                        delay: 0.5,
                        ease: "none"
                    }).to(roleRef.current, {
                        duration: 0.8,
                        text: "",
                        delay: 2, // Hold before backspacing
                        ease: "none"
                    });
                });
            }, sectionRef);

            return () => ctx.revert();
        };

        initGsap();
    }, []);

    return (
        <>
            <section id="hero" className={styles.hero} ref={sectionRef}>
                {/* Background effects */}
                <div className={styles.bg} aria-hidden="true" />
                <div className={`${styles.glow} ${styles['glow--primary']}`} aria-hidden="true" />
                <div className={`${styles.glow} ${styles['glow--secondary']}`} aria-hidden="true" />

                {/* Main content */}
                <div className={styles.content} ref={contentRef}>

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
                        Professional <span className={styles.highlight} ref={roleRef}></span>
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

                    {/* Stats */}
                    <div className={styles.stats} data-hero-stats>
                        {STATS.map(({ number, label }) => (
                            <div key={label} className={styles.stat}>
                                <span className={styles.stat__number}>{number}</span>
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
