'use server';

import { getCollections } from 'lib/shopify';
// import FilterList from './filter';
import { FilterList2 } from './filter';

export async function CollectionList() {
  const collections = await getCollections();
  return <FilterList2 list={collections} title="Collections" />;
}
