'use client';

import clsx from 'clsx';
import Price from 'components/price';
import Image from 'next/image';

export function GridTileImage({
  isInteractive = true,
  background,
  active,
  labels,
  setheight,
  setwidth,
  ...props
}: {
  isInteractive?: boolean;
  background?: 'white' | 'pink' | 'purple' | 'black' | 'purple-dark' | 'blue' | 'cyan' | 'gray';
  active?: boolean;
  labels?: {
    title: string;
    amount: string;
    currencyCode: string;
    // prodId: Array;
    isSmall?: boolean;
    setheight?: string;
    setwidth?: string;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div className={`flex flex-col ${setheight} ${setwidth}`}>
      <div
        className={clsx('relative flex h-full w-full flex-col items-center overflow-hidden', {
          'bg-[#ff0080] dark:bg-[#ff0080]': background === 'pink',
          'bg-[#7928ca] dark:bg-[#7928ca]': background === 'purple',
          'bg-gray-900 dark:bg-gray-900': background === 'black',
          'bg-violetDark dark:bg-violetDark': background === 'purple-dark',
          'bg-blue-500 dark:bg-blue-500': background === 'blue',
          'bg-cyan-500 dark:bg-cyan-500': background === 'cyan',
          'bg-gray-100 dark:bg-gray-100': background === 'gray',
          relative: labels
        })}
      >
        {active !== undefined && active ? (
          <span className="absolute h-full w-full opacity-25"></span>
        ) : null}
        {props.src ? (
          <div className="h-full overflow-hidden">
            <Image
              className={clsx('relative mb-1 ', {
                'h-full w-full max-w-none transition duration-300 ease-in-out hover:scale-105':
                  isInteractive
              })}
              {...props}
              alt={props.title || ''}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center ">
            <h1>No image found</h1>
          </div>
        )}
      </div>
      <div className="">
        {labels ? (
          <div className="  text-black dark:text-white">
            <h3
              data-testid="product-name"
              className={clsx(
                'inline box-decoration-clone  font-semibold leading-loose',
                !labels.isSmall ? 'text-3xl' : 'text-sm'
              )}
            >
              {labels.title}
            </h3>
            <Price
              className="w-fit   pt-1 text-sm font-semibold  dark:text-white"
              amount={labels.amount}
              currencyCode={labels.currencyCode}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
export function GridTileImage2({
  isInteractive = true,
  background,
  active,
  labels,
  ...props
}: {
  isInteractive?: boolean;
  background?: 'white' | 'pink' | 'purple' | 'black' | 'purple-dark' | 'blue' | 'cyan' | 'gray';
  active?: boolean;
  labels?: {
    title: string;
    amount: string;
    currencyCode: string;
    // prodId: Array;
    isSmall?: boolean;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div className="flex flex-col">
      <div
        className={clsx('relative flex h-full w-full flex-col items-center overflow-hidden', {
          'bg-[#ff0080] dark:bg-[#ff0080]': background === 'pink',
          'bg-[#7928ca] dark:bg-[#7928ca]': background === 'purple',
          'bg-gray-900 dark:bg-gray-900': background === 'black',
          'bg-gray-100 dark:bg-gray-900': background === 'purple-dark',
          'bg-blue-500 dark:bg-blue-500': background === 'blue',
          'bg-cyan-500 dark:bg-cyan-500': background === 'cyan',
          'bg-gray-100 dark:bg-gray-100': background === 'gray',
          relative: labels
        })}
      >
        {active !== undefined && active ? (
          <span className="absolute h-full w-full opacity-25"></span>
        ) : null}
        {props.src ? (
          <div className="h-full overflow-hidden">
            <Image
              className={clsx('relative mb-1 ', {
                'h-full w-full max-w-none transition duration-300 ease-in-out hover:scale-105':
                  isInteractive
              })}
              {...props}
              alt={props.title || ''}
            />
          </div>
        ) : null}
      </div>
      {/* <div className="ml-5">
        {labels ? (
          <div className="  text-black dark:text-white">
            <h3
              data-testid="product-name"
              className={clsx(
                'inline box-decoration-clone  font-semibold leading-loose',
                !labels.isSmall ? 'text-3xl' : 'text-sm'
              )}
            >
              {labels.title}
            </h3>
            <Price
              className="w-fit   pt-1 text-sm font-semibold  dark:text-white"
              amount={labels.amount}
              currencyCode={labels.currencyCode}
            />
          </div>
        ) : null}
      </div> */}
    </div>
  );
}
