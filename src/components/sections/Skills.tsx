'use client';

import { useEffect, useRef } from 'react';
import styles from './Skills.module.scss';

const SKILL_GROUPS = [
    {
        category: 'Markup & Styling',
        skills: ['HTML5', 'CSS3', 'SASS/SCSS', 'TailwindCSS', 'GSAP', 'AOS', 'Swiper.js'],
    },
    {
        category: 'UI Development',
        skills: ['React.js', 'Next.js', 'Component Architecture'],
    },
    {
        category: 'Design Systems',
        skills: ['Figma', 'Figma Design Tokens', 'Token-driven Architecture', 'Storybook', 'Component Libraries'],
    },
];

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const initGsap = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                    },
                });

                tl.from('[data-skill-reveal]', {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                })
                    .from('[data-skill-badge]', {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.4,
                        stagger: 0.02,
                        ease: 'back.out(1.7)',
                    }, '-=0.4');
            }, sectionRef);

            return () => ctx.revert();
        };

        initGsap();
    }, []);

    return (
        <section id="skills" className={styles.skills} ref={sectionRef}>
            <div className={styles.container}>
                <div className="section-label" data-skill-reveal>Expertise</div>
                <h2 className="section-title" data-skill-reveal>Technologies & Skills</h2>
                <p className="section-subtitle" data-skill-reveal>
                    A snapshot of the tools and technologies I use to bring modern, scalable, and high-performance user interfaces to life.
                </p>

                <div className={styles.grid}>
                    {SKILL_GROUPS.map((group) => (
                        <div key={group.category} className={styles.category} data-skill-reveal>
                            <h3 className={styles.categoryTitle}>{group.category}</h3>
                            <div className={styles.skillList}>
                                {group.skills.map((skill) => (
                                    <div key={skill} className={styles.skillBadge} data-skill-badge>
                                        <div className={styles.skillBadge__icon} aria-hidden="true">
                                            <CheckIcon />
                                        </div>
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
