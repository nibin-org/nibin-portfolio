'use client';

import { useEffect, useRef } from 'react';
import styles from './Contact.module.scss';

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
    { label: 'Email', icon: <MailIcon />, href: 'mailto:nibhinkurian@example.com' },
    { label: 'LinkedIn', icon: <LinkedinIcon />, href: '#' },
    { label: 'GitHub', icon: <GithubIcon />, href: '#' },
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
                        <a key={link.label} href={link.href} className={styles.linkCard}>
                            {link.icon}
                            {link.label}
                        </a>
                    ))}
                </div>

                <footer className={styles.footer}>
                    <div className={styles.footerInner}>
                        <div className={styles.copyright}>
                            © {currentYear} Nibin Kurian. Built with Next.js & SCSS.
                        </div>

                        <div className={styles.kottayam}>
                            Kottayam, Kerala, India
                        </div>

                        <div className={styles.footerLinks}>
                            <a href="#about" className={styles.footerLink}>About</a>
                            <a href="#skills" className={styles.footerLink}>Skills</a>
                            <a href="#projects" className={styles.footerLink}>Work</a>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
}
