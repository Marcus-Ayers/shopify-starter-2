import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';

export const runtime = 'edge';

// The generateMetadata function is an asynchronous function that generates
// metadata for SEO purposes. It takes the collection parameter from the URL,
// fetches the collection data from Shopify, and generates an object containing
// SEO-related properties like the title, description, and open graph data. If no
// collection is found, it returns a notFound() function, which is likely to
// trigger a 404 page.
export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(collection.title)}`,
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

// The CategoryPage is a functional React component that receives the collection
// parameter from the URL and fetches the products within this collection from Shopify.
// If there are no products in the collection, it displays a message. If there are products,
// it displays them in a Grid with the ProductGridItems component.
export default async function CategoryPage({ params }: { params: { collection: string } }) {
  const products = await getCollectionProducts(params.collection);

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
