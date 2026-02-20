'use client';

import { useEffect, useRef } from 'react';
import styles from './About.module.scss';

const STATS = [
    { label: 'Experience', value: '5.6+ Years' },
    { label: 'Location', value: 'Kottayam, Kerala' },
    { label: 'Focus', value: 'Design Systems' },
    { label: 'Frameworks', value: 'Next.js / React' },
];

const CODE_SNIPPET = `const nibin = {
  role: "UI Engineer",
  mindset: "Design Systems",
  location: "Kottayam, IN",
  passion: [
    "Clean Architecture",
    "Component Libraries",
    "Tailored User Experiences"
  ],
  yearsOfExperience: 5.6
};`;

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const initGsap = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                gsap.from('[data-about-reveal]', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                });
            }, sectionRef);

            return () => ctx.revert();
        };

        initGsap();
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
                                I am <strong>Nibin Kurian</strong>, a UI Engineer with <strong>5.6+ years</strong> of experience
                                dedicated to bridging the gap between design and code. Based in the scenic town of
                                <strong> Kottayam, Kerala</strong>, I specialize in building robust UI architectures.
                            </p>
                            <p>
                                My core passion lies in <strong>Design Systems</strong> and <strong>Component Libraries</strong>.
                                I believe in the power of consistency, token-driven design, and creating scalable foundations
                                that empower both developers and designers.
                            </p>
                            <p>
                                When I&apos;m not crafting pixel-perfect components, I&apos;m focused on
                                <strong> performance optimization</strong> and ensuring interfaces are accessible,
                                intuitive, and high-performing.
                            </p>
                        </div>

                        <div className={styles.statGrid} data-about-reveal>
                            {STATS.map((stat) => (
                                <div key={stat.label} className={styles.statCard}>
                                    <span className={styles.statCard__label}>{stat.label}</span>
                                    <span className={styles.statCard__value}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.imageSide} data-about-reveal>
                        <pre className={styles.placeholderCode}>
                            <code>{CODE_SNIPPET}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
