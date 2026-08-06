import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollTop } from "@/components/layout/ScrollTop";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink">
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
