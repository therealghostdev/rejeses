import data from "@/utils/data/training_data.json";
import Link from "next/link";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Why_us from "@/components/general/why_us";
import whyUsData from "@/utils/data/why_us_data.json";

export async function generateStaticParams() {
  return data.map((item) => ({
    slug: item.title,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const trainingItem = data.find(
    (item) => item.title.toString() === decodedSlug.toString()
  );
  const whyUsItems = whyUsData.filter((item) => item.tag === "training");

  if (!trainingItem) {
    return <div>Training not found</div>;
  }

  return (
    <section className="w-full px-8 flex flex-col gap-6 py-12">
      <div className="flex flex-col md:max-w-[90%] w-full gap-4 lg:px-12 md:px-6">
        <h1 className="md:text-4xl text-2xl font-bold bricolage_text">{trainingItem.title}</h1>
        <p className="text-lg">{trainingItem.expanded_description}</p>
      </div>
      <div className="lg:px-12 md:px-6">
        <h1 className="text-2xl text-[#89C13E] bricolage_text">NOTE:</h1>
        <p className="text-lg text-wrap">
          For students who are unable to join the live sessions due to
          conflicting schedules, the recording of any live class you miss will
          be sent to you 3-5 hours after the class ends.
        </p>
        <p className="text-lg font-bold bricolage_text">
          Start date: {trainingItem.start_date}
        </p>
      </div>

      <div className="flex md:gap-x-4 gap-x-2 lg:px-12 md:px-6 w-full sm_btn-container">
        <Link
          href={`/training/${trainingItem.title}/${trainingItem.id}`}
          className="bg-[#89C13E] text-white bricolage_text md:px-6 px-2 py-4 rounded-md text-nowrap text-ellipsis btn"
        >
          Enroll Now
        </Link>

        <Link
          href={`/training/Project Management for Beginners/${trainingItem.id}/class_schedule`}
          className="bg-[#FFFFFF] border border-[#DBE1E7] text-[#89C13E] bricolage_text md:px-8 px-2 py-4 flex gap-x-4 btn text-nowrap text-ellipsis items-center justify-center rounded-md"
        >
          <span>
            <ArchiveIcon />
          </span>
          View Class Schedule
        </Link>
      </div>

      {trainingItem.image && trainingItem.image !== "" && (
        <div className="lg:px-12 md:px-3 lg:h-[800px] h-[50vw] lg:w-[90vw] my-4">
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
          className="w-full flex md:flex-row gap-4 flex-col lg:px-12"
        >
          <div className="border border-[#DBE1E7] rounded-2xl md:w-2/4 w-full flex flex-col md:mx-2 mx-0 md:py-6 px-8 py-4 gap-3">
            <h1 className="font-bold text-2xl bricolage_text">{item.why}</h1>
            {item.answer.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </div>

          <div className="border border-[#DBE1E7] rounded-2xl md:w-2/4 w-full flex flex-col md:mx-2 mx-0 md:py-6 px-8 py-4 gap-3">
            <h1 className="font-bold text-2xl bricolage_text">
              {trainingItem.requirements.software}
            </h1>
            <p>{trainingItem.requirements.how}</p>
            <li>{trainingItem.requirements.tool}</li>
          </div>
        </div>
      ))}

      <Why_us data={whyUsItems} />

      <section className="w-full flex flex-col gap-4 lg:px-12 md:px-6">
        <h1 className="lg:text-4xl text-2xl font-bold bricolage_text">Curriculum</h1>
        {trainingItem.payment.curriculum.map((item, index) => (
          <div
            key={index}
            className="w-full border border-[#DBE1E7] p-4 rounded-md bricolage_text"
          >
            <h1 className="lg:text3xl text-2xl font-bold">{item.week}</h1>
            <p className="text-lg">{item.topic}</p>
            <small>{item.duration}</small>
          </div>
        ))}

        <div className="w-full flex flex-col gap-4">
          <p className="text-lg font-bold bricolage_text">
            Start date: {trainingItem.start_date}
          </p>

          <div className="flex md:gap-x-4 gap-x-2 w-full sm_btn-container">
            <Link
              href={`/training/${trainingItem.title}/${trainingItem.id}`}
              className="bg-[#89C13E] text-white bricolage_text md:px-6 px-2 py-4 rounded-md text-nowrap text-ellipsis btn"
            >
              Enroll Now
            </Link>

            <Link
              href={`/training/Project Management for Beginners/${trainingItem.id}/class_schedule`}
              className="bg-[#FFFFFF] border border-[#DBE1E7] text-[#89C13E] bricolage_text md:px-8 px-2 py-4 flex gap-x-4 btn text-nowrap text-ellipsis items-center justify-center rounded-md"
            >
              <span>
                <ArchiveIcon />
              </span>
              View Class Schedule
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
