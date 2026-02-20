import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import ScrollToTop from '@/components/ui/ScrollToTop';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nibin Kurian — Design System Architect & UI Engineer',
  description:
    'Design System Architect and UI Engineer specializing in token-driven architecture and scalable frontend systems. 5.6+ years experience in React, Next.js, and GSAP.',
  keywords: ['Design System Architect', 'UI Engineer', 'Frontend Developer', 'Design Systems', 'Next.js', 'GSAP', 'React', 'Portfolio'],
  authors: [{ name: 'Nibin Kurian' }],
  creator: 'Nibin Kurian',
  metadataBase: new URL('https://nibinkurian.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nibin Kurian — Design System Architect & UI Engineer',
    description: 'Design System Architect specializing in token-driven architecture and scalable frontend systems.',
    url: 'https://nibinkurian.com',
    siteName: 'Nibin Kurian Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nibin Kurian — Design System Architect & UI Engineer',
    description: 'Design System Architect specializing in token-driven architecture and scalable frontend systems.',
    creator: '@nibinkurian', // Placeholder
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
