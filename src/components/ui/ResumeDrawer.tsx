'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ResumeDrawer.module.scss';

// Close icon
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// Download icon
const DownloadIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

// External link icon
const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

// Reset / Refresh Icon
const ResetIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <polyline points="3 3 3 8 8 8" />
    </svg>
);

interface ResumeDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeDrawer({ isOpen, onClose }: ResumeDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    // Lock body scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
        if (isOpen) drawerRef.current?.focus();
    }, [isOpen]);

    const handleReset = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer Panel */}
            <div
                ref={drawerRef}
                className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
                role="dialog"
                aria-modal="true"
                aria-label="Resume Exhibit"
                tabIndex={-1}
            >
                {/* Mobile drag handle */}
                <div className={styles.dragHandle} aria-hidden="true" />

                {/* Floating Glass Header */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.statusDot} />
                        <div className={styles.headerInfo}>
                            <p className={styles.headerTitle}>Nibin Kurian</p>
                            <p className={styles.headerSub}>Resume Preview</p>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            className={`${styles.iconBtn} ${styles.resetBtn}`}
                            onClick={handleReset}
                            title="Reset View"
                            aria-label="Reset PDF view"
                        >
                            <ResetIcon />
                        </button>
                        <a
                            href="/resume.pdf"
                            download="Nibin_Kurian_Resume.pdf"
                            className={styles.downloadBtn}
                            aria-label="Download PDF"
                        >
                            <DownloadIcon />
                            <span className={styles.downloadLabel}>Download</span>
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.iconBtn} ${styles.openBtn}`}
                            title="Open in new tab"
                        >
                            <ExternalIcon />
                        </a>
                        <button
                            className={`${styles.iconBtn} ${styles.closeBtn}`}
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </header>

                {/* Exhibit Area */}
                <main className={styles.exhibitArea}>
                    {/* Document Presentation (with Paper Effect) */}
                    <div className={styles.docExhibit}>
                        <div className={styles.pdfFrameWrapper}>
                            {isOpen && (
                                <iframe
                                    key={refreshKey}
                                    src="/resume.pdf#view=FitH&toolbar=0&navpanes=0&scrollbar=0"
                                    className={styles.pdfFrame}
                                    title="Resume Document"
                                />
                            )}
                        </div>
                    </div>
                </main>

                {/* Minimalist Glass Footer */}
                <footer className={styles.footer}>
                    <span className={styles.footerText}>
                        Nibin Kurian · Portfolio technical exhibit · 2026
                    </span>
                </footer>
            </div>
        </>
    );
}
