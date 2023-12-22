import React from "react";
import { ProductFallbackImage } from "~/app/_components/shared/fallback-image";

export function ProductSummary() {
  const product = {
    name: "Kutijica crveno cvijeće",
    categories: ["Kutijice", "Cvijeće"],
    description: "Kutijica cvijetić",
    price: "100",
    currency: "€",
    quality: {
      available: 1,
      inCart: 1,
      total: 1,
    },
    images: [
      {
        src: "",
        alt: "Kutijica",
      },
    ],
  };

  return (
    <article className="mx-auto overflow-hidden rounded-xl bg-white shadow-md">
      <div className="relative">
        <ProductFallbackImage
          width={300}
          height={300}
          src={product.images[0]?.src}
          alt={product.images[0]?.alt ?? "Privremena slika"}
        />
        <div className="absolute bottom-0 w-full bg-gray-100 bg-opacity-60 py-2 text-center">
          <div className="font-bold font-semibold uppercase tracking-wide text-rose-900 shadow-2xl">
            {product.name}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between px-8 py-4">
        <p className="mt-2 text-gray-500">{product.categories.join(", ")}</p>
        <div className="place-self-end pl-4 text-lg font-bold text-gray-900">
          {product.price}
          {product.currency}
        </div>
        {product.quality.available >= 1 ? (
          <button
            className="mx-1 mr-1 mt-4 flex w-full items-baseline justify-center rounded bg-indigo-500 px-4 py-3 text-center text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-indigo-600"
            onClick={() => {
              console.log("add to cart");
            }}
          >
            Add to Cart
          </button>
        ) : (
          <p className="text-red-500">Not available</p>
        )}
      </div>
    </article>
  );
}
