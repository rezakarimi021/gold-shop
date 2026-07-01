import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const SHOP_LINKS = [
  { href: ROUTES.shop, label: "همه محصولات" },
  { href: ROUTES.category("rings"), label: "انگشتر" },
  { href: ROUTES.category("necklaces"), label: "گردنبند" },
  { href: ROUTES.category("bracelets"), label: "دستبند" },
  { href: ROUTES.category("earrings"), label: "گوشواره" },
  { href: ROUTES.category("pendants"), label: "آویز" },
];

const INFO_LINKS = [
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: ROUTES.blog, label: "وبلاگ" },
  { href: "/warranty", label: "ضمانت و اصالت" },
  { href: "/terms", label: "قوانین و مقررات" },
  { href: "/privacy", label: "حریم خصوصی" },
];

export const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container-luxury section-spacing-sm">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href={ROUTES.home} className="inline-block outline-none">
            <span className="text-xl leading-tight font-light tracking-[0.06em] text-foreground">
              طلافروشی
            </span>
            <span className="type-overline mt-1 block text-gold">GOLD SHOP</span>
          </Link>

          <p className="mt-5 max-w-[22rem] text-sm leading-[1.8] text-muted-foreground">
            ارائه‌دهنده زیورآلات طلای اصیل با بیش از دو دهه تجربه. هر قطعه روایت‌گر یک لحظه جاودانه
            است — ساخته‌شده با دقت، برای ماندگاری.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام طلافروشی گلد"
              className={cn(
                "flex size-9 items-center justify-center rounded-full",
                "border border-border text-muted-foreground",
                "transition-[border-color,color] duration-[220ms]",
                "hover:border-gold hover:text-gold",
              )}
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="type-overline mb-5 text-foreground">فروشگاه</h3>
          <ul className="space-y-3.5">
            {SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors duration-[150ms] hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info links */}
        <div>
          <h3 className="type-overline mb-5 text-foreground">اطلاعات</h3>
          <ul className="space-y-3.5">
            {INFO_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors duration-[150ms] hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="type-overline mb-5 text-foreground">تماس</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">۰۲۱–۱۲۳۴–۵۶۷۸</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">info@goldshop.ir</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                تهران، خیابان ولیعصر،
                <br />
                پاساژ طلا، طبقه دوم، واحد ۱۲
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Gold divider */}
      <div className="divider-gold my-10" />

      {/* Bottom bar */}
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-start">
        <p className="text-xs text-muted-foreground">© ۱۴۰۵ طلافروشی گلد. تمامی حقوق محفوظ است.</p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">پرداخت امن:</span>
          <div className="flex items-center gap-2">
            {["ZarinPal", "IDPay", "Shaparak"].map((name) => (
              <div key={name} className="flex h-6 items-center rounded border border-border px-2.5">
                <span className="type-karat text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);
