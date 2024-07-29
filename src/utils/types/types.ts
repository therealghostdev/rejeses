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
  transition_class?: string;
  click?: () => void;
}

export interface FooterProps {
  pathname: "training" | "mentorship" | "consultation" | "/";
}

export interface CardProps {
  id: number;
  title: string;
  date: string;
  description: string;
  id2: number;
  price?: PricingData;
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

export interface TrainingOption {
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
  group?: PricingDataItem[];
}

export interface PricingProps {
  item: PricingData;
  id?: number;
}

export interface PriceCardProps {
  data: {
    training_only?: TrainingOption;
    training_with_mentorship?: TrainingOption;
    path?: string;
  };
  id?: number;
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

export interface ClientImageProps {
  trainingItem?: {
    image: string;
  };
}

// !------------------------------> for class schedule <-------------------------------------------------!
export interface Curriculum {
  week: string;
  topic: string;
  duration: string;
}

export interface Payment {
  order_summary: string;
  includes: string[];
  total: number;
  curriculum: Curriculum[];
}

export interface ClassSchedule {
  day: string;
  time: string;
}

export interface TrainingOption1 {
  id: number;
  title: string;
  expanded_description: string;
  description: string;
  start_date: string;
  image: string;
  benefits: {
    why: string;
    answer: string[];
  }[];
  requirements: {
    software: string;
    how: string;
    tool: string;
  };
  payment: Payment;
  pricing: PricingData;
  class_schedule: ClassSchedule[];
}
// !-------------------------------------------- end for class schedule --------------------------------------!
export interface PaymentInfo {
  training_name: string;
  price: number;
  duration: string;
  name: string;
  training_id: number | string | null;
}

// !--------------------------------------------DB & Server Types -----------------------------------------------------!
export interface OrderType {
  firstName: string;
  lastName: string;
  courseType: string;
  startDate: string;
  email: string;
  amount: number;
  status: "pending" | "completed" | "failed";
}

export enum StatusType {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

// !-----------------------------------------End of DB & Server Types -------------------------------------------------!
