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
    return <div>Training not found</div>;
  }

  return <ClientPage pricingItem={pricingItem} />;
}
