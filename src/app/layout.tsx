import type { Metadata } from 'next';
import { Geist, Geist_Mono, Montserrat, Inter } from 'next/font/google';
import '../styles/globals.scss';
import { Navbar } from '@/components/Navbar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const mont = Montserrat({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
});
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL
      ?? 'https://personalrenatolima.com.br',
  ),
  title: 'Renato Lima | Personal Trainer',
  description:
    'Treino personalizado, biomecânica e periodização científica para transformar seu corpo.',
  openGraph: {
    title: 'Renato Lima | Personal Trainer',
    description:
      'Treino personalizado, biomecânica e periodização científica para transformar seu corpo.',
    url: process.env.NEXT_PUBLIC_BASE_URL ?? 'https://personalrenatolima.com.br',
    siteName: 'Renato Lima | Personal Trainer',
    images: [
      {
        url: '/images/logo-og.webp',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt-BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='pt-BR'
      className={`${geistSans.variable}
      ${geistMono.variable}
      ${mont.variable}
      ${inter.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
