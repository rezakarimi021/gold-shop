import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2",
    "whitespace-nowrap select-none",
    "font-medium tracking-wide text-sm",
    "rounded-lg border border-transparent",
    "transition-all duration-[220ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Primary: deep charcoal — confident, premium */
        default:
          "bg-secondary text-secondary-foreground hover:bg-[oklch(0.268_0.012_56)] shadow-luxury-sm hover:shadow-luxury-md",

        /* Gold: the brand accent — use sparingly, once per section */
        gold: "bg-gold text-gold-foreground hover:bg-gold-light shadow-luxury-sm hover:shadow-luxury-md hover:shadow-glow-gold",

        /* Outline: refined border, no fill */
        outline:
          "border-border bg-transparent text-foreground hover:border-foreground hover:bg-accent",

        /* Outline gold: gold border variant */
        "outline-gold":
          "border-gold bg-transparent text-gold hover:bg-gold-muted hover:text-gold-dark",

        /* Ghost: minimal, for secondary actions */
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",

        /* Ghost gold: gold text, minimal */
        "ghost-gold": "bg-transparent text-gold hover:bg-gold-muted hover:text-gold-dark",

        /* Destructive: muted crimson, not alarming */
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
      },
      size: {
        xs: "h-7 px-3 text-xs rounded-md tracking-normal gap-1.5",
        sm: "h-9 px-4 text-sm rounded-lg",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base rounded-xl tracking-wider",
        xl: "h-15 px-10 text-base rounded-xl tracking-widest",
        icon: "size-9 rounded-lg",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

const Button = ({
  className,
  variant,
  size,
  isLoading = false,
  loadingText,
  children,
  disabled,
  ...props
}: ButtonProps) => (
  <ButtonPrimitive
    data-slot="button"
    disabled={disabled ?? isLoading}
    className={cn(buttonVariants({ variant, size, className }))}
    {...props}
  >
    {isLoading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
    {isLoading && loadingText ? loadingText : children}
  </ButtonPrimitive>
);

export { Button, buttonVariants };
export type { ButtonProps };
