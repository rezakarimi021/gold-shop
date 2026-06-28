"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = ({ className, ...props }: RadioGroupPrimitive.Props) => (
  <RadioGroupPrimitive
    data-slot="radio-group"
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
);

const RadioGroupItem = ({ className, ...props }: RadioPrimitive.Root.Props) => (
  <RadioPrimitive.Root
    data-slot="radio-group-item"
    className={cn(
      /* Ring */
      "peer relative flex aspect-square size-5 shrink-0 rounded-full",
      "border border-border bg-card",
      /* Expand click target */
      "after:absolute after:-inset-2",
      /* Transition */
      "transition-[border-color,background-color] duration-[220ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
      /* Hover */
      "hover:border-gold/60",
      /* Focus */
      "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      /* Checked — gold ring + dot */
      "data-checked:border-gold",
      /* Disabled */
      "disabled:cursor-not-allowed disabled:opacity-40",
      className,
    )}
    {...props}
  >
    <RadioPrimitive.Indicator
      data-slot="radio-group-indicator"
      className="flex size-5 items-center justify-center"
    >
      <span className="absolute start-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold rtl:translate-x-1/2" />
    </RadioPrimitive.Indicator>
  </RadioPrimitive.Root>
);

export { RadioGroup, RadioGroupItem };
