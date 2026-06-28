"use client";

import { Toaster } from "sonner";

/**
 * RTL-aware luxury toast provider.
 * Drop this inside your root layout providers.
 * Usage: import { toast } from "sonner" anywhere in client code.
 */
const ToastProvider = () => (
  <Toaster
    position="bottom-left"
    dir="rtl"
    richColors={false}
    gap={10}
    offset={24}
    visibleToasts={3}
    duration={4000}
    toastOptions={{
      classNames: {
        toast: [
          "group/toast",
          "flex items-start gap-3",
          "rounded-xl border border-border/60",
          "bg-card text-foreground",
          "shadow-luxury-lg",
          "px-4 py-3.5",
          "text-sm font-medium",
          "backdrop-blur-sm",
          "animate-slide-in",
        ].join(" "),
        title: "text-sm font-medium text-foreground",
        description: "text-xs text-muted-foreground mt-0.5",
        icon: "mt-0.5 shrink-0",
        actionButton: [
          "inline-flex h-7 items-center justify-center rounded-md",
          "bg-gold px-3 text-xs font-medium text-gold-foreground",
          "hover:bg-gold-dark transition-colors duration-[150ms]",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring",
        ].join(" "),
        cancelButton: [
          "inline-flex h-7 items-center justify-center rounded-md",
          "border border-border px-3 text-xs text-foreground",
          "hover:bg-muted transition-colors duration-[150ms]",
        ].join(" "),
        success: "border-success/20",
        error: "border-destructive/20",
        warning: "border-warning/20",
        info: "border-info/20",
        closeButton: [
          "!absolute !end-3 !top-3 !start-auto",
          "!size-6 !rounded-full !border-0 !bg-transparent",
          "!text-muted-foreground hover:!text-foreground",
          "!transition-colors !duration-[150ms]",
        ].join(" "),
      },
    }}
  />
);

export { ToastProvider };
