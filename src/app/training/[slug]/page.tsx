import data from "@/utils/data/training_data.json";
import Link from "next/link";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export async function generateStaticParams() {
  return data.map((item) => ({
    slug: encodeURIComponent(item.title),
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const trainingItem = data.find((item) => item.title === decodedSlug);

  if (!trainingItem) {
    return <div>Training not found</div>;
  }

  return (
    <section className="w-full px-6 flex flex-col gap-6 py-12">
      <div className="flex flex-col w-full gap-4 px-6">
        <h1 className="md:text-4xl text-2xl font-bold">{trainingItem.title}</h1>
        <p className="text-lg">{trainingItem.expanded_description}</p>
      </div>
      <div className="px-6">
        <h1 className="text-2xl text-[#89C13E]">NOTE:</h1>
        <p className="text-lg">
          For students who are unable to join the live sessions due to
          conflicting schedules, the recording of any live class you miss will
          be sent to you 3-5 hours after the class ends.
        </p>
        <p className="text-lg font-bold">
          Start date: {trainingItem.start_date}
        </p>
      </div>

      <div className="flex gap-x-4 px-6">
        <Link href="" className="bg-[#89C13E] text-white px-4 py-4">
          Enroll Now
        </Link>

        <Link
          href=""
          className="bg-[#DBE1E7] text-[#89C13E] px-8 py-4 flex gap-x-4 items-center justify-center"
        >
          <span>
            <ArchiveIcon />
          </span>
          View Class Schedule
        </Link>
      </div>

      {trainingItem.image && trainingItem.image !== "" && (
        <div className="px-6 h-[50vw] w-[90vw] my-4">
          <Image
            src={trainingItem.image}
            alt="image"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
      )}

      {trainingItem.benefits.map((item, index) => (
        <div
          key={index}
          className="w-full flex md:flex-row gap-4 flex-col px-12"
        >
          <div className="border border-[#DBE1E7] rounded-2xl md:w-2/4 w-full flex flex-col md:mx-2 mx-0 px-4 py-4 gap-3">
            <h1 className="font-bold text-2xl">{item.why}</h1>
            {item.answer.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </div>

          <div className="border border-[#DBE1E7] rounded-2xl md:w-2/4 w-full flex flex-col md:mx-2 mx-0 px-4 py-4 gap-3">
            <h1 className="font-bold text-2xl">
              {trainingItem.requirements.software}
            </h1>
            <p>{trainingItem.requirements.how}</p>
            <li>{trainingItem.requirements.tool}</li>
          </div>
        </div>
      ))}
    </section>
  );
}
