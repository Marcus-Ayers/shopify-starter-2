import clsx from 'clsx';
import { CollectionList } from 'components/layout/search/collections-list';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';
function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <>
      <Suspense>
        <div className="mx-2">
          <div className="flex flex-col justify-center md:flex-row">
            <div className="flex flex-col">
              <div className="md:ml-auto  md:w-1/4 md:flex-none">
                <FilterList list={sorting} title="Sort by" />
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="">
                  <Suspense fallback={<div>Loading...</div>}>
                    {/* @ts-expect-error Async Server Component */}
                    <CollectionList />
                  </Suspense>
                </div>
                <div>
                  <ul
                    {...props}
                    className={clsx('flex grid  grid-flow-row gap-4 py-5', props.className)}
                  >
                    {props.children}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
export function Grid2(props: React.ComponentProps<'ul'>) {
  return (
    <>
      <ul {...props} className={clsx('flex grid  grid-flow-row gap-4 py-5', props.className)}>
        {props.children}
      </ul>
    </>
  );
}

function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li
      {...props}
      className={clsx(
        'm-h-[350px] relative h-full overflow-hidden transition-opacity',
        props.className
      )}
    >
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;
export default Grid;
