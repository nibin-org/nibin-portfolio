'use client';

import { useEffect, useRef, useState } from 'react';
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
        category: 'package',
        label: 'Open Source NPM Package',
        description: 'A powerful design system tool that transforms Figma design tokens into interactive documentation. Features real-time token visualization, semantic theme support, and a developer-first sandbox.',
        tags: ['Design Systems', 'Figma', 'React', 'NPM', 'Storybook'],
        demoUrl: 'https://nibin-org.github.io/tokvista',
        githubUrl: 'https://github.com/nibin-org/tokvista',
        npmUrl: 'https://npmjs.com/package/tokvista',
        image: '/images/projects/tokvista.png',
    },
    {
        name: 'Pushpagiri Medical College',
        category: 'website',
        label: 'Healthcare Institution',
        description: 'Official portal for Pushpagiri Medical College Hospital. Features a modern, accessible UI with easy access to departments, IP/OP services, and doctor directories.',
        tags: ['Branding', 'UI/UX', 'Medical', 'Service Design'],
        demoUrl: 'https://www.pushpagiri.in/',
        image: '/images/projects/pushpagiri.png',
    },
    {
        name: 'GEMS Modern Academy',
        category: 'website',
        label: 'Educational Institution',
        description: 'A premium international school website for GEMS Modern Academy Kochi. Features a modern, content-rich design with multi-level navigation and student-centric storytelling.',
        tags: ['Education', 'UI Design', 'GEMS', 'Responsive'],
        demoUrl: 'https://www.gemsmodernacademy-kochi.in/',
        image: '/images/projects/gems.png',
    },
    {
        name: 'Asha Sharath Collections',
        category: 'website',
        label: 'E-commerce / Fashion',
        description: 'A premium e-commerce platform for unique dance costumes and jewellery. Features a clean, high-end shopping experience with integrated promotional systems and customer engagement.',
        tags: ['E-commerce', 'Fashion', 'Payment Integration', 'Asha Sharath'],
        demoUrl: 'https://www.ashasharathcollections.com/en',
        image: '/images/projects/ashasharath.png',
    },
    {
        name: 'Etihad Hospitality',
        category: 'website',
        label: 'Hospitality & Catering',
        description: 'A luxurious hospitality and catering services portal based in Abu Dhabi. Showcases premium event management, sector-specific solutions, and strategic partnerships across the UAE.',
        tags: ['Hospitality', 'Luxury', 'Service Portals', 'UAE'],
        demoUrl: 'https://etihadhospitality.ae/en',
        image: '/images/projects/etihad.png',
    },
    {
        name: 'BMIM Management Institute',
        category: 'website',
        label: 'Educational Institution',
        description: 'A professional management institute portal. Features a dynamic student/faculty ecosystem with real-time updates, admissions management, and a comprehensive resource library.',
        tags: ['Education', 'Management', 'Portal', 'Responsive'],
        demoUrl: 'https://www.bmim.org/',
        image: '/images/projects/bmim.png',
    },
    {
        name: '800Truck Logistics',
        category: 'website',
        label: 'Logistics / Moving Services',
        description: 'A comprehensive logistics and moving platform in the UAE. Features real-time rate calculation, truck search by location, and integrated storage and handyman service management.',
        tags: ['Logistics', 'E-commerce', 'Service Platform', 'Dubai'],
        demoUrl: 'https://www.800truck.ae/en',
        image: '/images/projects/800truck.png',
    },
    {
        name: 'Creative Florist',
        category: 'website',
        label: 'E-commerce / Floral',
        description: 'A premium floral e-commerce experience in the UAE. Features occasion-based shopping, integrated WhatsApp support, and a high-conversion floral storefront.',
        tags: ['E-commerce', 'Service Design', 'Retail', 'UAE'],
        demoUrl: 'https://uae.creativefloristdxb.com/',
        image: '/images/projects/florist.png',
    },
    {
        name: 'Personal Portfolio',
        category: 'website',
        label: 'Engineering Portfolio',
        description: 'A performance-optimized portfolio showcasing UI engineering excellence. Built with a token-driven design system, smooth animations, and a focus on scalability and responsiveness.',
        tags: ['Next.js', 'TypeScript', 'SCSS Modules', 'GSAP'],
        demoUrl: 'https://nibin-portfolio.vercel.app/',
        image: '/images/projects/portfolio.png',
    },
];

const CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'package', label: 'Packages' },
    { id: 'website', label: 'Websites' },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState('all');

    const filteredProjects = PROJECTS.filter(p =>
        activeTab === 'all' ? true : p.category === activeTab
    );

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

                <div className={styles.tabs} data-project-reveal>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            className={`${styles.tab} ${activeTab === cat.id ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className={styles.featuredGrid}>
                    {filteredProjects.map((project) => (
                        <div key={project.name} className={styles.card} data-project-reveal>
                            <div
                                className={styles.cardImage}
                                style={project.image ? { backgroundImage: `url(${project.image})` } : {}}
                                aria-hidden="true"
                            />
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
                                    {project.demoUrl && (
                                        <a href={project.demoUrl} className={styles.link} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${project.name}`}>
                                            <ExternalIcon /> Live Demo
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} className={styles.link} target="_blank" rel="noopener noreferrer" aria-label={`View source code of ${project.name} on GitHub`}>
                                            <GithubIcon /> GitHub
                                        </a>
                                    )}
                                    {project.npmUrl && (
                                        <a href={project.npmUrl} className={styles.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} package on NPM`}>
                                            <NpmIcon /> NPM Package
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
