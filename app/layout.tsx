import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import PlausibleProvider from 'next-plausible';

const inter = Inter({ subsets: ['latin'] });

let title = 'QR N - QR Code Generator';
let description = 'Generate your AI QR Code in seconds';
let url = 'https://www.qrgpt.io';
let ogimage = [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "QR N - QR Code Generator"
  }
];
let twitterid = '@nishaaanth2';
let sitename = 'qrGPT.io';
let twitterimage= [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "QR N - QR Code Generator"
  }
]

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(url),
  keywords: [
    'qr code',
    'qr code generator',
    'qr code reader',
    'qr code scanner',
    'qr code maker',
    'qr code creator',
    'qr code reader',
    'qr code scanner',
    'qr code maker',
    'qr code creator',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    images: ogimage,
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: twitterimage,
    title,
    description,
    creator: twitterid,
    site: twitterid,
  },
  alternates: {
    canonical: url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <PlausibleProvider domain="qrgpt.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: title,
              url: url,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${url}/start?url={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
