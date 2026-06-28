"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "@/lib/utils";

interface SeparatorProps extends SeparatorPrimitive.Props {
  /** Gold gradient variant for editorial section dividers */
  gold?: boolean;
}

const Separator = ({
  className,
  orientation = "horizontal",
  gold = false,
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive
    data-slot="separator"
    orientation={orientation}
    className={cn(
      "shrink-0",
      orientation === "horizontal" ? "h-px w-full" : "w-px self-stretch",
      gold ? "divider-gold" : "bg-border",
      className,
    )}
    {...props}
  />
);

/* Decorative gold rule with optional label — used as section breaks */
const GoldDivider = ({ label, className }: { label?: string; className?: string }) => (
  <div role="separator" className={cn("flex items-center gap-4 py-2", className)}>
    <div className="divider-gold h-px flex-1" />
    {label && <span className="type-overline shrink-0 text-muted-foreground">{label}</span>}
    <div className="divider-gold h-px flex-1" />
  </div>
);

export { Separator, GoldDivider };
