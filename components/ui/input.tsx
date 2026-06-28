import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  hasError?: boolean;
  hasSuccess?: boolean;
}

const Input = ({ className, type, hasError, hasSuccess, ...props }: InputProps) => (
  <InputPrimitive
    type={type}
    data-slot="input"
    aria-invalid={hasError ?? undefined}
    className={cn(
      /* Base */
      "w-full min-w-0 rounded-lg border bg-card px-4 py-2.5",
      "text-base text-foreground placeholder:text-muted-foreground/60",
      "transition-[border-color,box-shadow] duration-[220ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
      "outline-none",
      /* Default border */
      "border-border",
      /* Hover */
      "hover:border-muted-foreground/40",
      /* Focus — gold ring, premium signal */
      "focus-visible:shadow-glow-gold focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-gold/20",
      /* States */
      hasError && "border-destructive ring-3 ring-destructive/20",
      hasSuccess && "border-success ring-3 ring-success/20",
      /* Disabled */
      "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-40",
      /* File input */
      "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
      /* RTL-aware height */
      "h-11",
      className,
    )}
    {...props}
  />
);

export { Input };
export type { InputProps };
