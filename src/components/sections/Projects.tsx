'use client';

import { useEffect, useRef } from 'react';
import styles from './Projects.module.scss';

// External Link Icon
const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

// GitHub Icon
const GithubIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

// NPM Icon (Package)
const NpmIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

const PROJECTS = [
    {
        name: 'TokVista',
        label: 'Open Source NPM Package',
        description: 'An open-source package that transforms Figma design tokens into interactive visual documentation. Built with AI-assisted development, featuring copy-ready CSS variables and a live interactive playground.',
        tags: ['Design Tokens', 'Figma', 'React', 'Storybook', 'NPM'],
        demoUrl: 'https://nibin-org.github.io/tokvista',
        githubUrl: 'https://github.com/nibin-org/tokvista',
        npmUrl: 'https://npmjs.com/package/tokvista',
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const initGsap = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                gsap.from('[data-project-reveal]', {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                });
            }, sectionRef);

            return () => ctx.revert();
        };

        initGsap();
    }, []);

    return (
        <section id="projects" className={styles.projects} ref={sectionRef}>
            <div className={styles.container}>
                <div className="section-label">Selected work</div>
                <h2 className="section-title">Case Studies & Libraries</h2>
                <p className="section-subtitle">
                    A curated selection of projects that demonstrate my approach to UI engineering, system architecture, and user experience.
                </p>

                <div className={styles.featuredGrid}>
                    {PROJECTS.map((project) => (
                        <div key={project.name} className={styles.card} data-project-reveal>
                            <div className={styles.cardImage} aria-hidden="true" />
                            <div className={styles.cardBody}>
                                <span className={styles.projectLabel}>{project.label}</span>
                                <h3 className={styles.projectName}>{project.name}</h3>
                                <p className={styles.projectDesc}>{project.description}</p>

                                <div className={styles.tags}>
                                    {project.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>{tag}</span>
                                    ))}
                                </div>

                                <div className={styles.links}>
                                    <a href={project.demoUrl} className={styles.link} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.name}`}>
                                        <ExternalIcon /> Live Demo
                                    </a>
                                    <a href={project.githubUrl} className={styles.link} target="_blank" rel="noopener noreferrer" aria-label={`View source code of ${project.name} on GitHub`}>
                                        <GithubIcon /> GitHub
                                    </a>
                                    <a href={project.npmUrl} className={styles.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} package on NPM`}>
                                        <NpmIcon /> NPM Package
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
