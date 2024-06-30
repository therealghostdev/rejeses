import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-8 w-full min-h-screen justify-center items-center">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold font-bricolage_grotesque">404 Not Found :(</h2>
      <p className="text-2xl">Could not find requested resource</p>
      <Link href="/" className="bg-[#89C13E] text-white px-6 py-4 rounded-md font-bricolage_grotesque">Return Home</Link>
    </div>
  );
}
