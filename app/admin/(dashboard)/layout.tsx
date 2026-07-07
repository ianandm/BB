import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <div className="flex min-h-screen">
        <AdminNav />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
