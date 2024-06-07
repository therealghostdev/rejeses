"use client"
import React from "react";
import { ButtonProps } from "@/utils/types/types";

const Button: React.FC<ButtonProps> = ({ url, bg, text, icon }) => {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ background: bg }}
      className="flex items-center justify-center space-x-2 rounded-md px-6 py-4"
    >
      <span className="mx-2">{text}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;
