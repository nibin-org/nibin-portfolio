'use client';

import styles from './Logo.module.scss';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
    return (
        <div className={`${styles.logoContainer} ${styles[size]} ${className}`} aria-hidden="true">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.svg}
            >
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-logo-primary)" />
                        <stop offset="100%" stopColor="var(--color-logo-secondary)" />
                    </linearGradient>
                    <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Technical Blueprint Frame - Exact Concept 2 */}
                <g className={styles.frame} stroke="url(#logoGradient)" strokeWidth="1.2" opacity="0.4">
                    {/* Corner Brackets */}
                    <path d="M10 30 V10 H30 M70 10 H90 V30 M90 70 V90 H70 M30 90 H10 V75" />

                    {/* Mid-Axis Circuit Lines */}
                    <g className={styles.axis}>
                        <path d="M50 5 V20 M50 95 V80 M5 50 H20 M95 50 H80" />
                        <circle cx="50" cy="20" r="1.5" fill="url(#logoGradient)" />
                        <circle cx="50" cy="80" r="1.5" fill="url(#logoGradient)" />
                        <circle cx="20" cy="50" r="1.5" fill="url(#logoGradient)" />
                        <circle cx="80" cy="50" r="1.5" fill="url(#logoGradient)" />
                    </g>

                    {/* Technical Cross-lines */}
                    <path d="M15 15 L25 25 M85 15 L75 25 M15 85 L25 75 M85 85 L75 75" opacity="0.5" />

                    {/* Inner Technical Guides */}
                    <rect x="25" y="25" width="50" height="50" strokeDasharray="1 3" opacity="0.2" />
                </g>

                {/* The "NK" Monogram - Sharp Architect Identity */}
                <g className={styles.monogram}>
                    {/* Main Monogram Thick Path */}
                    <path
                        d="M28 72 V28 L48 72 V28 M48 50 L72 26 M48 50 L72 74"
                        stroke="url(#logoGradient)"
                        strokeWidth="8"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeMiterlimit="10"
                        filter="url(#logoGlow)"
                    />

                    {/* Secondary Highlight for Technical Precision */}
                    <path
                        d="M28 72 V28 L48 72 V28 M48 50 L72 26 M48 50 L72 74"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        opacity="0.3"
                    />
                </g>
            </svg>
        </div>
    );
}
