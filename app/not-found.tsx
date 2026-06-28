import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const NotFound = () => (
  <main className="container-luxury section-spacing flex min-h-screen flex-col items-center justify-center text-center">
    <p className="mb-3 text-6xl font-extralight tracking-widest text-gold">۴۰۴</p>
    <h2 className="mb-4 text-2xl font-light text-foreground">صفحه‌ای یافت نشد</h2>
    <div className="mx-auto mb-6 h-px w-12 bg-gold-muted" />
    <p className="mb-8 max-w-sm font-light text-muted-foreground">
      صفحه‌ای که دنبالش می‌گردید وجود ندارد یا منتقل شده است.
    </p>
    <Link
      href={ROUTES.home}
      className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 text-sm tracking-wider text-foreground transition-colors duration-200 hover:border-gold"
    >
      بازگشت به خانه
    </Link>
  </main>
);

export default NotFound;
