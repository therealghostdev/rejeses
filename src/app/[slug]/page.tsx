import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import data from "@/utils/data/certification_data.json";
import Certifications from "@/components/web_pages/certification/certification";
import {
  PageProps,
  CertificationData,
  Certification,
} from "@/utils/types/types";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return Object.keys(data).map((slug) => ({
    slug: slug,
  }));
}

export default function CertificationPage({ params }: PageProps): JSX.Element {
  const typedData: CertificationData = data;
  const contents: Certification | undefined = typedData[params.slug];

  if (!contents) {
    return <div>Certification not found</div>;
  }

  return <Certifications certification={contents} />;
}
