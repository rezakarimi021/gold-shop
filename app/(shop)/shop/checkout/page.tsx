"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShieldCheck, Truck, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/utils/formatPrice";
import { ROUTES } from "@/constants/routes";
import { SHIPPING } from "@/constants/config";
import { trackBeginCheckout } from "@/lib/analytics";

const LUXURY_EASE = [0.25, 0.46, 0.45, 0.94] as const;

const checkoutSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  email: z.string().email("آدرس ایمیل نامعتبر است").optional().or(z.literal("")),
  province: z.string().min(2, "استان را وارد کنید"),
  city: z.string().min(2, "شهر را وارد کنید"),
  address: z.string().min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد"),
  postalCode: z.string().regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  paymentMethod: z.enum(["online", "card"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const PAYMENT_METHODS = [
  {
    id: "online" as const,
    label: "پرداخت آنلاین",
    description: "از طریق درگاه زرین‌پال",
  },
  {
    id: "card" as const,
    label: "کارت به کارت",
    description: "انتقال به شماره کارت و ارسال تصویر فیش",
  },
] as const;

const CheckoutPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const isShippingFree = subtotal >= SHIPPING.freeThreshold;
  const shipping = isShippingFree ? 0 : SHIPPING.flatRate;
  const total = subtotal + shipping;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "online" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedPayment = watch("paymentMethod");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length > 0) {
      trackBeginCheckout({ value: total, itemCount: items.length });
    }
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: CheckoutForm) => {
    setServerError(null);

    // 1. Create order
    const orderRes = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email || undefined,
        },
        shipping: {
          province: data.province,
          city: data.city,
          address: data.address,
          postalCode: data.postalCode,
        },
        paymentMethod: data.paymentMethod,
        items: items.map((item) => ({
          productId: item.product.id,
          variantId: item.variant.id,
          productName: item.product.name,
          karat: item.variant.karat,
          weight: item.variant.weight,
          quantity: item.quantity,
          unitPrice: item.variant.price,
          productImage: item.product.primaryImage?.url,
        })),
      }),
    });

    const orderJson = (await orderRes.json()) as {
      id?: string;
      error?: string;
    };

    if (!orderRes.ok || !orderJson.id) {
      setServerError(orderJson.error ?? "خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.");
      return;
    }

    clearCart();

    // 2a. Card-to-card: go directly to confirmed page
    if (data.paymentMethod === "card") {
      router.push(`/shop/checkout/confirmed?orderId=${orderJson.id}&method=card`);
      return;
    }

    // 2b. Online payment: initiate ZarinPal
    const payRes = await fetch("/api/payments/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: orderJson.id }),
    });

    const payJson = (await payRes.json()) as {
      paymentUrl?: string;
      error?: string;
    };

    if (!payRes.ok || !payJson.paymentUrl) {
      setServerError(payJson.error ?? "خطا در اتصال به درگاه پرداخت. لطفاً دوباره تلاش کنید.");
      return;
    }

    window.location.href = payJson.paymentUrl;
  };

  const onInvalid = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 420);
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container-luxury py-20 text-center">
        <p className="type-display-sm mb-4 text-muted-foreground">سبد خرید خالی است</p>
        <Link href={ROUTES.shop} className={cn(buttonVariants({ variant: "gold" }))}>
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-luxury py-10 lg:py-14">
        {/* Breadcrumb */}
        <nav
          className="mb-10 flex items-center gap-2 text-xs text-muted-foreground"
          aria-label="مسیر"
        >
          <Link href={ROUTES.cart} className="transition-colors hover:text-gold">
            سبد خرید
          </Link>
          <ChevronLeft className="size-3 rtl:rotate-180" />
          <span className="text-foreground">پرداخت</span>
        </nav>

        <h1 className="type-display-sm mb-10 text-foreground">اطلاعات پرداخت</h1>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          noValidate
          className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start"
        >
          {/* Left: Form */}
          <div className="space-y-8">
            {/* Customer info */}
            <fieldset>
              <legend className="mb-5 text-base font-medium text-foreground">اطلاعات شخصی</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="نام"
                  htmlFor="firstName"
                  required
                  errorMessage={errors.firstName?.message}
                >
                  <Input
                    id="firstName"
                    {...register("firstName")}
                    placeholder="علی"
                    hasError={Boolean(errors.firstName)}
                    autoComplete="given-name"
                  />
                </FormField>

                <FormField
                  label="نام خانوادگی"
                  htmlFor="lastName"
                  required
                  errorMessage={errors.lastName?.message}
                >
                  <Input
                    id="lastName"
                    {...register("lastName")}
                    placeholder="رضایی"
                    hasError={Boolean(errors.lastName)}
                    autoComplete="family-name"
                  />
                </FormField>

                <FormField
                  label="شماره موبایل"
                  htmlFor="phone"
                  required
                  errorMessage={errors.phone?.message}
                  helperText="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
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
                  label="ایمیل"
                  htmlFor="email"
                  errorMessage={errors.email?.message}
                  helperText="اختیاری — برای ارسال رسید"
                >
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
              </div>
            </fieldset>

            <Separator className="bg-border/60" />

            {/* Address */}
            <fieldset>
              <legend className="mb-5 text-base font-medium text-foreground">آدرس تحویل</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="استان"
                  htmlFor="province"
                  required
                  errorMessage={errors.province?.message}
                >
                  <Input
                    id="province"
                    {...register("province")}
                    placeholder="تهران"
                    hasError={Boolean(errors.province)}
                  />
                </FormField>

                <FormField label="شهر" htmlFor="city" required errorMessage={errors.city?.message}>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="تهران"
                    hasError={Boolean(errors.city)}
                    autoComplete="address-level2"
                  />
                </FormField>

                <div className="sm:col-span-2">
                  <FormField
                    label="آدرس کامل"
                    htmlFor="address"
                    required
                    errorMessage={errors.address?.message}
                    helperText="خیابان، کوچه، پلاک، واحد"
                  >
                    <Input
                      id="address"
                      {...register("address")}
                      placeholder="خیابان ولیعصر، کوچه گلستان، پلاک ۱۲، واحد ۳"
                      hasError={Boolean(errors.address)}
                      autoComplete="street-address"
                    />
                  </FormField>
                </div>

                <FormField
                  label="کد پستی"
                  htmlFor="postalCode"
                  required
                  errorMessage={errors.postalCode?.message}
                >
                  <Input
                    id="postalCode"
                    type="text"
                    dir="ltr"
                    {...register("postalCode")}
                    placeholder="1234567890"
                    hasError={Boolean(errors.postalCode)}
                    autoComplete="postal-code"
                    maxLength={10}
                  />
                </FormField>
              </div>
            </fieldset>

            <Separator className="bg-border/60" />

            {/* Payment method */}
            <fieldset>
              <legend className="mb-5 text-base font-medium text-foreground">روش پرداخت</legend>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const isSelected = selectedPayment === method.id;
                  return (
                    <label
                      key={method.id}
                      htmlFor={`pay-${method.id}`}
                      className={cn(
                        "flex cursor-pointer items-start gap-4 rounded-xl border p-4",
                        "transition-[border-color,background-color] duration-[220ms]",
                        isSelected
                          ? "border-gold bg-gold-muted"
                          : "border-border bg-card hover:border-muted-foreground",
                      )}
                    >
                      <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center">
                        <input
                          id={`pay-${method.id}`}
                          type="radio"
                          value={method.id}
                          {...register("paymentMethod")}
                          className="sr-only"
                        />
                        <div
                          className={cn(
                            "size-4 rounded-full border-2 transition-colors",
                            isSelected ? "border-gold bg-gold" : "border-muted-foreground",
                          )}
                          aria-hidden="true"
                        >
                          {isSelected && (
                            <div className="m-auto mt-0.5 size-2 rounded-full bg-gold-foreground" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{method.label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* Right: Order summary */}
          <div
            className={cn(
              "rounded-2xl border border-border bg-card p-6 shadow-luxury-xs",
              "lg:sticky lg:top-24",
            )}
          >
            <h2 className="mb-5 text-base font-medium text-foreground">سفارش شما</h2>

            {/* Cart items mini-list */}
            <div className="mb-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.product.primaryImage.url}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-medium text-foreground">
                      {item.product.name}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <Badge variant="karat" className="text-[0.55rem]">
                        {item.variant.karat}K
                      </Badge>
                      <span className="text-xs text-muted-foreground">× {item.quantity}</span>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm text-foreground">
                    {formatPrice(item.variant.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="divider-gold mb-5" />

            {/* Price breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">جمع کالاها</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">هزینه ارسال</span>
                <span className={isShippingFree ? "text-success" : ""}>
                  {isShippingFree ? "رایگان" : formatPrice(shipping)}
                </span>
              </div>
            </div>

            <div className="divider-gold my-4" />

            <div className="mb-6 flex justify-between">
              <span className="font-medium text-foreground">مبلغ قابل پرداخت</span>
              <motion.span
                key={total}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.22, ease: LUXURY_EASE }}
                className="text-lg font-light text-foreground"
              >
                {formatPrice(total)}
              </motion.span>
            </div>

            {serverError && (
              <p
                role="alert"
                className="mb-4 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-xs text-destructive"
              >
                {serverError}
              </p>
            )}

            {/* Submit */}
            <div className={cn(isShaking && "animate-shake")}>
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full rounded-xl"
                isLoading={isSubmitting}
                loadingText={
                  selectedPayment === "online" ? "در حال اتصال به درگاه..." : "در حال ثبت سفارش..."
                }
              >
                {selectedPayment === "online" ? "پرداخت آنلاین" : "ثبت سفارش"}
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, text: "پرداخت امن" },
                { icon: Truck, text: "ارسال بیمه‌شده" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background p-2.5"
                >
                  <Icon className="size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              با ثبت سفارش،{" "}
              <Link href="/terms" className="text-gold hover:underline">
                قوانین و مقررات
              </Link>{" "}
              را می‌پذیرید.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
