import Navbar from 'components/layout/navbar';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;

//The metadata object sets default metadata for your site, including
// the title template, robots meta tag (allowing index and follow by search engines),
// and optional Twitter card metadata (if the TWITTER_CREATOR and TWITTER_SITE variables are set).
export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: 'summary_large_image',
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE
      }
    })
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} light`}>
      <body className="bg-white text-black selection:bg-teal-300 dark:bg-black dark:text-white dark:selection:bg-fuchsia-600 dark:selection:text-white">
        {/* @ts-expect-error Server Component */}
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
