import { SiteLayout } from "@/components/layout/SiteLayout";

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => (
  <SiteLayout>
    <main className="flex-1 pt-16 md:pt-20">{children}</main>
  </SiteLayout>
);

export default AccountLayout;
