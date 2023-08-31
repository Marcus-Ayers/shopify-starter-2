'use client';

import clsx from 'clsx';
import Price from 'components/price';
import { ProductOption, ProductVariant } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

type ParamsMap = {
  [key: string]: string; // ie. { color: 'Red', size: 'Large', ... }
};

type OptimizedVariant = {
  id: string;
  availableForSale: boolean;
  params: URLSearchParams;
  [key: string]: string | boolean | URLSearchParams; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants,
  product
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  product: any;
}) {
  const pathname = usePathname();
  const currentParams = useSearchParams();
  const router = useRouter();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);
  if (hasNoOptionsOrJustOneOption) {
    // console.log(product);
    return (
      <div>
        <h3
          data-testid="product-name"
          className="inline box-decoration-clone pl-3 text-3xl font-semibold leading-normal"
        >
          {product.title}
        </h3>
        <p className="pl-3 text-sm font-semibold">
          ${product.priceRange.maxVariantPrice.amount}{' '}
          {product.priceRange.maxVariantPrice.currencyCode}
        </p>
      </div>
    );
  }

  // Discard any unexpected options or values from url and create params map.
  const paramsMap: ParamsMap = Object.fromEntries(
    Array.from(currentParams.entries()).filter(([key, value]) =>
      options.find((option) => option.name.toLowerCase() === key && option.values.includes(value))
    )
  );

  // Optimize variants for easier lookups.
  const optimizedVariants: OptimizedVariant[] = variants.map((variant) => {
    const optimized: OptimizedVariant = {
      id: variant.id,
      price: variant.price.amount,
      availableForSale: variant.availableForSale,
      params: new URLSearchParams()
    };

    variant.selectedOptions.forEach((selectedOption) => {
      const name = selectedOption.name.toLowerCase();
      const value = selectedOption.value;

      optimized[name] = value;
      optimized.params.set(name, value);
    });

    return optimized;
  });

  // Find the first variant that is:
  //
  // 1. Available for sale
  // 2. Matches all options specified in the url (note that this
  //    could be a partial match if some options are missing from the url).
  //
  // If no match (full or partial) is found, use the first variant that is
  // available for sale.
  const selectedVariant: OptimizedVariant | undefined =
    optimizedVariants.find(
      (variant) =>
        variant.availableForSale &&
        Object.entries(paramsMap).every(([key, value]) => variant[key] === value)
    ) || optimizedVariants.find((variant) => variant.availableForSale);

  const label = selectedVariant?.title; // replace 'title' with the correct attribute name
  const amount = selectedVariant?.price?.toString() ?? ''; // Ensure `amount` is always a string or an empty string if undefined
  const currencyCode = 'USD'; // replace 'price' and 'currencyCode' with correct attribute names

  const selectedVariantParams = new URLSearchParams(selectedVariant?.params);
  const currentUrl = createUrl(pathname, currentParams);
  const selectedVariantUrl = createUrl(pathname, selectedVariantParams);

  if (currentUrl !== selectedVariantUrl) {
    router.replace(selectedVariantUrl);
  }
  return options.map((option, index) => (
    <React.Fragment key={index}>
      {label && (
        <div className="text-black dark:text-white">
          <h3
            data-testid="product-name"
            className="inline box-decoration-clone pl-3 text-3xl font-semibold leading-normal"
          >
            {label}
          </h3>
          <Price
            className="w-fit px-3 pt-1 text-sm font-semibold dark:text-white"
            amount={amount}
            currencyCode={currencyCode}
          />
        </div>
      )}
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide"></dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            // Base option params on selected variant params.
            const optionParams = new URLSearchParams(selectedVariantParams);
            // Update the params using the current option to reflect how the url would change.
            optionParams.set(option.name.toLowerCase(), value);

            const optionUrl = createUrl(pathname, optionParams);

            // The option is active if it in the url params.
            const isActive = selectedVariantParams.get(option.name.toLowerCase()) === value;

            // The option is available for sale if it fully matches the variant in the option's url params.
            // It's super important to note that this is the options params, *not* the selected variant's params.
            // This is the "magic" that will cross check possible future variant combinations and preemptively
            // disable combinations that are not possible.
            const isAvailableForSale = optimizedVariants.find((a) =>
              Array.from(optionParams.entries()).every(([key, value]) => a[key] === value)
            )?.availableForSale;

            const DynamicTag = isAvailableForSale ? Link : 'p';

            return (
              <DynamicTag
                key={value}
                href={optionUrl}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                className={clsx(
                  'flex h-12 min-w-[48px] items-center justify-center rounded-full px-2 text-sm',
                  {
                    'cursor-default ring-2 ring-black dark:ring-white': isActive,
                    'ring-1 ring-gray-300 transition duration-300 ease-in-out hover:scale-110 hover:bg-gray-100 hover:ring-black dark:ring-gray-700 dark:hover:bg-transparent dark:hover:ring-white':
                      !isActive && isAvailableForSale,
                    'relative z-10 cursor-not-allowed overflow-hidden bg-gray-100 ring-1 ring-gray-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-gray-300 before:transition-transform dark:bg-gray-900 dark:ring-gray-700 before:dark:bg-gray-700':
                      !isAvailableForSale
                  }
                )}
                data-testid={isActive ? 'selected-variant' : 'variant'}
              >
                {value}
              </DynamicTag>
            );
          })}
        </dd>
      </dl>
    </React.Fragment>
  ));
}
