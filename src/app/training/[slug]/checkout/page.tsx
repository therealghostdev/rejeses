// import Checkout from "@/components/reusables/checkout";
import data from "@/utils/data/training_data.json";
import dynamic from "next/dynamic";

const DynamicCheckout = dynamic(
  () => import("@/components/reusables/checkout"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export async function generateStaticParams() {
  return data.map((item) => ({
    slug: item.id.toString(),
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const pricingItem = data.find(
    (item) => item.id.toString() === params.slug.toString()
  );

  if (!pricingItem) {
    return (
      <div className="flex flex-col gap-8 w-full min-h-screen justify-center items-center">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold font-bricolage_grotesque">
          Training not found!
        </h2>
      </div>
    );
  }

  return <DynamicCheckout pricingItem={pricingItem} />;
}
