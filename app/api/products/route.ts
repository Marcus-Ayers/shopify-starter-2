import { getProducts } from 'lib/shopify';
import { isShopifyError } from 'lib/type-guards';
import { NextRequest, NextResponse } from 'next/server';

function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const products = await getProducts({});
    return NextResponse.json(products);
  } catch (e) {
    if (isShopifyError(e)) {
      return NextResponse.json({ message: formatErrorMessage(e.message) }, { status: e.status });
    }

    return NextResponse.json({ status: 500 });
  }
}
