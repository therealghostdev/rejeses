// src/app/training/[slug]/[slug1]/page.tsx
import data from "@/utils/data/training_data.json";
import ClientPage from "@/components/web_pages/training/payment_summary";

export async function generateStaticParams() {
  return data.map((item) => ({
    slug1: item.id.toString(),
  }));
}

export default function Page({ params }: { params: { slug1: string } }) {
  const pricingItem = data.find(
    (item) => item.id.toString() === params.slug1.toString()
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

  return <ClientPage pricingItem={pricingItem} />;
}
