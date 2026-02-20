'use client';

import { useEffect, useRef } from 'react';
import styles from './Skills.module.scss';

const SKILL_GROUPS = [
    {
        category: 'Core Frontend',
        skills: ['HTML5', 'CSS3', 'SASS/SCSS', 'TailwindCSS', 'Next.js', 'GSAP'],
    },
    {
        category: 'Design & UI',
        skills: ['Figma', 'Storybook', 'Component Libraries', 'Visual Excellence'],
    },
    {
        category: 'Workflow & Tools',
        skills: ['Git', 'GitHub', 'Lighthouse optimization', 'Vercel', 'UI Architecture'],
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
                gsap.from('[data-skill-category]', {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                });

                gsap.from('[data-skill-badge]', {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    },
                });
            }, sectionRef);

            return () => ctx.revert();
        };

        initGsap();
    }, []);

    return (
        <section id="skills" className={styles.skills} ref={sectionRef}>
            <div className={styles.container}>
                <div className="section-label" data-skill-category>Expertise</div>
                <h2 className="section-title" data-skill-category>Technologies & Skills</h2>
                <p className="section-subtitle" data-skill-category>
                    A snapshot of the tools and technologies I use to bring modern, scalable, and high-performance user interfaces to life.
                </p>

                <div className={styles.grid}>
                    {SKILL_GROUPS.map((group) => (
                        <div key={group.category} className={styles.category} data-skill-category>
                            <h3 className={styles.categoryTitle}>{group.category}</h3>
                            <div className={styles.skillList}>
                                {group.skills.map((skill) => (
                                    <div key={skill} className={styles.skillBadge} data-skill-badge>
                                        <CheckIcon />
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
