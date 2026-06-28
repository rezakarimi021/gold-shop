import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export const SiteLayout = ({ children }: SiteLayoutProps) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);
