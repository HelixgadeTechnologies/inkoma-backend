import { Sidebar } from "@/components/shared/sidebar";
import { Navbar } from "@/components/shared/navbar";
import { PwaBottomNav } from "@/components/shared/pwa-bottom-nav";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#FAF8F5] text-stone-900 pb-16 md:pb-0 transition-colors">
      <Navbar />
      <div className="flex w-full flex-1 px-2 sm:px-4 lg:px-6">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-2 py-6 sm:px-4 lg:px-6">
          {children}
        </main>
      </div>
      <PwaBottomNav />
    </div>
  );
}
