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
                "text-xs font-bold tracking-widest",
              )}
            >
              IG
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
