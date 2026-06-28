"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = ({ className, ...props }: CheckboxPrimitive.Root.Props) => (
  <CheckboxPrimitive.Root
    data-slot="checkbox"
    className={cn(
      /* Box */
      "peer relative flex size-5 shrink-0 items-center justify-center",
      "rounded-md border border-border bg-card",
      /* Expand click target without visually enlarging */
      "after:absolute after:-inset-2",
      /* Transitions */
      "transition-[border-color,background-color,box-shadow] duration-[220ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
      /* Hover */
      "hover:border-gold/60",
      /* Focus */
      "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      /* Checked — filled gold */
      "data-checked:border-gold data-checked:bg-gold data-checked:text-gold-foreground",
      /* Indeterminate */
      "data-indeterminate:border-gold data-indeterminate:bg-gold/20",
      /* Disabled */
      "disabled:cursor-not-allowed disabled:opacity-40",
      /* Error */
      "aria-invalid:border-destructive",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="grid place-content-center text-current"
    >
      <Check className="size-3.5 stroke-[2.5]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export { Checkbox };
