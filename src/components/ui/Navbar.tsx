'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import Logo from './Logo';
import ResumeDrawer from './ResumeDrawer';
import styles from './Navbar.module.scss';

const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

// Sun icon
const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

// Moon icon
const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

// Hamburger / Close icon
const MenuIcon = ({ open }: { open: boolean }) => open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

// Resume icon
const ResumeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

export default function Navbar() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [resumeOpen, setResumeOpen] = useState(false);
    const handleResumeClose = useCallback(() => setResumeOpen(false), []);

    // Avoid hydration mismatch for theme icon
    useEffect(() => { setMounted(true); }, []);

    // Scroll detection for sticky style
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Active Section Tracking
    useEffect(() => {
        // Prevent default browser jump on refresh
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }

        const sections = ['hero', ...NAV_LINKS.map(link => link.href.replace('#', ''))];
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // More centered for section detection
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    setActiveSection(id === 'hero' ? '' : id);

                    // Update URL hash without jumping
                    if (window.history.replaceState) {
                        const newHash = id === 'hero' ? window.location.pathname : `#${id}`;
                        window.history.replaceState(null, '', newHash);
                    }
                }
            });
        }, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        let initialScrollTimer: any;

        // Handle initial hash on page load
        const initialHash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
        if (initialHash && initialHash !== 'hero') {
            // Give a tiny delay for Next.js/Browser to settle at top
            initialScrollTimer = setTimeout(() => {
                const target = document.getElementById(initialHash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }

        const handleHeroScroll = () => {
            if (window.scrollY < 50) {
                setActiveSection('');
                if (window.history.replaceState && window.location.hash) {
                    window.history.replaceState(null, '', window.location.pathname);
                }
            }
        };
        window.addEventListener('scroll', handleHeroScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleHeroScroll);
            if (initialScrollTimer) clearTimeout(initialScrollTimer);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const toggleTheme = () =>
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

    const handleNavClick = () => setMenuOpen(false);

    const toggleThemeLabel = resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
                <div className={styles.inner}>
                    {/* Logo */}
                    <a href="/" className={styles.logo} aria-label="Nibin Kurian — Home">
                        <Logo size="sm" />
                    </a>

                    {/* Desktop nav links */}
                    <ul className={styles.navLinks} role="list">
                        {NAV_LINKS.map(({ label, href }) => {
                            const isActive = activeSection === href.replace('#', '');
                            return (
                                <li key={href}>
                                    <a
                                        href={href}
                                        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        {label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <button
                            className={styles.themeToggle}
                            onClick={toggleTheme}
                            aria-label={mounted ? toggleThemeLabel : 'Toggle theme'}
                            title={mounted ? toggleThemeLabel : 'Toggle theme'}
                        >
                            {mounted && (resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />)}
                        </button>

                        <button
                            className={styles.resumeBtn}
                            onClick={() => setResumeOpen(true)}
                            aria-label="View resume"
                            title="View Resume"
                        >
                            <ResumeIcon />
                            <span>Resume</span>
                        </button>

                        <a href="#contact" className={styles.ctaBtn}>
                            Let&apos;s talk
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            className={styles.mobileMenuToggle}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                        >
                            <MenuIcon open={menuOpen} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile full-screen overlay menu */}
            <div
                className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
                aria-hidden={!menuOpen}
                role="dialog"
                aria-label="Navigation menu"
            >
                <div className={styles.mobileMenuInner}>
                    <div className={styles.mobileNav}>
                        {NAV_LINKS.map(({ label, href }) => {
                            const isActive = activeSection === href.replace('#', '');
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                                    onClick={handleNavClick}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {label}
                                </a>
                            );
                        })}
                    </div>
                </div>


            </div>

            <ResumeDrawer isOpen={resumeOpen} onClose={handleResumeClose} />
        </>
    );
}
