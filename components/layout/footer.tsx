import { getMenu } from 'lib/shopify';

const { SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const menu = await getMenu('next-js-frontend-footer-menu');

  return (
    <footer className="border-t border-gray-700 bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between space-y-4 pb-10 pt-6 text-sm md:flex-row">
          <p>
            &copy; {copyrightDate} {SITE_NAME}. All rights reserved.
          </p>
          {/* <div className="flex items-center text-sm text-white dark:text-black">
            <span className="text-black dark:text-white">Created by</span>
            <a
              rel="noopener noreferrer"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-black dark:text-white"
            >
              <VercelIcon className="ml-3 inline-block h-6" />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
