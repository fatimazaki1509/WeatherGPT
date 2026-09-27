"use client";

import Sidebar from "./Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#041B3D]">
      <Sidebar />

     <main className="flex-1 ml-[280px] p-6">
        {children}
      </main>
    </div>
  );
}