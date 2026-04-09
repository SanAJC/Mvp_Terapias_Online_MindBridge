import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import type { UserRole } from "@/types";
import { useAuth } from "@/context/AuthContext";

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
    const { user } = useAuth();
    if(user?.role === "COORDINATOR") {
      userRole = "Coordinador";
    } else if(user?.role === "THERAPIST") {
      userRole = "Terapeuta";
    } else {
      userRole = "Paciente";
    }
    return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />
      <div className="ml-[200px]">
        <TopBar userName={user?.username || userName} userRole={userRole} />
        <main className="px-6 py-5">{children}</main>
      </div>
    </div>
  );
};
