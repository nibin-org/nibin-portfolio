'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Contact.module.scss';
import Logo from '../ui/Logo';

// Mail Icon
const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

// LinkedIn Icon
const LinkedinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

// GitHub Icon
const GithubIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);



const SOCIAL_LINKS = [
    { label: 'Email', icon: <MailIcon />, href: 'mailto:nibinkuriannk@gmail.com' },
    { label: 'LinkedIn', icon: <LinkedinIcon />, href: 'https://linkedin.com/in/nibin-kurian' },
    { label: 'GitHub', icon: <GithubIcon />, href: 'https://github.com/nibin-org' },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const initGsap = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                gsap.from('[data-contact-reveal]', {
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

    // Live Clock Logic
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            };
            setTime(new Intl.DateTimeFormat('en-US', options).format(now));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);

    const currentYear = new Date().getFullYear();

    return (
        <section id="contact" className={styles.contact} ref={sectionRef}>
            <div className={styles.container}>
                <div className="section-label" data-contact-reveal>Contact</div>
                <h2 className={styles.headline} data-contact-reveal>
                    Let&apos;s build the next <span className={styles.accent}>great interface</span> together.
                </h2>
                <p className="section-subtitle" data-contact-reveal>
                    Currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.
                </p>

                <div className={styles.socialGrid} data-contact-reveal>
                    {SOCIAL_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={styles.linkCard}
                            target={link.label !== 'Email' ? "_blank" : undefined}
                            rel={link.label !== 'Email' ? "noopener noreferrer" : undefined}
                            aria-label={`Visit my ${link.label}`}
                        >
                            <span className={styles.linkCard__icon} aria-hidden="true">{link.icon}</span>
                            {link.label}
                        </a>
                    ))}
                </div>

                <footer className={styles.footer}>
                    <div className={styles.footerGrid}>
                        <div className={styles.brandColumn}>
                            <Logo size="sm" className={styles.footerLogo} />
                            <p className={styles.brandTagline}>
                                Crafting technical excellence <br />
                                and visual sophistication.
                            </p>
                        </div>

                        <div className={styles.linksColumn}>
                            <div className={styles.linkGroup}>
                                <h4 className={styles.groupLabel}>Navigation</h4>
                                <nav className={styles.navLinks}>
                                    <a href="#about" className={styles.footerLink}>About</a>
                                    <a href="#skills" className={styles.footerLink}>Skills</a>
                                    <a href="#experience" className={styles.footerLink}>Experience</a>
                                </nav>
                            </div>
                            <div className={styles.linkGroup}>
                                <h4 className={styles.groupLabel}>Social</h4>
                                <nav className={styles.socialIcons}>
                                    {SOCIAL_LINKS.map(link => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            className={styles.socialIconLink}
                                            target={link.label !== 'Email' ? "_blank" : undefined}
                                            rel={link.label !== 'Email' ? "noopener noreferrer" : undefined}
                                            aria-label={link.label}
                                            title={link.label}
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        <div className={styles.statusColumn}>
                            <div className={styles.statusIndicator}>
                                <span className={styles.statusDot}></span>
                                Available for collaboration
                            </div>
                            <div className={styles.location}>
                                {time && <span className={styles.time}>{time} IST • </span>}
                                Kottayam, Kerala, India
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p className={styles.copyright}>© {currentYear} Nibin Kurian. All rights reserved.</p>
                        <p className={styles.techStack}>Built with Next.js, TypeScript & GSAP</p>
                    </div>
                </footer>
            </div>
        </section>
    );
}
