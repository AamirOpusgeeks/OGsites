import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/AppShell';

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '900'],
  variable: '--font-main',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://opusgeeks.com'),
  title: {
    default: 'Opus Geeks | Premier 3D & Digital Software Engineering Agency',
    template: '%s | Opus Geeks',
  },
  description:
    'Opus Geeks engineers high-performance web platforms, resilient cloud architectures, and immersive 3D digital experiences for ambitious global enterprises.',
  keywords: [
    'Opus Geeks',
    'Software Architecture',
    '3D Web Development',
    'WebGL Agency',
    'Next.js 16',
    'Mobile Systems',
    'Enterprise Cloud',
  ],
  authors: [{ name: 'Opus Geeks Architecture Desk', url: 'https://opusgeeks.com' }],
  creator: 'Opus Geeks',
  icons: {
    icon: '/logos/logo.png',
    apple: '/logos/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://opusgeeks.com',
    title: 'Opus Geeks | Premier 3D & Digital Software Engineering Agency',
    description:
      'We engineer high-performance web platforms and cloud systems combining modern Next.js architectures, edge compute, and sub-second API pipelines.',
    siteName: 'Opus Geeks',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opus Geeks | Premier 3D & Digital Software Engineering Agency',
    description:
      'Architecting software for the AI-first era with modern 3D graphics, edge compute, and sub-second pipelines.',
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
    <html lang="en" className={inter.variable}>
      <body className="bg-[#c9d2e7] text-[#181520] antialiased overflow-x-hidden selection:bg-black selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
