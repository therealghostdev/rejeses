import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import data from "@/utils/data/certification_data.json";
import Certification from "@/components/web_pages/certification/certification";

export interface Qualifications {
  intro: string;
  experience: string;
  education: string;
  exam: string;
}

export interface Benefits {
  intro: string;
  lists: string[];
}

export interface CertificationContent {
  description: string;
  qualifications: Qualifications;
  benefits: Benefits;
  salary: string;
  last?: string;
  ready?: string;
}

export interface Certification {
  title: string;
  logo: string;
  content: CertificationContent;
}

export interface CertificationData {
  [key: string]: Certification;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return Object.keys(data).map((slug) => ({
    slug: slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CertificationPage({ params }: PageProps): JSX.Element {
  const typedData: CertificationData = data;
  const contents: Certification | undefined = typedData[params.slug];

  if (!contents) {
    return <div>Certification not found</div>;
  }

  return <Certification certification={contents} />;
}
