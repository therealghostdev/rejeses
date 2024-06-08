import Services from "@/components/web_pages/index/services";
import UpcomingCohorts from "@/components/web_pages/training/upcoming_training";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-[#090909] bg-[#FEF9F6]">
      <Services />
      <UpcomingCohorts />
    </main>
  );
}
