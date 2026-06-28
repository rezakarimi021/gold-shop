"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { ROUTES } from "@/constants/routes";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setServerError(json.error ?? "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
      return;
    }

    // Auto-login after successful registration
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    router.push(ROUTES.orders);
    router.refresh();
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 pt-4 pb-16">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-luxury-sm">
          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full border border-gold/30 bg-gold-muted">
              <div className="size-2.5 rounded-full bg-gold" />
            </div>
            <h1 className="text-xl font-medium text-foreground">ایجاد حساب</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">عضویت در طلافروشی گُلد</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <FormField
              label="نام و نام خانوادگی"
              htmlFor="name"
              required
              errorMessage={errors.name?.message}
            >
              <Input
                id="name"
                {...register("name")}
                placeholder="علی رضایی"
                hasError={Boolean(errors.name)}
                autoComplete="name"
                autoFocus
              />
            </FormField>

            <FormField label="ایمیل" htmlFor="email" required errorMessage={errors.email?.message}>
              <Input
                id="email"
                type="email"
                dir="ltr"
                {...register("email")}
                placeholder="ali@example.com"
                hasError={Boolean(errors.email)}
                autoComplete="email"
              />
            </FormField>

            <FormField
              label="شماره موبایل"
              htmlFor="phone"
              errorMessage={errors.phone?.message}
              helperText="اختیاری"
            >
              <Input
                id="phone"
                type="tel"
                dir="ltr"
                {...register("phone")}
                placeholder="09121234567"
                hasError={Boolean(errors.phone)}
                autoComplete="tel"
              />
            </FormField>

            <FormField
              label="رمز عبور"
              htmlFor="password"
              required
              errorMessage={errors.password?.message}
              helperText="حداقل ۸ کاراکتر"
            >
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  {...register("password")}
                  placeholder="••••••••"
                  hasError={Boolean(errors.password)}
                  autoComplete="new-password"
                  className="pe-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 end-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "پنهان کردن رمز" : "نمایش رمز"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden />
                  ) : (
                    <Eye className="size-4" aria-hidden />
                  )}
                </button>
              </div>
            </FormField>

            <FormField
              label="تکرار رمز عبور"
              htmlFor="confirmPassword"
              required
              errorMessage={errors.confirmPassword?.message}
            >
              <Input
                id="confirmPassword"
                type="password"
                dir="ltr"
                {...register("confirmPassword")}
                placeholder="••••••••"
                hasError={Boolean(errors.confirmPassword)}
                autoComplete="new-password"
              />
            </FormField>

            {serverError && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-xs text-destructive"
              >
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="mt-2 w-full rounded-xl"
              isLoading={isSubmitting}
              loadingText="در حال ثبت‌نام..."
            >
              ثبت‌نام
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            حساب دارید؟{" "}
            <Link
              href={ROUTES.login}
              className="font-medium text-gold transition-colors hover:text-gold-dark"
            >
              ورود
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
