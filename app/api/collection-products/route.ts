import { getCollectionProducts } from 'lib/shopify';
import { isShopifyError } from 'lib/type-guards';
import { NextRequest, NextResponse } from 'next/server';

function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // parse the URL and query parameters
    const url = new URL(req.url, 'http://localhost'); // use a dummy base URL, the exact value doesn't matter here
    const handle = url.searchParams.get('handle');

    if (handle === null) {
      return NextResponse.json({ message: 'Invalid handle' }, { status: 400 });
    }

    const products = await getCollectionProducts(handle);

    return NextResponse.json(products);
  } catch (e) {
    if (isShopifyError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
