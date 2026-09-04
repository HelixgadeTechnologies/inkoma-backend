import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PwaBottomNav } from "@/components/shared/pwa-bottom-nav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#FAF8F5] text-stone-900 pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      <Footer />
      <PwaBottomNav />
    </div>
  );
}
