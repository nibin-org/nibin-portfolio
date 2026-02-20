import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nibin Kurian — UI Engineer & Design Systems',
  description:
    'UI Engineer specializing in Design Systems, Component Libraries, and scalable frontend architecture. Based in Kottayam, Kerala.',
  keywords: ['UI Engineer', 'Frontend Developer', 'Design Systems', 'Component Libraries', 'Next.js', 'SCSS', 'Kottayam', 'Kerala'],
  authors: [{ name: 'Nibin Kurian' }],
  openGraph: {
    title: 'Nibin Kurian — UI Engineer & Design Systems',
    description: 'UI Engineer specializing in Design Systems and Component Libraries.',
    type: 'website',
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
        </ThemeProvider>
      </body>
    </html>
  );
}
