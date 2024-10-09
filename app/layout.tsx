import { Inter } from 'next/font/google';
import Script from 'next/script';
import '../app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Funny Inspirational Quote Generator',
  description: 'Generate hilarious and profound-sounding quotes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
