import { SiteLayout } from "@/components/layout/SiteLayout";

interface ShopLayoutProps {
  children: React.ReactNode;
}

const ShopLayout = ({ children }: ShopLayoutProps) => (
  <SiteLayout>
    <main className="flex-1 pt-16 md:pt-20">{children}</main>
  </SiteLayout>
);

export default ShopLayout;
