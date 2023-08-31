//This file seems to be responsible for creating the sitemap of your website.
//A sitemap is essentially a list of all the pages on your website that is
//accessible to crawlers or users. It's typically used by search engines to
// ensure they can find and index all of your site's pages.

import { getCollections, getPages, getProducts } from 'lib/shopify';
import { MetadataRoute } from 'next';

//This is the base URL for your website, derived from an environment
// variable if it exists, or 'http://localhost:3000' otherwise.
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

// This is an asynchronous function that's exported as the default export of this module.
// It's responsible for generating your site's sitemap. The function returns a Promise that
// resolves with a nested Promise, which in turn resolves with another Promise that contains
// an array of MetadataRoute.Sitemap objects.
export default async function sitemap(): Promise<Promise<Promise<MetadataRoute.Sitemap>>> {
  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString()
  }));

  // These 3 constants are Promises that resolve with arrays of sitemap entries for
  // your site's dynamic routes, specifically the collections, products, and pages
  // from your Shopify store. The getCollections, getProducts, and getPages functions
  // fetch the data from Shopify, and then the .then method is used to transform that
  // data into the correct format for the sitemap.
  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt
    }))
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt
    }))
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt
    }))
  );

  const fetchedRoutes = (
    await Promise.all([collectionsPromise, productsPromise, pagesPromise])
  ).flat();

  return [...routesMap, ...fetchedRoutes];
}
