import { ProductSummary } from "~/app/products/components/product-summary";

export default async function Home() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <ProductSummary />
    </div>
  );
}
