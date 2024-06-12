export interface NavTypes {
  logo: string;
  links: {
    label: string;
    url: string;
  }[];
  linkButtons: {
    label: string;
    url: string;
    className: string;
  }[];
}

export interface ButtonProps {
  url?: string;
  bg: string;
  text: string;
  icon?: React.ReactNode;
  text_color?: string;
}

export interface FooterProps {
  pathname: "training" | "mentorship" | "consultation" | "/";
}

export interface CardProps {
  id: number;
  title: string;
  date: string;
  description: string;
}

export interface TableProps {
  data: Array<{
    id: string;
    title: string;
    content: string;
    tag: string;
  }>;
}

export interface GeneralCardProps {
  id: number;
  pin?: string;
  person?: { name: string; job_title: string };
  title?: string;
  comment: string;
}
export interface UniqueComponentsProps {
  data: Array<{
    id: number;
    title?: string;
    pin?: string;
    comment: string;
    person?: {
      name: string;
      job_title: string;
    };
    tag: string;
  }>;
}

interface TrainingOption {
  name: string;
  price: number;
  payment_type: string;
  payment_description: string;
  extra_details: string[];
  register_link: string;
  amount_saved?: number; // Optional
}

export interface PricingDataItem {
  training_only?: TrainingOption;
  training_with_mentorship?: TrainingOption;
}

export interface PricingData {
  individuals: PricingDataItem[];
  group: PricingDataItem[];
}

export interface PricingProps {
  item: PricingData;
}

export interface PriceCardProps {
  data: {
    training_only?: TrainingOption;
    training_with_mentorship?: TrainingOption;
  };
}

export interface DynamicNavProps {
  link1: string;
  link_text1: string;
  link2: string;
  link_text2: string;
}

export interface Class {
  day: string;
  time: string;
}

export interface ScheduleData {
  days: string[];
  times: string[];
}
