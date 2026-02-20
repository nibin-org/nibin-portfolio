'use client';

import { useEffect, useRef } from 'react';
import styles from './Experience.module.scss';

const EXPERIENCE = [
    {
        role: 'Senior UI Engineer',
        company: 'Global Tech Solutions',
        period: '2023 — Present',
        description: [
            'Leading the development of a multi-brand Design System using Next.js and SCSS.',
            'Architecting scalable component libraries with a focus on accessibility (WCAG) and performance.',
            'Mentoring junior developers on UI best practices and modern CSS architectures.',
        ],
        stack: ['Next.js', 'TypeScript', 'SASS', 'Storybook', 'GSAP'],
    },
    {
        role: 'UI Engineer',
        company: 'Innovate Digital',
        period: '2021 — 2023',
        description: [
            'Built complex dashboard interfaces and interactive data visualization components.',
            'Migrated legacy frontend codebases to modern React-based architectures.',
            'Collaborated closely with designers to implement token-driven design workflows.',
        ],
        stack: ['React', 'Redux', 'TailwindCSS', 'Figma', 'Jest'],
    },
    {
        role: 'Frontend Developer',
        company: 'Creative Media Agency',
        period: '2019 — 2021',
        description: [
            'Developed high-fidelity landing pages and marketing sites with smooth animations.',
            'Optimized website performance, improving Lighthouse scores by an average of 30%.',
            'Implemented responsive designs that worked seamlessly across all device types.',
        ],
        stack: ['JavaScript', 'SASS', 'GSAP', 'WordPress', 'Lighthouse'],
    },
    {
        role: 'Associate UI Developer',
        company: 'Tech Startup Kerala',
        period: '2018 — 2019',
        description: [
            'Focused on pixel-perfect implementation of UI components from PSD/Figma designs.',
            'Supported the frontend team in building reusable UI patterns.',
        ],
        stack: ['HTML5', 'CSS3', 'jQuery', 'Bootstrap'],
    },
    {
        role: 'Junior Frontend Intern',
        company: 'Web Solutions Inc',
        period: '2018 (6 Months)',
        description: [
            'Learned the fundamentals of web development and professional workflows.',
            'Assisted in fixing UI bugs and implementing small features.',
        ],
        stack: ['HTML', 'CSS', 'JavaScript'],
    },
];

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const initGsap = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                const items = gsap.utils.toArray('[data-experience-item]');

                items.forEach((item: any) => {
                    gsap.from(item, {
                        x: -20,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                        },
                    });
                });
            }, sectionRef);

            return () => ctx.revert();
        };

        initGsap();
    }, []);

    return (
        <section id="experience" className={styles.experience} ref={sectionRef}>
            <div className={styles.container}>
                <div className="section-label">Trajectory</div>
                <h2 className="section-title">Professional Experience</h2>
                <p className="section-subtitle">
                    A chronological journey through my career as a UI Engineer, focusing on growth, architecture, and design systems.
                </p>

                <div className={styles.timeline}>
                    {EXPERIENCE.map((job, index) => (
                        <div key={`${job.company}-${index}`} className={styles.item} data-experience-item>
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
