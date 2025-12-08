import { cn } from "@/lib/utils";
import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText = ({ children, className }: GradientTextProps) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-primary via-amber-600 to-primary bg-clip-text text-transparent animate-gradient",
        className
      )}
      style={{
        backgroundSize: "200% auto",
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;