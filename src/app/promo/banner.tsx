import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PromoBannerProps } from "@/utils/types/types";

const PromoBanner = ({ promoData }: PromoBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (promoData && promoData.isPromo) {
      setIsVisible(true);
    }
  }, [promoData]);

  if (!isVisible) return null;

  return (
    <section className="w-full py-6 mb-6 bg-gradient-to-r from-[#89C13E] to-[#6aa025] shadow-lg rounded-lg overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto px-4">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-5 w-12 h-12 rounded-full bg-white/10"></div>
          <div className="absolute bottom-1/4 right-10 w-20 h-20 rounded-full bg-white/10"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-white/10"></div>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between z-10">
          <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
            <div className="inline-block px-4 py-1 bg-yellow-400 text-black font-bold rounded-full mb-3 animate-pulse">
              Special Offer!
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Limited Time Training Promotion
            </h2>
            <p className="text-white/90 text-lg">
              Get exclusive discounts on our training programs! Prices as low as{" "}
              <span className="font-bold">
                $
                {pathname.includes("training")
                  ? promoData?.prices?.dollar?.training || 60
                  : promoData?.prices?.dollar?.mentoring || 240}
              </span>{" "}
              or{" "}
              <span className="font-bold">
                ₦
                {pathname.includes("training")
                  ? promoData?.prices?.naira?.training?.toLocaleString() ||
                    "50,000"
                  : promoData?.prices?.naira?.mentoring || "250,000"}
              </span>
            </p>
          </div>

          <Link
            href="/promo"
            className="px-6 py-3 bg-white text-[#89C13E] font-bold rounded-md hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-md"
          >
            View Promo Details
          </Link>
        </div>
      </div>
    </section>
  );
};
export default PromoBanner;
