'use client';

import { useEffect, useRef } from 'react';
import styles from './Experience.module.scss';

const EXPERIENCE = [
    {
        role: 'Frontend Developer / UI Engineer',
        company: 'Quintet Solutions',
        period: 'Aug 2023 — Present',
        description: [
            'Architected a scalable, token-driven design system using Figma tokens via a GitHub pipeline.',
            'Developed and maintained a reusable React/Next.js component library in Storybook.',
            'Structured scalable SCSS architecture for large-scale applications, reducing conflicts.',
            'Optimized frontend performance (Lighthouse), improving scores from 60 to 95.',
            'Collaborated in Agile/Sprint environments using ClickUp, Linear, and Slack.',
        ],
        stack: ['Next.js', 'TypeScript', 'SCSS', 'Storybook', 'Figma Tokens'],
    },
    {
        role: 'UI/UX Developer',
        company: 'Intersmart Solutions',
        period: 'Aug 2022 — Aug 2023',
        description: [
            'Delivered 50+ fully responsive static and e-commerce websites.',
            'Built high-fidelity UI layouts using HTML5, CSS3, SASS.',
            'Implemented interactive animations using GSAP.',
            'Ensured mobile-first responsive design across all devices.',
        ],
        stack: ['HTML5', 'SASS', 'GSAP', 'Responsive Design'],
    },
    {
        role: 'UI/UX Developer',
        company: 'Pentacodes IT Solutions',
        period: 'Jan 2022 — Aug 2022',
        description: [
            'Delivered 20+ static and e-commerce projects.',
            'Introduced SASS-based styling architecture replacing traditional CSS.',
            'Implemented Git version control workflow within the frontend team.',
        ],
        stack: ['SASS', 'Git', 'E-commerce UI'],
    },
    {
        role: 'UI/UX Developer',
        company: 'Pemmin Dyad',
        period: 'Aug 2021 — Dec 2021',
        description: [
            'Delivered 10+ projects including in-house tools.',
            'Optimized existing web applications under senior mentorship.',
        ],
        stack: ['UI Optimization', 'Web Tools'],
    },
    {
        role: 'Junior Web Developer',
        company: 'Medizome Healthlink India',
        period: 'July 2020 — July 2021',
        description: [
            'Assisted in web development projects and maintaining company websites.',
            'Recognized twice as Best Employee of the Month.',
        ],
        stack: ['Web Maintenance', 'Frontend Basics'],
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx: any;
        const initGsap = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Progress Line Animation
                if (lineRef.current && timelineRef.current) {
                    gsap.to(lineRef.current, {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 40%',
                            end: 'bottom 40%',
                            scrub: 0.5, // Smoother progress
                        },
                    });
                }

                // Markers Activation
                const markers = gsap.utils.toArray('[data-experience-marker]');
                markers.forEach((marker: any) => {
                    ScrollTrigger.create({
                        trigger: marker,
                        start: 'top 40%',
                        onEnter: () => marker.classList.add(styles.active),
                        onLeaveBack: () => marker.classList.remove(styles.active),
                    });
                });

                // Items Reveal
                const items = gsap.utils.toArray('[data-experience-item]');
                items.forEach((item: any) => {
                    gsap.from(item, {
                        y: 20,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 90%',
                        },
                    });
                });
            }, sectionRef);
        };

        const initPromise = initGsap();
        return () => {
            initPromise.then(() => ctx?.revert());
        };
    }, []);

    return (
        <section id="experience" className={styles.experience} ref={sectionRef}>
            <div className={styles.container}>
                <div className="section-label">Trajectory</div>
                <h2 className="section-title">Professional Experience</h2>
                <p className="section-subtitle">
                    A chronological journey through my career as a UI Engineer, focusing on growth, architecture, and design systems.
                </p>

                <div className={styles.timeline} ref={timelineRef}>
                    <div className={styles.progressTrack}>
                        <div className={styles.progressLine} ref={lineRef} />
                    </div>

                    {EXPERIENCE.map((job, index) => (
                        <div key={`${job.company}-${index}`} className={styles.item} data-experience-item>
                            <div className={styles.marker} data-experience-marker />
                            <div className={styles.header}>
                                <span className={styles.period}>{job.period}</span>
                                <h3 className={styles.role}>{job.role}</h3>
                                <span className={styles.company}>{job.company}</span>
                            </div>
                            <div className={styles.description}>
                                <ul>
                                    {job.description.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.techStack}>
                                {job.stack.map((tech) => (
                                    <span key={tech} className={styles.techTag}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
