import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import '../styles/globals.scss';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@/components/Analytics';
import { Navbar } from '@/components/Navbar';
import { getGaId } from '@/lib/analytics';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

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
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/images/logo-og.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: SITE_NAME,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/images/logo-og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = getGaId();

  return (
    <html lang='pt-BR' className={`${mont.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        {gaId && <Analytics />}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
