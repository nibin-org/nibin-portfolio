'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
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

export default function Navbar() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Avoid hydration mismatch for theme icon
    useEffect(() => { setMounted(true); }, []);

    // Scroll detection for sticky style
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const toggleTheme = () =>
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

    const handleNavClick = () => setMenuOpen(false);

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
                <div className={styles.inner}>
                    {/* Logo */}
                    <a href="#hero" className={styles.logo} aria-label="Nibin Kurian — Home">
                        <div className={styles.logo__mark}>NK</div>
                        <div className={styles.logo__name}>
                            Nibin Kurian
                            <span>UI Engineer</span>
                        </div>
                    </a>

                    {/* Desktop nav links */}
                    <ul className={styles.navLinks} role="list">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <a href={href} className={styles.navLink}>{label}</a>
                            </li>
                        ))}
                    </ul>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <button
                            className={styles.themeToggle}
                            onClick={toggleTheme}
                            aria-label={mounted ? `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode` : 'Toggle theme'}
                        >
                            {mounted ? (resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />) : <div style={{ width: 18, height: 18 }} />}
                        </button>

                        <a href="#contact" className={styles.ctaBtn}>
                            Let&apos;s talk
                        </a>

                        {/* Mobile hamburger */}
                        <button
                            className={styles.mobileMenuBtn}
                            onClick={() => setMenuOpen(o => !o)}
                            aria-expanded={menuOpen}
                            aria-label="Toggle mobile menu"
                        >
                            <MenuIcon open={menuOpen} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile full-screen overlay menu */}
            <div
                className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
                aria-hidden={!menuOpen}
                role="dialog"
                aria-label="Navigation menu"
            >
                {NAV_LINKS.map(({ label, href }) => (
                    <a key={href} href={href} className={styles.mobileNavLink} onClick={handleNavClick}>
                        {label}
                    </a>
                ))}

                {/* Footer CTA inside overlay */}
                <div className={styles.mobileMenuFooter}>
                    <a href="#contact" onClick={handleNavClick}>Let&apos;s talk</a>
                </div>
            </div>
        </>
    );
}
