"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/saas/Sidebar";
import MobileSidebar from "@/components/saas/MobileSidebar";
import Header from "@/components/saas/Header";

export default function SaasAppLayout({ children }: { children: ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const openMobileSidebar = () => setIsMobileSidebarOpen(true);
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={openMobileSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-cyan-50/50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
