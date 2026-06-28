import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="min-h-screen bg-background">
    <div className="container-luxury flex h-16 items-center justify-end md:h-20">
      <Link
        href={ROUTES.home}
        className="flex flex-col items-end outline-none"
        aria-label="طلافروشی گُلد — صفحه اصلی"
      >
        <span className="text-[1.1rem] leading-tight font-light tracking-[0.06em] text-foreground">
          طلافروشی
        </span>
        <span className="type-overline mt-0.5 leading-none text-gold">GOLD SHOP</span>
      </Link>
    </div>
    {children}
  </div>
);

export default AuthLayout;
