"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
  size:"lg",
  variant:"primary"|"secondary" |"outline"
}

export const Button = ({ children, className, appName, size}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
      

    >
      {children}
    </button>
  );
};
