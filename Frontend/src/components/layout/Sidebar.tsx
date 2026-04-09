import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { LayoutDashboard, Calendar, Users, BarChart3, HelpCircle, LogOut, Stethoscope } from "lucide-react";
import type { UserRole } from "@/types";
import { useAuthApi } from "@/connections/api/Auth";
interface SidebarProps {
  role: UserRole;
}

const navItems: Record<UserRole, { label: string; path: string; icon: React.ReactNode }[]> = {
  THERAPIST: [
    { label: "Resumen", path: "/terapeuta", icon: <LayoutDashboard size={20} /> },
    { label: "Sesiones", path: "/terapeuta/sesiones", icon: <Calendar size={20} /> },
    { label: "Pacientes", path: "/terapeuta/pacientes", icon: <Users size={20} /> },
  ],
  COORDINATOR: [
    { label: "Resumen", path: "/coordinador", icon: <LayoutDashboard size={20} /> },
    { label: "Sesiones", path: "/coordinador/sesiones", icon: <Calendar size={20} /> },
    { label: "Directorio", path: "/coordinador/directorio", icon: <Users size={20} /> },
    { label: "Análisis", path: "/coordinador/analisis", icon: <BarChart3 size={20} /> },
  ],
  PATIENT: [
    { label: "Resumen", path: "/paciente", icon: <LayoutDashboard size={20} /> },
    { label: "Sesiones", path: "/paciente/sesiones", icon: <Calendar size={20} /> },
    { label: "Terapeutas", path: "/paciente/terapeutas", icon: <Stethoscope size={20} /> },
  ],
};

export const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const items = navItems[role];
  const { handleLogout } = useAuthApi();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[200px] bg-card border-r border-border flex flex-col z-30">
      <div className="p-5 pb-8">
        <Logo />
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {items.map((item) => {
          const isActive =
            item.path === `/${role === "THERAPIST" ? "terapeuta" : role === "COORDINATOR" ? "coordinador" : "paciente"}`
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "text-accent bg-secondary border-l-[3px] border-accent"
                  : "text-sidebar-foreground hover:bg-secondary/60"
              }`}
            >
              {item.icon}
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60 w-full transition-colors">
          <HelpCircle size={20} />
          Centro de Ayuda
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-secondary/60 w-full transition-colors" onClick={handleLogout}>
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
