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
  title: 'Digital Storytelling & 3D Website Design Agency | Noomo',
  description: 'Design that elevates your digital presence.',
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
