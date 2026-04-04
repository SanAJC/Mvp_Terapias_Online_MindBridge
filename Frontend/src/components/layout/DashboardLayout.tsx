import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import type { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
  userName: string;
  userRole: string;
}

export const DashboardLayout = ({
  children,
  role,
  userName,
  userRole,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />
      <div className="ml-[200px]">
        <TopBar userName={userName} userRole={userRole} />
        <main className="px-6 py-5">{children}</main>
      </div>
    </div>
  );
};
