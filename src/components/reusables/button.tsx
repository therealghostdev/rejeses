"use client";
import React from "react";
import { ButtonProps } from "@/utils/types/types";

const Button: React.FC<ButtonProps> = ({
  url,
  bg,
  text,
  icon: Icon,
  text_color,
  transition_class,
  click,
}) => {
  const handleClick = () => {
    if (url) {
      window.open(url, "_self");
    }

    if (click) {
      return click();
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ background: bg, color: text_color ? text_color : "" }}
      className={`flex items-center justify-center space-x-2 rounded-md px-6 py-4 bricolage_text text-nowrap text-ellipsis btn ${transition_class}`}
    >
      <span>{text}</span>
      {Icon && <span className="ml-2">{Icon}</span>}
    </button>
  );
};

export default Button;
