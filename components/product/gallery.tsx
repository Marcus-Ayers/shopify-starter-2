'use client';

import { Suspense, useState } from 'react';

import { GridTileImage, GridTileImage2 } from 'components/grid/tile';

export function Gallery({
  title,
  amount,
  currencyCode,
  // prodId,
  images
}: {
  title: string;
  // prodId: Array;
  amount: string;
  currencyCode: string;
  images: { src: string; altText: string }[];
}) {
  const [currentImage, setCurrentImage] = useState(0);

  function handleNavigate(direction: 'next' | 'previous') {
    if (direction === 'next') {
      setCurrentImage(currentImage + 1 < images.length ? currentImage + 1 : 0);
    } else {
      setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
    }
  }

  const buttonClassName =
    'px-6 cursor-pointer ease-in-and-out duration-200 transition-bg bg-red-500 hover:bg-red-700';

  return (
    <div className="mx-2 flex flex-col md:ml-20 md:flex-row">
      {images.length > 1 ? (
        // might need to change this
        <div className="order-last mt-5 flex h-full justify-center bg-none md:order-first md:mb-20 md:mr-7 md:mt-0 md:w-1/6 md:flex-col">
          {images.map((image, index) => {
            const isActive = index === currentImage;
            return (
              <button
                aria-label="Enlarge product image"
                key={image.src}
                className="mx-1 rounded-lg md:mx-0"
                onClick={() => setCurrentImage(index)}
              >
                <GridTileImage2
                  alt={image?.altText}
                  src={image.src}
                  width={600}
                  height={600}
                  background="purple-dark"
                  active={isActive}
                  className="mb-2 rounded-lg"
                />
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="relative">
        {images.length > 1 ? (
          <div className="absolute bottom-2 right-2 z-10 flex h-10 flex-row border text-white shadow-xl dark:text-black  md:bottom-10 md:right-10 md:h-12">
            {/* <button
              aria-label="Previous product image"
              className={clsx(buttonClassName, 'border-r border-white dark:border-black')}
              onClick={() => handleNavigate('previous')}
            >
              <ArrowLeftIcon className="h-6" />
            </button>
            <button
              aria-label="Next product image"
              className={clsx(buttonClassName)}
              onClick={() => handleNavigate('next')}
            >
              <ArrowLeftIcon className="h-6 rotate-180" />
            </button> */}
            <div className="mx-auto flex flex-row">
              <button
                type="button"
                className="rounded-l-md border-r border-gray-100 bg-gray-800 px-1 py-2 text-white hover:bg-red-700 hover:text-white md:px-3"
                onClick={() => handleNavigate('previous')}
              >
                <div className="flex flex-row align-middle">
                  <svg
                    className="mr-2 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="ml-2">Prev</p>
                </div>
              </button>
              <button
                type="button"
                className="rounded-r-md border-l border-gray-200 bg-gray-800 px-1 py-2 text-white hover:bg-red-700 hover:text-white md:px-3"
                onClick={() => handleNavigate('next')}
              >
                <div className="flex flex-row align-middle">
                  <span className="mr-2">Next</span>
                  <svg
                    className="ml-2 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        ) : null}
        <Suspense>
          {images[currentImage] && (
            <GridTileImage
              src={images[currentImage]?.src as string}
              alt={images[currentImage]?.altText as string}
              width={600}
              height={600}
              isInteractive={false}
              priority={true}
              className="rounded-md"
              // background="purple"
              // labels={{
              //   title,
              //   amount,
              //   currencyCode,
              //   prodId
              // }}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
