import Services from "@/components/web_pages/index/services";
import UpcomingCohorts from "@/components/web_pages/training/upcoming_training";
import Why_us from "@/components/general/why_us";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-[#090909]">
      <Services />
      <UpcomingCohorts />
      <Why_us />
    </main>
  );
}
