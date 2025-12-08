// NOTE: This component is a placeholder for the Aurora effect.
// The real implementation would require a WebGL library like 'ogl'.
// For simplicity in this context, we'll use a CSS gradient animation.
import { cn } from "@/lib/utils";
import React from "react";

const Aurora = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full",
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900",
        "transition-bg animate-aurora",
        className
      )}
    ></div>
  );
};

export default Aurora;