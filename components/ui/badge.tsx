import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex h-5 w-fit items-center justify-center gap-0.5",
    "px-2 rounded-full",
    "text-[0.625rem] font-600 tracking-[0.1em] uppercase",
    "whitespace-nowrap select-none",
    "transition-colors duration-[220ms]",
  ].join(" "),
  {
    variants: {
      variant: {
        /* ── Jewelry-specific variants ─────────────────────────────────────── */

        /* New arrival — warm ivory with gold text */
        new: "bg-gold-muted text-gold-dark border border-gold/30",

        /* Gold purity — transparent dark with ivory text, sits on product image */
        karat: "bg-secondary/90 text-secondary-foreground backdrop-blur-sm",

        /* Best seller — dark charcoal */
        "best-seller": "bg-secondary text-secondary-foreground",

        /* Limited — muted gold with subtle border */
        limited: "bg-gold text-gold-foreground shadow-glow-gold",

        /* Handcrafted / certified — quiet, professional */
        certified: "bg-success/10 text-success border border-success/25",

        /* ── Semantic variants ─────────────────────────────────────────────── */

        /* Default / primary */
        default: "bg-primary text-primary-foreground",

        /* Outline — quiet, editorial */
        outline: "border border-border text-foreground bg-transparent",

        /* Muted — very quiet */
        muted: "bg-muted text-muted-foreground",

        /* Destructive — stock warning */
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",

        /* Success */
        success: "bg-success/10 text-success border border-success/20",

        /* Warning — low stock */
        warning: "bg-warning/15 text-warning-foreground border border-warning/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps extends useRender.ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant = "default", render, ...props }: BadgeProps) =>
  useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({ className: cn(badgeVariants({ variant }), className) }, props),
    render,
    state: { slot: "badge", variant },
  });

export { Badge, badgeVariants };
export type { BadgeProps };
