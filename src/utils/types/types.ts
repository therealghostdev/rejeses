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
