"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.ComponentProps<"label"> {
  required?: boolean;
}

const Label = ({ className, children, required, ...props }: LabelProps) => (
  <label
    data-slot="label"
    className={cn(
      "mb-1.5 block text-sm font-medium text-foreground select-none",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-40",
      className,
    )}
    {...props}
  >
    {children}
    {required && (
      <span className="me-1 text-gold" aria-hidden="true">
        {" "}
        *
      </span>
    )}
  </label>
);

export { Label };
