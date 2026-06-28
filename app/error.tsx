"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container-luxury section-spacing flex min-h-screen flex-col items-center justify-center text-center">
      <p className="mb-3 text-sm tracking-widest text-muted-foreground uppercase">خطا</p>
      <h2 className="mb-4 text-3xl font-light text-foreground">مشکلی پیش آمد</h2>
      <div className="mx-auto mb-6 h-px w-12 bg-gold-muted" />
      <p className="mb-8 max-w-sm font-light text-muted-foreground">
        متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm tracking-wider text-foreground transition-colors duration-200 hover:border-gold"
      >
        تلاش مجدد
      </button>
    </main>
  );
};

export default Error;
