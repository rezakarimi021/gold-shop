import { SiteLayout } from "@/components/layout/SiteLayout";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => (
  <SiteLayout>
    <main className="flex-1">{children}</main>
  </SiteLayout>
);

export default MarketingLayout;
