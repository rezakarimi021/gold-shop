"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.ComponentProps<"input"> {
  onClear?: () => void;
  containerClassName?: string;
}

const SearchInput = ({
  className,
  containerClassName,
  value,
  onChange,
  onClear,
  placeholder = "جستجوی جواهرات…",
  ...props
}: SearchInputProps) => {
  const hasValue = value !== undefined && value !== "";

  return (
    <div className={cn("relative flex items-center", containerClassName)}>
      {/* Search icon — start (right in RTL) */}
      <Search
        className="pointer-events-none absolute start-4 size-4 text-muted-foreground"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          /* Base */
          "w-full min-w-0 rounded-xl border border-border bg-card",
          "py-3 ps-11 pe-10",
          "text-base text-foreground placeholder:text-muted-foreground/60",
          /* Transitions */
          "transition-[border-color,box-shadow] duration-[220ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          /* Focus */
          "outline-none",
          "focus:shadow-glow-gold focus:border-ring focus:ring-2 focus:ring-gold/20",
          /* Disabled */
          "disabled:cursor-not-allowed disabled:opacity-40",
          /* Remove browser default search clear button */
          "[&::-webkit-search-cancel-button]:appearance-none",
          "[&::-webkit-search-decoration]:appearance-none",
          className,
        )}
        {...props}
      />

      {/* Clear button — only when there's a value */}
      {hasValue && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="پاک کردن جستجو"
          className={cn(
            "absolute end-3 flex size-6 items-center justify-center rounded-full",
            "text-muted-foreground hover:bg-muted hover:text-foreground",
            "transition-colors duration-[150ms]",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
};

export { SearchInput };
export type { SearchInputProps };
