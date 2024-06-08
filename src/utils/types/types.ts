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
