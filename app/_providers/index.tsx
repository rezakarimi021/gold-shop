"use client";

import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "./QueryProvider";
import { ToastProvider } from "@/components/ui/toast-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <SessionProvider>
    <QueryProvider>
      {children}
      <ToastProvider />
    </QueryProvider>
  </SessionProvider>
);
