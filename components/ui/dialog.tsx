"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = ({ ...props }: DialogPrimitive.Root.Props) => (
  <DialogPrimitive.Root data-slot="dialog" {...props} />
);

const DialogTrigger = ({ ...props }: DialogPrimitive.Trigger.Props) => (
  <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
);

const DialogPortal = ({ ...props }: DialogPrimitive.Portal.Props) => (
  <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

const DialogClose = ({ ...props }: DialogPrimitive.Close.Props) => (
  <DialogPrimitive.Close data-slot="dialog-close" {...props} />
);

/* Backdrop — warm blur, luxury depth */
const DialogOverlay = ({ className, ...props }: DialogPrimitive.Backdrop.Props) => (
  <DialogPrimitive.Backdrop
    data-slot="dialog-overlay"
    className={cn(
      "fixed inset-0 z-50",
      "bg-foreground/20 backdrop-blur-[6px]",
      "duration-[220ms]",
      "data-open:animate-in data-open:fade-in-0",
      "data-closed:animate-out data-closed:fade-out-0",
      className,
    )}
    {...props}
  />
);

/* Content — card surface floating above the blur */
const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Popup
      data-slot="dialog-content"
      className={cn(
        /* Position */
        "fixed start-1/2 top-1/2 z-50",
        "-translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
        /* Size */
        "w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
        /* Surface */
        "rounded-2xl bg-card",
        "border border-border/60",
        "shadow-luxury-xl",
        /* Spacing */
        "p-8",
        /* Animation */
        "duration-[250ms]",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.97]",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[0.97]",
        "outline-none",
        className,
      )}
      {...props}
    >
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          className={cn(
            "absolute end-5 top-5",
            "flex size-8 items-center justify-center rounded-lg",
            "text-muted-foreground",
            "hover:bg-muted hover:text-foreground",
            "transition-colors duration-[150ms]",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          aria-label="بستن"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      )}
      {children}
    </DialogPrimitive.Popup>
  </DialogPortal>
);

const DialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="dialog-header" className={cn("mb-6 flex flex-col gap-2", className)} {...props} />
);

const DialogFooter = ({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { showCloseButton?: boolean }) => (
  <div
    data-slot="dialog-footer"
    className={cn("mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", className)}
    {...props}
  >
    {showCloseButton && (
      <DialogPrimitive.Close
        className={cn(
          "inline-flex h-11 items-center justify-center rounded-lg",
          "border border-border px-6 text-sm font-medium",
          "text-foreground hover:bg-muted",
          "transition-colors duration-[220ms]",
        )}
      >
        انصراف
      </DialogPrimitive.Close>
    )}
    {children}
  </div>
);

const DialogTitle = ({ className, ...props }: DialogPrimitive.Title.Props) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn("text-xl leading-snug font-light tracking-tight text-foreground", className)}
    {...props}
  />
);

const DialogDescription = ({ className, ...props }: DialogPrimitive.Description.Props) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn("mt-1 text-sm leading-relaxed text-muted-foreground", className)}
    {...props}
  />
);

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
