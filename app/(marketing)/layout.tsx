import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PwaBottomNav } from "@/components/shared/pwa-bottom-nav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#FAF8F5] dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 pb-16 md:pb-0 transition-colors">
      <Navbar />
      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      <Footer />
      <PwaBottomNav />
    </div>
  );
}
