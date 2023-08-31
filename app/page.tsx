//The 'edge' runtime in Vercel represents a Serverless Function that is executed
// at the Edge network, meaning it's closer to the user and therefore has reduced latency.
// export const runtime = 'edge';

//The metadata object holds information about the page that helps with SEO
// (Search Engine Optimization) and social sharing. The description is a brief
// summary of your page that might show up in search engine results. The openGraph
// object is a set of properties that provide information about your page to
// social media platforms when someone shares a link to your page.
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(process.env.SITE_NAME || '')}`,
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  }
};

export default async function HomePage() {
  return <>{/* <HomePageThree /> */}</>;
}
