'use client';

import { useEffect, useRef } from 'react';
import styles from './About.module.scss';

// Simple icons
const IconExp = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);
const IconLoc = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);
const IconTarget = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
);
const IconZap = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const STATS = [
    { label: 'Experience', value: '5.6+ Years', icon: <IconExp /> },
    { label: 'Location', value: 'Kottayam, Kerala', icon: <IconLoc /> },
    { label: 'Focus', value: 'Design Systems', icon: <IconTarget /> },
    { label: 'Platform', value: 'React / Next.js', icon: <IconZap /> },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const codeContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initGsap = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            let terminalRect: DOMRect | null = null;
            const updateRect = () => {
                if (terminalRef.current) {
                    terminalRect = terminalRef.current.getBoundingClientRect();
                }
            };

            const ctx = gsap.context(() => {
                // Section Reveal
                gsap.from('[data-about-reveal]', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                });

                // Typing Animation
                const codeLines = codeContainerRef.current?.querySelectorAll('[data-code-line]');
                if (codeLines) {
                    const typingTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: terminalRef.current,
                            start: 'top 70%',
                        },
                    });

                    codeLines.forEach((line) => {
                        typingTl.fromTo(line,
                            { opacity: 0, x: -5 },
                            { opacity: 1, x: 0, duration: 0.05 },
                            ">"
                        );
                    });
                }

                // 3D Tilt Effect - Optimized: Cache rect to avoid forced reflows
                // Initial measurement
                updateRect();
                window.addEventListener('resize', updateRect);

                const handleMouseMove = (e: MouseEvent) => {
                    if (!terminalRef.current || !terminalRect) return;

                    const x = e.clientX - terminalRect.left;
                    const y = e.clientY - terminalRect.top;
                    const centerX = terminalRect.width / 2;
                    const centerY = terminalRect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;

                    gsap.to(terminalRef.current, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        duration: 0.5,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(terminalRef.current, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.3)'
                    });
                };

                const terminalArea = terminalRef.current?.parentElement;
                terminalArea?.addEventListener('mousemove', handleMouseMove);
                terminalArea?.addEventListener('mouseleave', handleMouseLeave);

                // Floating Orbs Animation
                gsap.to('[data-orb]', {
                    y: 'random(-20, 20)',
                    x: 'random(-20, 20)',
                    duration: 'random(3, 5)',
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    stagger: {
                        each: 0.5,
                        from: 'random'
                    }
                });

            }, sectionRef);

            return () => {
                ctx.revert();
                window.removeEventListener('resize', updateRect);
            };
        };

        const cleanupPromise = initGsap();

        return () => {
            cleanupPromise.then(cleanup => cleanup?.());
        };
    }, []);

    return (
        <section id="about" className={styles.about} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.textSide}>
                        <div className="section-label" data-about-reveal>About Me</div>
                        <h2 className="section-title" data-about-reveal>
                            Engineer by profession, <span className={styles.highlight}>designer by heart.</span>
                        </h2>

                        <div className={styles.bio} data-about-reveal>
                            <p>
                                I am <strong>Nibin Kurian</strong>, a Frontend Developer and UI Engineer with <strong>5.6+ years</strong> of experience
                                building scalable web applications using <strong>React, Next.js, and SASS</strong>.
                            </p>
                            <p>
                                I specialize in <strong>Design Systems</strong> and <strong>token-driven UI architecture</strong>.
                                My approach combines visual excellence from Figma with technical rigor, resulting in
                                performant component libraries that improve project maintainability.
                            </p>
                            <p>
                                I have a proven track record of optimizing frontend performance, successfully raising
                                Lighthouse scores from <strong>60 to 95</strong> for large-scale applications.
                            </p>
                        </div>

                        <div className={styles.statGrid}>
                            {STATS.map((stat) => (
                                <div key={stat.label} className={styles.statCard} data-about-reveal>
                                    <div className={styles.statCard__icon} aria-hidden="true">{stat.icon}</div>
                                    <div className={styles.statCard__info}>
                                        <span className={styles.statCard__label}>{stat.label}</span>
                                        <span className={styles.statCard__value}>{stat.value}</span>
                                    </div>
                                    <div className={styles.statCard__glow} aria-hidden="true" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.visualSide} data-about-reveal>
                        {/* Mesh Gradients & Orbs */}
                        <div className={styles.meshContainer} aria-hidden="true">
                            <div className={`${styles.orb} ${styles.orb1}`} data-orb />
                            <div className={`${styles.orb} ${styles.orb2}`} data-orb />
                            <div className={`${styles.orb} ${styles.orb3}`} data-orb />
                        </div>

                        {/* 3D Glass Terminal */}
                        <div className={styles.terminalWrapper}>
                            <div className={styles.terminal} ref={terminalRef}>
                                <div className={styles.terminalHeader}>
                                    <div className={styles.terminalDots} aria-hidden="true">
                                        <span /> <span /> <span />
                                    </div>
                                    <div className={styles.terminalTitle}>nibin.config.js</div>
                                </div>
                                <div className={styles.terminalBody} ref={codeContainerRef}>
                                    <pre className={styles.code}>
                                        <code>
                                            <span data-code-line><span className={styles.tokenKw}>export default</span> {'{'}{'\n'}</span>
                                            <span data-code-line>{'  '}name: <span className={styles.tokenStr}>&apos;Nibin Kurian&apos;</span>,{'\n'}</span>
                                            <span data-code-line>{'  '}location: <span className={styles.tokenStr}>&apos;Kottayam, IN&apos;</span>,{'\n'}</span>
                                            <span data-code-line>{'  '}expertise: [<span className={styles.tokenStr}>&apos;UI Engineering&apos;</span>, <span className={styles.tokenStr}>&apos;Design System Architect&apos;</span>],{'\n'}</span>
                                            <span data-code-line>{'  '}focus: <span className={styles.tokenStr}>&apos;Scale & Performance&apos;</span>,{'\n'}</span>
                                            <span data-code-line>{'  '}stack: [<span className={styles.tokenStr}>&apos;Next.js&apos;</span>, <span className={styles.tokenStr}>&apos;GSAP&apos;</span>, <span className={styles.tokenStr}>&apos;SASS&apos;</span>],{'\n'}</span>
                                            <span data-code-line>{'  '}mindset: <span className={styles.tokenStr}>&apos;Design-to-Code Excellence&apos;</span>,{'\n'}</span>
                                            <span data-code-line>{'}'};</span>
                                        </code>
                                    </pre>
                                </div>
                                <div className={styles.terminalGlow} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
