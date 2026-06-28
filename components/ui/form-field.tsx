import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Wraps any form control with a label, helper text, and validation messages.
 * The luxury standard: labels always visible, errors always clear and human.
 */
const FormField = ({
  label,
  required,
  helperText,
  errorMessage,
  successMessage,
  htmlFor,
  className,
  children,
}: FormFieldProps) => {
  const hasError = Boolean(errorMessage);
  const hasSuccess = Boolean(successMessage);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}

      {children}

      {/* Priority: error > success > helper */}
      {hasError && (
        <p role="alert" className="flex items-center gap-1.5 text-xs text-destructive">
          {errorMessage}
        </p>
      )}

      {!hasError && hasSuccess && <p className="text-xs text-success">{successMessage}</p>}

      {!hasError && !hasSuccess && helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export { FormField };
export type { FormFieldProps };
