import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import CompareTray from '@/components/CompareTray';
import Footer from '@/components/Footer';
import { CompareProvider } from '@/context/CompareContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { KeepAliveProvider } from '@/context/KeepAliveContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://collegecompass.vercel.app'),
  title: 'CollegeCompass — Find Your Perfect College in India',
  description: 'Discover, compare, and predict your college admissions. Search 75+ top Indian colleges by rank, fees, placements, and more.',
  keywords: 'college search India, IIT NIT ranking, college predictor JEE WBJEE CAT, college comparison, NIRF ranking, admission predictor',
  openGraph: {
    title: 'CollegeCompass — Find Your Perfect College in India',
    description: 'Search, compare and predict admissions for IITs, NITs, IIMs and 75+ top Indian colleges.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CollegeCompass — College Discovery Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CollegeCompass — Find Your Perfect College',
    description: 'Discover, compare & predict admissions for 75+ top Indian colleges.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CompareProvider>
          <WishlistProvider>
            <KeepAliveProvider>
              <Navbar />
              <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
                {children}
              </main>
              <CompareTray />
              <Footer />
            </KeepAliveProvider>
          </WishlistProvider>
        </CompareProvider>
      </body>
    </html>
  );
}
