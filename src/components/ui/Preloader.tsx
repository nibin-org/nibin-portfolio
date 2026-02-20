'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Preloader.module.scss';

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const body = document.body;
        body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsVisible(false);
                    body.style.overflow = '';
                    // Dispatch event for other components to start their entrance
                    window.dispatchEvent(new Event('preloaderComplete'));
                }
            });

            // Initial logo pulse/glow
            tl.fromTo(logoRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
            )
                .to(logoRef.current, {
                    boxShadow: '0 0 30px var(--color-accent-glow)',
                    duration: 1,
                    repeat: 1,
                    yoyo: true
                }, '-=0.5');

            // Exit animation
            tl.to(preloaderRef.current, {
                yPercent: -100,
                duration: 1,
                ease: 'power4.inOut',
                delay: 0.5
            });
        }, preloaderRef);

        return () => {
            ctx.revert();
            body.style.overflow = '';
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={styles.preloader} ref={preloaderRef}>
            <div className={styles.logo} ref={logoRef}>
                NK
            </div>
            <div className={styles.progress}>
                <div className={styles.progressBar} />
            </div>
        </div>
    );
}
