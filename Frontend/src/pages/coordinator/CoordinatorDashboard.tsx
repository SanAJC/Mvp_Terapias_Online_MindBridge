import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/animations/PageTransition";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Zap, ArrowRight, UserPlus, CheckCircle, AlertTriangle, ShieldCheck, TrendingUp, Activity, BarChart3 } from "lucide-react";
import { recentActivity } from "@/data/mockData";
import { Link } from "react-router-dom";

const tagColors: Record<string, string> = {
  green: "bg-status-active/10 text-status-active",
  red: "bg-status-cancelled/10 text-status-cancelled",
  orange: "bg-status-pending/10 text-status-pending",
  blue: "bg-accent/10 text-accent",
};

const activityIcons: Record<string, React.ReactNode> = {
  "user-plus": <UserPlus size={18} className="text-accent" />,
  "check-circle": <CheckCircle size={18} className="text-status-completed" />,
  "alert-triangle": <AlertTriangle size={18} className="text-status-cancelled" />,
  "shield-check": <ShieldCheck size={18} className="text-accent" />,
};

const CoordinatorDashboard = () => {
  return (
    <DashboardLayout
      role="COORDINATOR"
      userName="Elena Vance"
      userRole="Coordinadora"
    >
      <PageTransition>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {/* Stats row */}
          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Users */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-accent/[0.04]" />
              <Users size={48} className="absolute top-3 right-3 text-accent/[0.06]" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Users size={20} className="text-accent" />
                </div>
                <span className="status-active text-xs">+12%</span>
              </div>
              <p className="text-sm text-muted-foreground">Usuarios totales</p>
              <p className="text-3xl font-bold text-foreground">1,284</p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>● 84 Terapeutas</span>
                <span>● 1.2k Pacientes</span>
              </div>
            </div>

            {/* Sessions */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm relative overflow-hidden">
              <Activity size={48} className="absolute top-3 right-3 text-status-active/[0.06]" />
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-status-active/10 flex items-center justify-center">
                  <Zap size={20} className="text-status-active" />
                </div>
                <span className="status-active text-xs">En vivo ahora</span>
              </div>
              <p className="text-sm text-muted-foreground">Sesiones activas hoy</p>
              <p className="text-3xl font-bold text-foreground">42</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex -space-x-1">
                  {["JS", "EV", "MH"].map((i) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-card">
                      <AvatarFallback className="bg-muted text-[8px]">{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">Siguiente sesión en 15 min</span>
              </div>
            </div>

            {/* Chart placeholder */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm relative overflow-hidden">
              <BarChart3 size={48} className="absolute top-3 right-3 text-accent/[0.06]" />
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">Tendencias mensuales de sesiones</p>
                <span className="text-xs text-accent font-medium">Últimos 6 meses ▾</span>
              </div>
              <div className="flex items-end gap-3 h-16 mt-4">
                {[40, 55, 45, 65, 50, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-accent/15 rounded-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Actividad reciente</h2>
                  <p className="text-sm text-muted-foreground">Actualizaciones en tiempo real en la plataforma</p>
                </div>
                <a href="#" className="text-sm text-accent font-medium hover:underline">Ver todos los registros</a>
              </div>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      {activityIcons[item.icon]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                      <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagColors[item.tagColor]}`}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right column */}
            <div className="space-y-4">
              <motion.div variants={fadeInUp} className="brand-card-dark relative overflow-hidden">
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/[0.04]" />
                <div className="absolute top-4 right-4 opacity-[0.08]">
                  <Users size={40} />
                </div>
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-semibold mb-1">Foco de hoy</p>
                <h3 className="text-lg font-bold mb-2">Gestión del Directorio</h3>
                <p className="text-sm opacity-70 mb-4">
                  Revisa y gestiona la lista de terapeutas y pacientes activos en el sistema.
                </p>
                <Link
                  to="/coordinador/directorio"
                  className="w-full py-2.5 border border-primary-foreground/30 rounded-lg text-sm font-medium hover:bg-primary-foreground/10 transition-colors flex items-center justify-center"
                >
                  Ir al Directorio
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Acciones rápidas</h3>
                <div className="space-y-3">
                  {[
                    { icon: <ShieldCheck size={18} className="text-accent" />, label: "Auditoría de credenciales" },
                    { icon: <TrendingUp size={18} className="text-accent" />, label: "Exportar PDF mensual" },
                    { icon: <UserPlus size={18} className="text-accent" />, label: "Asignar Paciente" },
                  ].map((action) => (
                    <button key={action.label} className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-secondary transition-colors text-sm">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">{action.icon}</div>
                      {action.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default CoordinatorDashboard;
